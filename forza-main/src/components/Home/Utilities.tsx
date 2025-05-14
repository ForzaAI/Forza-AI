import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ChevronRight, MessageSquare, Code, LineChart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export default function Utilities() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const TabNavigation = ({ className = "" }) => (
    <TabsList className={`grid ${isMobile ? 'grid-cols-4 max-w-2xl' : 'w-full grid-cols-4'} max-sm:h-auto rounded-md border overflow-hidden ${className}`}>
      <TabsTrigger value="consultant" className="flex flex-col items-center justify-center py-2 px-1 sm:py-2 sm:px-4 sm:flex-row sm:gap-2 h-full sm:h-11 text-center">
        <LineChart className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Token Consultant</span>
        <span className="text-[10px] mt-1 sm:hidden">Consultant</span>
      </TabsTrigger>
      <TabsTrigger value="agent" className="flex flex-col items-center justify-center py-2 px-1 sm:py-2 sm:px-4 sm:flex-row sm:gap-2 h-full sm:h-11 text-center">
        <MessageSquare className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Productivity Agent</span>
        <span className="text-[10px] mt-1 sm:hidden">Agent</span>
      </TabsTrigger>
      <TabsTrigger value="code" className="flex flex-col items-center justify-center py-2 px-1 sm:py-2 sm:px-4 sm:flex-row sm:gap-2 h-full sm:h-11 text-center">
        <Code className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Code Explainer</span>
        <span className="text-[10px] mt-1 sm:hidden">Code</span>
      </TabsTrigger>
      <TabsTrigger value="staking" className="flex flex-col items-center justify-center py-2 px-1 sm:py-2 sm:px-4 sm:flex-row sm:gap-2 h-full sm:h-11 text-center">
        <Sparkles className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Staking</span>
        <span className="text-[10px] mt-1 sm:hidden">Staking</span>
      </TabsTrigger>
    </TabsList>
  );

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Forza AI Utilities
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore our suite of AI-powered utilities designed to enhance your crypto experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <Tabs defaultValue="consultant" className="w-full">
            {/* Mobile View */}
            <div className="sm:hidden">
              <TabsList className="grid w-full grid-cols-4 rounded-md border overflow-hidden">
                <TabsTrigger value="consultant" className="flex items-center justify-center py-2 px-1">
                  <LineChart className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger value="agent" className="flex items-center justify-center py-2 px-1">
                  <MessageSquare className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center justify-center py-2 px-1">
                  <Code className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger value="staking" className="flex items-center justify-center py-2 px-1">
                  <Sparkles className="h-5 w-5" />
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block">
              <TabsList className="flex w-full rounded-md border overflow-hidden">
                <TabsTrigger value="consultant" className="flex-1 flex items-center justify-center gap-2 py-2 px-4">
                  <LineChart className="h-4 w-4" />
                  <span>Token Consultant</span>
                </TabsTrigger>
                <TabsTrigger value="agent" className="flex-1 flex items-center justify-center gap-2 py-2 px-4">
                  <MessageSquare className="h-4 w-4" />
                  <span>Productivity Agent</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex-1 flex items-center justify-center gap-2 py-2 px-4">
                  <Code className="h-4 w-4" />
                  <span>Code Explainer</span>
                </TabsTrigger>
                <TabsTrigger value="staking" className="flex-1 flex items-center justify-center gap-2 py-2 px-4">
                  <Sparkles className="h-4 w-4" />
                  <span>Staking</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="w-full mt-8 overflow-hidden rounded-lg border bg-card p-4 sm:p-6">
              <TabsContent value="consultant" className="py-6">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold">AI Token Consultant</h3>
                    <p className="mt-2 text-muted-foreground">
                      Your personal blockchain analyst, built to eliminate the guesswork from token research and investment.
                    </p>
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="mt-6 space-y-3"
                    >
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Full tokenomics breakdown with supply metrics and distribution schedules</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Utility and use case summary to understand potential value</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Risk assessment highlighting potential red flags</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Future outlook with growth scenarios based on similar projects</span>
                      </motion.li>
                    </motion.ul>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-8"
                    >
                      <Button onClick={() => window.location.href = "/chat"}>Try Token Analysis</Button>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-muted/30 p-6 flex items-center justify-center rounded-lg overflow-hidden"
                  >
                    <div className="w-full max-w-md rounded-lg border bg-card p-4 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <LineChart className="h-4 w-4 text-primary" />
                          </div>
                          <div className="font-medium">Token Analysis Report</div>
                        </div>
                        <div className="rounded-md bg-primary/5 p-3">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Tokenomics</div>
                            <div className="text-sm text-primary">Strong</div>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full mb-3">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "78%" }}></div>
                          </div>

                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Utility</div>
                            <div className="text-sm text-primary">High</div>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full mb-3">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                          </div>

                          <div className="flex justify-between mb-2">
                            <div className="font-medium">Risk Score</div>
                            <div className="text-sm text-primary">Low</div>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-2 rounded-full bg-primary" style={{ width: "25%" }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Circulating Supply:</div>
                            <div className="text-sm font-medium">500M (50%)</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Market Cap:</div>
                            <div className="text-sm font-medium">$120M</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-sm text-muted-foreground">Growth Potential:</div>
                            <div className="text-sm font-medium text-emerald-500">High ↑</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="agent" className="py-6">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold">AI Productivity Agent</h3>
                    <p className="mt-2 text-muted-foreground">
                      Your 24/7 personal assistant, trained to understand and answer any question you throw at it — instantly, intelligently, and contextually.
                    </p>
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="mt-6 space-y-3"
                    >
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Research assistance with comprehensive topic summaries</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Creative brainstorming for content, marketing, and projects</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Business support with proposals, workflows, and planning</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Communication help for emails, social media, and content</span>
                      </motion.li>
                    </motion.ul>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-8"
                    >
                      <Button onClick={() => window.location.href = "/chat"}>Chat with AI</Button>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-muted/30 p-6 flex items-center justify-center rounded-lg overflow-hidden"
                  >
                    <div className="w-full max-w-md rounded-lg border bg-card p-4 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>
                          <div className="font-medium">Forza Assistant</div>
                        </div>
                        <div className="flex justify-end">
                          <div className="rounded-lg bg-primary/10 p-3 max-w-[75%]">
                            <p className="text-sm">What's the best way to research potential token investments?</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="rounded-lg bg-secondary p-3 max-w-[75%]">
                            <p className="text-sm">To research potential token investments, you should:</p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Review the project's whitepaper</li>
                              <li>• Analyze token utility and economics</li>
                              <li>• Check team background and experience</li>
                              <li>• Examine community engagement</li>
                            </ul>
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="flex items-center bg-muted/30 rounded-md p-2">
                            <input type="text" placeholder="Ask me anything..." className="w-full bg-transparent border-none outline-none text-sm" />
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="py-6">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold">AI Code Explainer</h3>
                    <p className="mt-2 text-muted-foreground">
                      Turns raw, intimidating code into simple, plain-language explanations that anyone can understand line by line or block by block.
                    </p>
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="mt-6 space-y-3"
                    >
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Multi-language support for Solidity, Rust, Python, JavaScript, and more</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Detailed explanations of logic, function, and code relationships</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Optimization suggestions for more efficient code</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Security insights for smart contracts and vulnerability detection</span>
                      </motion.li>
                    </motion.ul>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-8"
                    >
                      <Button onClick={() => window.location.href = "/code-explainer"}>Analyze Code</Button>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-muted/30 p-6 flex items-center justify-center rounded-lg overflow-hidden"
                  >
                    <div className="w-full max-w-md rounded-lg border bg-card p-4 shadow-lg overflow-hidden">
                      <div className="flex flex-col">
                        <div className="flex space-x-2 p-2 border-b">
                          <div className="h-3 w-3 rounded-full bg-destructive/70"></div>
                          <div className="h-3 w-3 rounded-full bg-amber-500/70"></div>
                          <div className="h-3 w-3 rounded-full bg-emerald-500/70"></div>
                        </div>
                        <div className="p-4 space-y-2 font-mono text-xs">
                          <div className="flex">
                            <span className="text-chart-2 mr-2">function</span>
                            <span className="text-chart-1">transfer</span>
                            <span>(address to, uint256 amount)</span>
                          </div>
                          <div className="pl-4">
                            <span className="text-chart-2">return</span>
                            <span> success;</span>
                          </div>
                          <div className="h-4"></div>
                          <div className="border-t border-primary/10 pt-2">
                            <span className="text-chart-3">// Explanation:</span>
                          </div>
                          <div className="h-4 w-full rounded bg-primary/5"></div>
                          <div className="h-4 w-5/6 rounded bg-primary/5"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="staking" className="py-6">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold">Forza Staking <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Coming Soon</span></h3>
                    <p className="mt-2 text-muted-foreground">
                      Stake your $FORZA tokens to earn passive rewards while contributing to the security and growth of the Forza ecosystem.
                    </p>
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="mt-6 space-y-3"
                    >
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Flexible staking pools with different lock periods and APY rates</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Community voting power for governance decisions</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Early access to new AI features and premium tools</span>
                      </motion.li>
                      <motion.li variants={itemVariants} className="flex items-start">
                        <ChevronRight className="mr-2 h-5 w-5 text-primary shrink-0" />
                        <span>Compounding growth options for amplified returns</span>
                      </motion.li>
                    </motion.ul>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-muted/30 p-6 flex items-center justify-center rounded-lg overflow-hidden"
                  >
                    <div className="w-full max-w-md rounded-lg border bg-card p-4 shadow-lg">
                      <div className="space-y-6">
                        <div className="flex justify-between">
                          <div className="text-lg font-semibold">Staking Dashboard</div>
                          <div className="text-sm text-primary bg-primary/10 px-2 py-1 rounded">
                            Launching Q2
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border p-4">
                            <div className="text-xs text-muted-foreground">APY</div>
                            <div className="mt-1 text-2xl font-bold">12.5%</div>
                          </div>
                          <div className="rounded-lg border p-4">
                            <div className="text-xs text-muted-foreground">Lock Period</div>
                            <div className="mt-1 text-2xl font-bold">90 Days</div>
                          </div>
                        </div>
                        <motion.div
                          initial={{ width: "0%" }}
                          whileInView={{ width: "33%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-2 rounded-full bg-chart-1"
                          style={{ background: "var(--chart-1)" }}
                        >
                          <div className="h-2 rounded-full bg-primary/10"></div>
                        </motion.div>
                        <div className="text-xs text-muted-foreground text-center">
                          Staking pool filled: 33%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}