"use client";

import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TaskItem } from "./Task-Item";

interface initialTasks {
  id: string;
  title: string;
  description?: string | null;
  status: string;
}
export function TaskList({
  initialTasks,
  workspaceId,
}: {
  initialTasks: initialTasks[];
  workspaceId: string;
}) {
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const channel = pusherClient.subscribe(`workspace-${workspaceId}`);

    channel.bind("task-created", (task: any) => {
      setTasks((prev) => [...prev, task]);
      toast.success("🎉 New task added!", {
        description: `"${task.title}" was created successfully.`,
        duration: 4000,
        action: {
          label: "View",
          onClick: () => {
            // Scroll to the new task or highlight it
            const taskElement = document.querySelector(
              `[data-task-id="${task.id}"]`
            );
            taskElement?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          },
        },
      });
    });

    channel.bind("task-updated", (task: any) => {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));

      const statusEmojis = {
        todo: "📝",
        in_progress: "⚡",
        done: "✅",
      };

      const statusLabels = {
        todo: "Todo",
        in_progress: "In Progress",
        done: "Done",
      };

      toast.info(
        `${
          statusEmojis[task.status as keyof typeof statusEmojis]
        } Task updated!`,
        {
          description: `"${task.title}" moved to ${
            statusLabels[task.status as keyof typeof statusLabels]
          }.`,
          duration: 3000,
        }
      );
    });

    return () => {
      pusherClient.unsubscribe(`workspace-${workspaceId}`);
    };
  }, [workspaceId]);

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} data-task-id={task.id}>
          <TaskItem {...task} />
        </li>
      ))}
    </ul>
  );
}
