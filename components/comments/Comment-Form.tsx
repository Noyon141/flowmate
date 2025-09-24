"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Member } from "@prisma/client";
import axios from "axios";
import { Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CommentForm({
  id,
  members,
}: {
  id: string;
  members: Member[];
}) {
  const [content, setContent] = useState("");
  const [mentions, setMentions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMentions, setShowMentions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`/api/tasks/${id}/comments`, {
        content,
        mentions,
      });

      setContent("");
      setMentions([]);
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMention = (userId: string) => {
    setMentions((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const removeMention = (userId: string) => {
    setMentions((prev) => prev.filter((id) => id !== userId));
  };

  const getMentionedUsers = () => {
    return members.filter((m) => mentions.includes(m.userId));
  };

  return (
    <Card className="mt-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Comment Input */}
          <div className="space-y-2">
            <Input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
              disabled={isSubmitting}
            />

            {/* Mentioned Users Display */}
            {mentions.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {getMentionedUsers().map((member) => (
                  <Badge
                    key={member.userId}
                    variant="secondary"
                    className="flex items-center gap-1 text-xs"
                  >
                    @{member.id || member.userId}
                    <button
                      type="button"
                      onClick={() => removeMention(member.id)}
                      className="ml-1 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Mentions Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Mentions
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowMentions(!showMentions)}
                className="text-xs"
              >
                {showMentions ? "Hide" : "Add"} Mentions
              </Button>
            </div>

            {showMentions && (
              <Card className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                <CardContent className="p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {members.map((member) => (
                      <label
                        key={member.id}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={mentions.includes(member.id)}
                          onChange={() => toggleMention(member.id)}
                          className="rounded"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                          {member.id || member.userId}
                        </span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Comment
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
