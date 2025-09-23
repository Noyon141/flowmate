"use client";

import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";
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

    channel.bind("task:new", (task: any) => {
      setTasks((prev) => [...prev, task]);
    });

    channel.bind("task:update", (task: any) => {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    });

    return () => {
      pusherClient.unsubscribe(`workspace-${workspaceId}`);
    };
  }, [workspaceId]);

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </ul>
  );
}
