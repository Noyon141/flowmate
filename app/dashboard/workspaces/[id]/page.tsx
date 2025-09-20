import TaskForm from "@/components/tasks/Task-Form";
import { prisma } from "@/lib/prisma";

export default async function WorkspaceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { id: id },
    include: { Task: true },
  });

  if (!workspace) return <div>Workspace not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{workspace.name}</h1>
      <TaskForm id={workspace.id} />

      <div className="mt-6">
        <h2 className="font-semibold">Tasks</h2>
        <ul className="mt-2 space-y-2">
          {workspace.Task.map((task) => (
            <li key={task.id} className="border p-2 rounded">
              <p className="font-medium">{task.title}</p>
              {task.description && <p>{task.description}</p>}
              <span className="text-xs text-gray-500">{task.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
