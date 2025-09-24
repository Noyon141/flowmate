import AiSuggestForm from "@/components/tasks/Ai-Suggest-Form";
import TaskForm from "@/components/tasks/Task-Form";
import { TaskList } from "@/components/tasks/Task-List";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function WorkspaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: id },
    include: { Task: true, members: true },
  });

  if (!workspace) return <div>Workspace not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Workspace Header */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {workspace.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <TaskForm id={workspace.id} />
            <AiSuggestForm id={workspace.id} />
          </CardContent>
        </Card>

        {/* Tasks Section */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Tasks
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                {workspace.Task.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {workspace.Task.length > 0 ? (
              <div className="space-y-3">
                <TaskList
                  members={workspace.members}
                  initialTasks={workspace.Task}
                  workspaceId={workspace.id}
                />
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-slate-400 dark:text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  No tasks yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  Get started by creating your first task using the form above.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
