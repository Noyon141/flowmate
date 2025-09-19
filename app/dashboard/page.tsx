"use client";

import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome, {user?.firstName || "Guest"}!</p>
      <p className="mt-2 text-muted-foreground">
        Workspaces, projects & tasks will appear here.
      </p>
    </div>
  );
};

export default DashboardPage;
