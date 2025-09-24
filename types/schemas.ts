// src/types/schemas.ts
import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional().nullable(),
  projectId: z.string().optional().nullable(),
  assigneeId: z.string().optional().nullable(),
});

export const updateTaskStatusSchema = z.object({
  status: z.enum(["todo", "in_progress", "done"]),
});

export const assignTaskSchema = z.object({
  assigneeId: z.string().optional(),
  assigneeEmail: z.string().email().optional(),
});

export const createCommentSchema = z.object({
  content: z.string().min(1),
  mentions: z.array(z.string()).optional(),
});

export const inviteSchema = z.object({
  email: z.string().email(),
  expiresAt: z.string().optional().nullable(),
});
