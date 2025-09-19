import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name } = body as { name: string };

    if (!name) {
      return NextResponse.json(
        { error: "Workspace name required" },
        { status: 400 }
      );
    }

    // Ensure user exists in DB
    let user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      // Get Clerk email
      const email = (
        await (
          await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
            },
          })
        ).json()
      )?.email_addresses?.[0]?.email_address;

      // Get Clerk username
      const userName = (
        await (
          await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
            },
          })
        ).json()
      )?.username;

      user = await prisma.user.create({
        data: {
          clerkId: userId,
          username: userName || userId, // Default username to userId, can be changed later
          email: email || `${userId}@noemail.com`,
          createdAt: new Date(),
          updatedAt: new Date(),
          fullName: name || "New User",
        },
      });
    }

    // Create workspace
    const workspace = await prisma.workspace.create({
      data: {
        name,
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: "owner",
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(workspace, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
