import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Parse the request body
    const body = await req.json();

    const { title, description, dueDate, status } = body as {
      title: string;
      description?: string;
      dueDate?: string;
      status: "todo" | "in_progress" | "done";
    };

    if (!title || !status) {
      return NextResponse.json(
        { error: "Title, description, and status are required" },
        { status: 400 }
      );
    }
    //Check if the user is a member of the workspace
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const member = await prisma.member.findFirst({
      where: { userId: user.id, workspaceId: params.id },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Forbidden. You are not a member of this workspace" },
        { status: 403 }
      );
    }

    //Create the task

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status: status,
        workspaceId: params.id,
      },
    });

    console.log("Task created:", task);

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.log("[TASKS_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
