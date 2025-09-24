"use client";

import { memberProps } from "@/types/comments";
import { Member, status, Task } from "@prisma/client";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CommentForm } from "../comments/Comment-Form";
import { CommentList } from "../comments/Comment-List";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TaskItemProps = Task & {
  workspaceId: string;
  members: Member[];
};

export function TaskItem({
  id,
  title,
  description,
  status,
  members,
}: TaskItemProps) {
  const [current, setCurrent] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const updateStatus = async (newStatus: status) => {
    setIsUpdating(true);
    try {
      const response = await axios.patch(`/api/tasks/${id}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setCurrent(newStatus);
        const statusLabels = {
          todo: "Todo",
          in_progress: "In Progress",
          done: "Done",
        };
        toast.success("Status updated!", {
          description: `"${title}" moved to ${
            statusLabels[newStatus as keyof typeof statusLabels]
          }.`,
        });
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status", {
        description: "Please try again later.",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
    >
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-tight">
                {title}
              </h3>
              {description && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto">
              <Select
                value={current}
                onValueChange={updateStatus}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-full sm:w-[140px] bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:ring-blue-500 dark:focus:ring-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      Todo
                    </span>
                  </SelectItem>
                  <SelectItem value="in_progress">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      In Progress
                    </span>
                  </SelectItem>
                  <SelectItem value="done">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Done
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-sm text-blue-500 flex items-center gap-1"
            >
              {showComments ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
              Comments
            </button>
          </div>
        </CardContent>
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-2"
            >
              {/* Comments section */}
              <CommentList id={id} />
              <CommentForm id={id} members={members} />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
