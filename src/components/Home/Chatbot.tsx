import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Sparkles, X, ArrowUpCircle } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm Forza AI Assistant. How can I help you with cryptocurrency today?",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const loggedInCheck = localStorage.getItem("forza_logged_in") === "true";
    setIsLoggedIn(loggedInCheck);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleChatButtonClick = () => {
    if (isLoggedIn) {
      window.location.href = "/chat";
    } else {
      window.location.href = "/login";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;


    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");


    setTimeout(() => {
      const responses = [
        "Forza AI is built on the Solana blockchain, which offers high throughput and low fees compared to other networks.",
        "Our AI Token Consultant can analyze any cryptocurrency by examining its tokenomics, utility, and market performance.",
        "Staking $FORZA tokens will be available in Q2, offering competitive APY rates and governance voting rights.",
        "You can use our AI Code Explainer to understand complex smart contracts and blockchain code without deep technical knowledge.",
        "The Forza AI platform combines multiple AI tools to make crypto investing, trading, and learning more accessible.",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <section id="chatbot" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI Assistant
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get instant help with our AI-powered chatbot. Ask anything about cryptocurrency,
            blockchain technology, or Forza AI platform.
          </p>
          <Button
            className="mt-8 group"
            onClick={handleChatButtonClick}
          >
            Chat with AI
            <Sparkles className="ml-2 h-4 w-4 text-primary-foreground" />
          </Button>
        </div>
      </div>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-20">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <Card className="relative mx-auto w-full max-w-lg overflow-hidden rounded-lg shadow-lg sm:rounded-xl">
            <CardHeader className="flex h-14 items-center justify-between border-b px-4 pb-0 pt-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <Sparkles className="h-4 w-4" />
                </Avatar>
                <div>
                  <h3 className="text-base font-semibold">Forza AI Assistant</h3>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                size="icon"
                variant="ghost"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="h-[350px] overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="border-t p-2">
              <form onSubmit={handleSubmit} className="flex w-full gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about crypto or Forza..."
                  className="flex-1"
                />
                <Button size="icon" type="submit" className="shrink-0">
                  <ArrowUpCircle className="h-5 w-5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </section>
  );
}