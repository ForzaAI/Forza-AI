import React from "react";
import ChatInterface from "./ChatInterface";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

export default function ChatPage() {

  useAuthRedirect();

  return (
    <div className="flex-1 container mx-auto px-4 py-6 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-sm text-muted-foreground mt-1">Ask anything about crypto and blockchain</p>
        </div>
        <div className="flex items-center justify-start sm:justify-end">
          <div className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
            AI Model: Forza GPT
          </div>
        </div>
      </div>
      <ChatInterface />
    </div>
  );
}