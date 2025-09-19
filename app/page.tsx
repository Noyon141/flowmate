import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold">Flowmate</h1>
      <p className="text-lg mt-2">AI Workspace for Remote Teams</p>
      <Link
        href="/dashboard"
        className="mt-4 rounded bg-gray-800 dark:bg-black text-white px-4 py-2"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
