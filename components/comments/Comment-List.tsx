"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Card, CardContent } from "@/components/ui/card";
import { commentProps } from "@/types/comments";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

export function CommentList({ id }: { id: string }) {
  const [comments, setComments] = useState<commentProps[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`/api/tasks/${id}/comments`);
      const data = await res.data;
      setComments(data);
    };
    load();
  }, [id]);

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <Card
          key={c.id}
          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium">
                  {(c.author.fullName || c.author.email)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {c.author.fullName || c.author.email}
                  </p>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {/* You can add timestamp here if available */}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {c.content}
                </p>
                {c.mentions.length > 0 && (
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Mentions:
                    </span>
                    {c.mentions.map((m: any, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        @{m.user.fullName || m.user.email}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {comments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No comments yet. Be the first to comment!
          </p>
        </div>
      )}
    </div>
  );
}
