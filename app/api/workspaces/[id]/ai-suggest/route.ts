import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();

    const { projectTitle } = body as {
      projectTitle: string; 
    };

    if (!projectTitle) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that suggests tasks for remote team projects.",
        },
        {
          role: "user",
          content: `Suggest 5 key tasks for project: ${projectTitle}`,
        },
      ],
    });

    const suggestions = completion.choices[0].message?.content || "";

    if (!suggestions || suggestions.trim() === "") {
      return NextResponse.json(
        { error: "Failed to get suggestions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
