"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function TaskItem({
  id,
  title,
  description,
  status,
}: {
  id: string;
  title: string;
  description?: string | null;
  status: string;
}) {
  const [current, setCurrent] = useState(status);

  const updateStatus = async (newStatus: string) => {
    try {
      const response = await axios.patch(`/api/tasks/${id}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setCurrent(newStatus);
      }
    } catch (error) {
      console.error("Failed to update status", error);
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
              <Select value={current} onValueChange={updateStatus}>
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
