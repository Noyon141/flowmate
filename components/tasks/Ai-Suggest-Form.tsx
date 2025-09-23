"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

export default function AiSuggestForm({ id }: { id: string }) {
  const [title, setTitle] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post(`/api/workspaces/${id}/ai-suggest`, {
      projectTitle: title,
    });
    if (response.status === 200) {
      const data = response.data;
      setSuggestions(data.suggestions);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <form onSubmit={handleSuggest} className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          className="bg-transparent"
        />
        <Button type="submit">Get AI Tasks</Button>
      </form>
      {suggestions && (
        <div className="border rounded p-3 whitespace-pre-line bg-transparent">
          {suggestions}
        </div>
      )}
    </div>
  );
}
