// This keeps code and avoids `any`.

import type {
  Attachment as PrismaAttachment,
  AuditLog as PrismaAuditLog,
  Block as PrismaBlock,
  Comment as PrismaComment,
  Document as PrismaDocument,
  Invitation as PrismaInvitation,
  Member as PrismaMember,
  Mention as PrismaMention,
  Notification as PrismaNotification,
  Project as PrismaProject,
  Subscription as PrismaSubscription,
  Task as PrismaTask,
  Usage as PrismaUsage,
  User as PrismaUser,
  Workspace as PrismaWorkspace,
} from "@prisma/client";

export type User = PrismaUser;
export type Workspace = PrismaWorkspace;
export type Member = PrismaMember;
export type Project = PrismaProject;
export type Task = PrismaTask;
export type Comment = PrismaComment;
export type Mention = PrismaMention;
export type Notification = PrismaNotification;
export type Invitation = PrismaInvitation;
export type Attachment = PrismaAttachment;
export type Document = PrismaDocument;
export type Block = PrismaBlock;
export type AuditLog = PrismaAuditLog;
export type Usage = PrismaUsage;
export type Subscription = PrismaSubscription;
