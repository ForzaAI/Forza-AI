import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send, User, Bot, Copy, Info, Clock, ChevronDown, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { cryptoBotInstructions } from '../../lib/ai-instructions';

type ChartBars = Array<{height: number, isPositive: boolean}>;

type TechnicalIndicators = {
  rsi: number;
  rsiPositive: boolean;
  macd: number;
  macdPositive: boolean;
  volume: number;
  ma50: number;
  ma200: number;
  signal: string;
  signalPositive: boolean;
};

type CoinData = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  chartType: "price" | "analysis";
  chartData?: {
    bars?: ChartBars;
    technicalIndicators?: TechnicalIndicators;
  };
};

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isChart?: boolean;
  coinData?: CoinData;
};

const topicSuggestions = [
  "What is Forza AI?",
  "How to buy Bitcoin?",
  "Explain DeFi to a beginner",
  "What are NFTs?",
  "Current market trends",
  "Crypto portfolio advice",
  "What are gas fees?",
  "How to stake crypto?"
];

const PriceChart = React.memo(({ chartData, symbol }: {
  chartData: ChartBars,
  symbol: string
}) => {
  return (
    <div className="w-full h-full flex items-end justify-between gap-1 relative">
      {chartData.map((bar, i) => (
        <div
          key={i}
          className={`w-full ${bar.isPositive ? 'bg-green-500/40' : 'bg-red-500/40'}`}
          style={{ height: `${bar.height}%` }}
        ></div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-30">
        <BarChart2 size={60} />
      </div>
    </div>
  );
});

const TechnicalAnalysis = React.memo(({ data, price }: {
  data: TechnicalIndicators,
  price: number
}) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-3 gap-2 w-full h-full">
      <div className="bg-background/80 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">RSI</div>
          <div className={`text-sm font-medium ${data.rsiPositive ? 'text-green-500' : 'text-red-500'}`}>
            {data.rsi}
          </div>
        </div>
      </div>
      <div className="bg-background/80 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">MACD</div>
          <div className={`text-sm font-medium ${data.macdPositive ? 'text-green-500' : 'text-red-500'}`}>
            {data.macd}
          </div>
        </div>
      </div>
      <div className="bg-background/80 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Volume</div>
          <div className="text-sm font-medium">
            {data.volume.toLocaleString(undefined, {maximumFractionDigits: 0})}
          </div>
        </div>
      </div>
      <div className="bg-background/80 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">MA-50</div>
          <div className="text-sm font-medium">
            ${data.ma50.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="bg-background/80 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">MA-200</div>
          <div className="text-sm font-medium">
            ${data.ma200.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="bg-background/80 rounded flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Signal</div>
          <div className={`text-sm font-medium ${data.signalPositive ? 'text-green-500' : 'text-yellow-500'}`}>
            {data.signal}
          </div>
        </div>
      </div>
    </div>
  );
});

const generateChartData = (coinSymbol: string, isAnalysis: boolean, price: number) => {
  const bars = Array.from({ length: 20 }).map(() => ({
    height: 30 + Math.random() * 60,
    isPositive: Math.random() > 0.4
  }));

  const technicalIndicators = {
    rsi: Math.floor(Math.random() * 100),
    rsiPositive: Math.random() > 0.5,
    macd: parseFloat((Math.random() * 2 - 1).toFixed(2)),
    macdPositive: Math.random() > 0.5,
    volume: Math.random() * 10000000,
    ma50: price * (1 + (Math.random() * 0.1 - 0.05)),
    ma200: price * (1 + (Math.random() * 0.2 - 0.1)),
    signal: Math.random() > 0.5 ? 'BUY' : 'HOLD',
    signalPositive: Math.random() > 0.5
  };

  return {
    bars,
    technicalIndicators
  };
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Forza AI assistant. How can I help you with cryptocurrency today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{ remaining: number; resetAt: string } | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isTyping && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!messagesContainerRef.current || !isBrowser) return;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;

    if ((isNearBottom || messages.length <= 1) && !isTyping && messages.length > 0) {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [messages, isTyping, isBrowser]);

  useEffect(() => {
    if (isBrowser) {
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 100);
    }
  }, [isBrowser]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 10);
  };

  const handleCopyMessage = (content: string, id: string) => {
    if (!isBrowser) return;

    navigator.clipboard.writeText(content);
    setCopiedMessageId(id);

    setTimeout(() => {
      setCopiedMessageId(null);
    }, 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const chartRegex = /(?:show|display|get)\s+(?:me\s+)?\$([A-Za-z0-9]+)(?:\s+chart|\s+price)?/i;
      const analysisRegex = /(?:show|display|get)\s+(?:me\s+)?\$([A-Za-z0-9]+)(?:\s+technical\s+analysis|\s+analysis)/i;

      const chartMatch = input.match(chartRegex);
      const analysisMatch = input.match(analysisRegex);

      if (chartMatch || analysisMatch) {
        const coinSymbol = (chartMatch || analysisMatch)![1].toUpperCase();
        const isAnalysis = !!analysisMatch;

        const mockPrice = parseFloat((Math.random() * 1000).toFixed(2));
        const mockChange = parseFloat((Math.random() * 20 - 10).toFixed(2)); // Random between -10% and +10%

        const chartData = generateChartData(coinSymbol, isAnalysis, mockPrice);

        const chartResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: isAnalysis
            ? `Here's the technical analysis for $${coinSymbol}:`
            : `Here's the price chart for $${coinSymbol}:`,
          sender: "ai",
          timestamp: new Date(),
          isChart: true,
          coinData: {
            symbol: coinSymbol,
            name: `${coinSymbol} Coin`,
            price: mockPrice,
            change24h: mockChange,
            chartType: isAnalysis ? "analysis" : "price",
            chartData
          }
        };

        setTimeout(() => {
          setMessages((prev) => [...prev, chartResponse]);
          setIsTyping(false);
        }, 1500);

        return;
      }

      const chatHistory = messages
        .filter(msg => msg.id !== "welcome")
        .map(msg => ({
          role: msg.sender === 'ai' ? 'assistant' : 'user',
          content: msg.content
        }));

      const messagesWithSystem = [
        { role: 'assistant', content: cryptoBotInstructions },
        ...chatHistory
      ];

      const nexraPayload = {
        messages: messagesWithSystem,
        prompt: userMessage.content,
        model: "GPT-4",
        markdown: false
      };

      const nexraResponse = await fetch('https://nexra.aryahcr.cc/api/chat/gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nexraPayload)
      });

      if (!nexraResponse.ok) {
        const errorData = await nexraResponse.json().catch(() => ({}));
        console.error('Nexra API error (initial POST):', nexraResponse.status, errorData);
        throw new Error(`Nexra API failed with status: ${nexraResponse.status}`);
      }

      const nexraData = await nexraResponse.json();
      const taskId = nexraData.id;

      if (!taskId) {
        console.error('Failed to get task ID from Nexra API:', nexraData);
        throw new Error('Failed to get task ID from Nexra API');
      }

      let aiTextResponse = "Sorry, I couldn't process your request at the moment.";
      let isCompleted = false;
      const maxAttempts = 10;
      let attempts = 0;

      while (!isCompleted && attempts < maxAttempts) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));

        const statusResponse = await fetch(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(taskId)}`);

        if (!statusResponse.ok) {
          const errorData = await statusResponse.json().catch(() => ({}));
          console.error('Nexra API error (polling GET):', statusResponse.status, errorData);
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }

        const responseData = await statusResponse.json();

        if (responseData.status === "completed") {
          isCompleted = true;
          if (responseData.gpt) {
            aiTextResponse = responseData.gpt;
          }
        } else if (responseData.status === "error" || responseData.status === "not_found") {
          isCompleted = true;
          console.error('Nexra task error or not found:', responseData);
        }
      }

      if (!isCompleted) {
        console.error('Nexra task timed out after', maxAttempts, 'attempts.');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiTextResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting to my knowledge base. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus({ preventScroll: true });
  };

  const formatTimestamp = (date: Date) => {
    return format(date, 'h:mm a');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)] max-h-[100vh] bg-card border rounded-lg overflow-hidden">
      <AnimatePresence>
        {(isBrowser && typeof window !== 'undefined' && window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`bg-muted/50 w-full lg:w-64 lg:min-w-64 overflow-y-auto p-4 lg:p-5 border-r absolute lg:static top-0 left-0 z-10 h-full`}
          >
            <div className="mb-6">
              <h3 className="font-medium text-sm flex items-center gap-2 mb-3">
                <Info size={14} />
                About Forza AI Chat
              </h3>
              <p className="text-sm text-muted-foreground">
                Get real-time insights about cryptocurrency markets, trading strategies,
                and blockchain technology from our AI assistant.
              </p>
              {rateLimitInfo && (
                <div className="mt-2 text-xs p-2 bg-background rounded-md">
                  <span className={rateLimitInfo.remaining === 0 ? "text-red-500" : "text-yellow-500"}>
                    {rateLimitInfo.remaining} message{rateLimitInfo.remaining === 1 ? '' : 's'} remaining today
                  </span>
                  <div className="text-muted-foreground">
                    Resets: {new Date(rateLimitInfo.resetAt).toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-sm flex items-center gap-2 mb-3">
                <Clock size={14} />
                Recent Activity
              </h3>
              <div className="space-y-2">
                {messages.slice(-3).map((message, index) => (
                  <div key={index} className="text-xs text-muted-foreground truncate">
                    {message.sender === 'user' ? '👤 ' : '🤖 '}
                    {message.content.substring(0, 40)}
                    {message.content.length > 40 ? '...' : ''}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm flex items-center gap-2 mb-3">
                <ChevronDown size={14} />
                Suggested Questions
              </h3>
              <div className="space-y-2">
                {topicSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-2 text-xs rounded-md hover:bg-background transition-colors cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-5 relative h-full overscroll-contain"
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`group flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[85%] items-start gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div
                      className={`relative rounded-lg px-4 py-3 text-sm whitespace-pre-line ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.content}

                      {message.isChart && message.coinData && (
                        <div className="mt-3 pt-3 border-t border-foreground/10">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <div className="font-bold">{message.coinData.name} (${message.coinData.symbol})</div>
                              <div className="text-xl font-semibold">${message.coinData.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className={`py-1 px-2 rounded text-xs ${message.coinData.change24h >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                              {message.coinData.change24h >= 0 ? '+' : ''}{message.coinData.change24h.toFixed(2)}%
                            </div>
                          </div>

                          <div className="bg-background/50 rounded-lg p-3 mb-2 h-32 flex items-center justify-center">
                            {message.coinData.chartType === "analysis" && message.coinData.chartData?.technicalIndicators ? (
                              <TechnicalAnalysis
                                data={message.coinData.chartData.technicalIndicators}
                                price={message.coinData.price}
                              />
                            ) : message.coinData.chartData?.bars ? (
                              <PriceChart
                                chartData={message.coinData.chartData.bars}
                                symbol={message.coinData.symbol}
                              />
                            ) : null}
                          </div>

                          <div className="text-xs text-foreground/70">
                            {message.coinData.chartType === "analysis" ?
                              "Technical indicators suggest monitoring for potential entry points. Volatility remains high." :
                              "Data shown is from the last 24 hours. Chart updates every 15 minutes."
                            }
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => handleCopyMessage(message.content, message.id)}
                        className={`absolute -right-10 top-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background ${
                          copiedMessageId === message.id ? "text-primary" : "text-muted-foreground"
                        }`}
                        aria-label="Copy message"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground px-1">
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="flex max-w-[85%] items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="rounded-lg px-4 py-3 text-sm bg-muted text-foreground flex items-center">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-pulse"></span>
                        <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground px-1">
                      Typing...
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div />
        </div>

        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}