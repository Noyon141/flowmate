import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate the user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body

    const body = await req.json();
    const { email } = body as { email: string };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    //Check if the user is the owner of the workspace

    const workSpace = await prisma.workspace.findUnique({
      where: { id: params.id },
      include: { owner: true },
    });

    if (!workSpace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }
    //EXTRA LAYER OF SECURITY
    if (workSpace.ownerId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const inviter = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!inviter || inviter.id !== workSpace.ownerId) {
      return NextResponse.json(
        { error: "Only owner can invite" },
        { status: 403 }
      );
    }

    //FIND OR CREATE USER PLACEHOLDER

    let invitedUser = await prisma.user.findUnique({
      where: { email },
    });

    const invitedUsername = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!invitedUser) {
      invitedUser = await prisma.user.create({
        data: {
          email,
          username: invitedUsername
            ? `${invitedUsername.username}_pending`
            : `pending_user_${Date.now()}`,
          clerkId: `pending_${Date.now()}`, // Placeholder until real signup
        },
      });
    }

    //ADD USER TO WORKSPACE
    await prisma.member.create({
      data: {
        id: `${invitedUser.id}-${workSpace.id}`, // Composite key
        userId: invitedUser.id,
        workspaceId: workSpace.id,
        role: "MEMBER",
      },
    });

    console.log(
      `User with email ${email} invited to workspace ${workSpace.name}`
    );

    return NextResponse.json({
      message: "User invited successfully",
      user: invitedUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
