// src/types/api.ts
// DTOs for API requests/responses — use these in route handlers & fetch clients.

import { User } from "./prisma";

export type CreateWorkspaceDTO = {
  name: string;
  description?: string;
};

export type CreateTaskDTO = {
  title: string;
  description?: string;
  dueDate?: string | null;
  projectId?: string | null;
  assigneeId?: string | null;
};

export type UpdateTaskStatusDTO = {
  status: "todo" | "in_progress" | "done";
};

export type AssignTaskDTO = {
  assigneeId?: string;
  assigneeEmail?: string;
};

export type CreateCommentDTO = {
  content: string;
  mentions?: string[]; // array of userIds
};

export type InviteDTO = {
  email: string;
  expiresAt?: string | null;
};

export type ClaimInviteResponse = {
  success: boolean;
  user: User | null;
};
