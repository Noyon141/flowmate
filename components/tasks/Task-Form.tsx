"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskForm({ id }: { id: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/workspaces/${id}/tasks`, {
        title,
        description,
      });
      if (res.status === 201) {
        setTitle("");
        setDescription("");
        // Force refresh to show the new task immediately
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="bg-transparent"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="bg-transparent"
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
}
