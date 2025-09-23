import CreateWorkspaceForm from "@/components/workspaces/CreateWorkspaceForm";
import { prisma } from "@/lib/prisma";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return <div className="p-6">Please sign in</div>;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { workspaces: true },
  });

  return (
    <SignedIn>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Workspaces</h1>
        <CreateWorkspaceForm />
        <ul className="mt-4 space-y-2">
          {user?.workspaces.map((workspace) => (
            <li key={workspace.id} className="border p-3 rounded-md">
              <Link href={`/dashboard/workspaces/${workspace.id}`}>
                {workspace.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SignedIn>
  );
}
