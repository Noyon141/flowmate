import Link from "next/link";

export default function HomePage() {
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
