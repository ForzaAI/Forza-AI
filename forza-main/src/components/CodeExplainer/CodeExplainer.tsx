import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Check, ChevronsUpDown, Copy, Code as CodeIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

// List of supported programming languages
const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "solidity", label: "Solidity" },
] as const;

type Language = typeof languages[number]["value"];

export default function CodeExplainer() {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);
  const [isExplaining, setIsExplaining] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("code");
  const [isCodeCopied, setIsCodeCopied] = useState<boolean>(false);
  const [isExplanationCopied, setIsExplanationCopied] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const explainCode = async () => {
    if (!code.trim()) return;

    setIsExplaining(true);
    setActiveTab("explanation");

    try {
      const systemInstruction = `You are a code explanation assistant. Your task is to analyze the provided code and explain:
1. The purpose of the code
2. The key components and how they work
3. The overall code flow
4. Any potential optimizations or improvements
5. Any security concerns if applicable
6. Do not include any code in your response.

Explain the code in a clear, structured way that would be helpful for programmers of any skill level.
Focus on the code's functionality, design patterns, and important aspects.
If the code is in a specific language (${language}), highlight any language-specific features being used.`;

      const messages = [
        {
          role: 'assistant',
          content: systemInstruction
        }
      ];

      const prompt = `Please explain this ${language} code:\n\n${code}`;

      const nexraResponse = await fetch('https://nexra.aryahcr.cc/api/chat/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages,
          prompt: prompt,
          model: "GPT-4",
          markdown: false
        }),
      });

      if (!nexraResponse.ok) {
        const errorData = await nexraResponse.json().catch(() => ({ error: 'Failed to parse error response from Nexra' }));
        console.error('Nexra API error (initial POST for code explanation):', nexraResponse.status, errorData);
        throw new Error(errorData.error || `Nexra API failed with status ${nexraResponse.status}`);
      }

      const nexraData = await nexraResponse.json();
      const taskId = nexraData.id;

      if (!taskId) {
        console.error('Failed to get task ID from Nexra API for code explanation:', nexraData);
        throw new Error('Failed to get task ID from Nexra API for code explanation');
      }

      let finalExplanation = "Sorry, I couldn't analyze your code. Please try again.";
      let isCompleted = false;
      const maxAttempts = 40;
      let attempts = 0;
      let pollingDelay = 1000;

      while (!isCompleted && attempts < maxAttempts) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, pollingDelay));

        if (attempts > 10 && pollingDelay < 2000) {
          pollingDelay = 2000;
        }

        const statusResponse = await fetch(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(taskId)}`);

        if (!statusResponse.ok) {
          const errorData = await statusResponse.json().catch(() => ({}));
          console.error('Nexra API error (polling GET for code explanation):', statusResponse.status, errorData);
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }

        const responseData = await statusResponse.json();

        if (responseData.status === "completed") {
          isCompleted = true;
          if (responseData.gpt) {
            finalExplanation = responseData.gpt;
          }
        } else if (responseData.status === "error" || responseData.status === "not_found") {
          isCompleted = true;
          console.error('Nexra task error or not found for code explanation:', responseData.error || responseData.status);
        }
      }

      if (!isCompleted) {
        try {
            const finalCheckResponse = await fetch(`https://nexra.aryahcr.cc/api/chat/task/${encodeURIComponent(taskId)}`);
            if (finalCheckResponse.ok) {
              const finalData = await finalCheckResponse.json();
              if (finalData.status === "completed" && finalData.gpt) {
                finalExplanation = finalData.gpt;
              }
            }
          } catch (e) {
            console.error("Error during final check for code explanation:", e);
          }
        console.error('Nexra task for code explanation timed out after', maxAttempts, 'attempts.');
      }

      setExplanation(finalExplanation);
    } catch (error) {
      console.error('Error explaining code:', error);
      setExplanation("Sorry, there was an error analyzing your code. Please try again later.");
    } finally {
      setIsExplaining(false);
    }
  };

  const copyToClipboard = (text: string, isExplanation: boolean) => {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed'; // Avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          if (isExplanation) {
            setIsExplanationCopied(true);
            setTimeout(() => setIsExplanationCopied(false), 2000);
          } else {
            setIsCodeCopied(true);
            setTimeout(() => setIsCodeCopied(false), 2000);
          }
        }
      } catch (err) {
        console.error('Fallback: Could not copy text', err);
      }

      document.body.removeChild(textArea);
      return;
    }

    // Modern browsers
    navigator.clipboard.writeText(text)
      .then(() => {
        if (isExplanation) {
          setIsExplanationCopied(true);
          setTimeout(() => setIsExplanationCopied(false), 2000);
        } else {
          setIsCodeCopied(true);
          setTimeout(() => setIsCodeCopied(false), 2000);
        }
      })
      .catch(err => {
        console.error('Clipboard API: Could not copy text', err);
      });
  };

  return (
    <section id="code-explainer" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI Code Explainer
          </h2>
          <p className="mt-4 text-muted-foreground">
            Paste your code below and let our AI analyze it to provide a detailed explanation of its functionality, purpose, and structure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 mx-auto max-w-4xl"
        >
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CodeIcon className="h-5 w-5 text-primary" />
                    Code Analysis
                  </CardTitle>
                  <CardDescription>
                    Paste your code snippet and select a language
                  </CardDescription>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isLanguageDropdownOpen}
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="w-full justify-between"
                  >
                    {languages.find(lang => lang.value === language)?.label || "Select language"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                  {isLanguageDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-popover bg-popover text-popover-foreground shadow-lg">
                      <div className="max-h-[300px] overflow-y-auto py-1">
                        {languages.map((lang) => (
                          <Button
                            key={lang.value}
                            variant="ghost"
                            className="justify-start font-normal w-full rounded-none px-2 py-1.5 text-sm"
                            onClick={() => {
                              setLanguage(lang.value);
                              setIsLanguageDropdownOpen(false);
                            }}
                          >
                            <span className="truncate">{lang.label}</span>
                            {language === lang.value && (
                              <Check className="ml-auto h-4 w-4 opacity-100" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="code">Code Input</TabsTrigger>
                    <TabsTrigger value="explanation">
                      Explanation
                      {isExplaining && (
                        <div className="ml-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="code" className="mt-4">
                    <div className="relative">
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => copyToClipboard(code, false)}
                        >
                          {isCodeCopied ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="rounded-md border">
                        <Textarea
                          placeholder="Paste your code here..."
                          className="min-h-[400px] max-h-[400px] font-mono"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      className="mt-4 w-full sm:w-auto flex gap-2 items-center"
                      onClick={explainCode}
                      disabled={!code.trim() || isExplaining}
                    >
                      <Sparkles className="h-4 w-4" />
                      {isExplaining ? "Analyzing..." : "Explain Code"}
                    </Button>
                  </TabsContent>

                  <TabsContent value="explanation" className="mt-4">
                    <div className="relative rounded-md border overflow-hidden">
                      <div className="absolute top-2 right-2 z-10">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => copyToClipboard(explanation, true)}
                        >
                          {isExplanationCopied ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {explanation ? (
                        <div className="p-4 h-[400px] overflow-y-auto prose dark:prose-invert prose-sm sm:prose-base">
                          <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
                          {isExplaining ? (
                            <div className="flex flex-col items-center gap-4">
                              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                              <p>Analyzing your code...</p>
                            </div>
                          ) : (
                            <p>Explanation will appear here after you analyze your code</p>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                {code && activeTab === "code" && (
                  <div className="mt-4 rounded-md border overflow-hidden">
                    <div className="max-h-[400px] overflow-auto">
                      <SyntaxHighlighter
                        language={language}
                        style={vs}
                        customStyle={{ margin: 0 }}
                        wrapLines={true}
                        wrapLongLines={true}
                      >
                        {code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}