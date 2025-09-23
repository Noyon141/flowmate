"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskForm({ id }: { id: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(`/api/workspaces/${id}/tasks`, {
        title,
        description,
      });
      if (res.status === 201) {
        setTitle("");
        setDescription("");
        toast.success("Task created successfully!", {
          description: `"${title}" has been added to your workspace.`,
        });
        // Force refresh to show the new task immediately
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
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
      <Button type="submit" disabled={isSubmitting || !title.trim()}>
        {isSubmitting ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
}
