import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Brain, Code, Cpu, BarChart3, Shield, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const features = [
  {
    title: "AI-Powered Analysis",
    description: "Get instant token analysis with our advanced AI models trained on massive crypto datasets.",
    icon: Brain,
    link: "/utilities",
  },
  {
    title: "Code Explanation",
    description: "Understand smart contracts and blockchain code with our AI Code Explainer.",
    icon: Code,
    link: "/code-explainer",
  },
  {
    title: "Productivity Agent",
    description: "Your 24/7 personal assistant to help with research, content creation, and more.",
    icon: Cpu,
    link: "/utilities",
  },
  {
    title: "Real-time Market Data",
    description: "Track cryptocurrency prices, market caps, and trading volumes in real-time.",
    icon: BarChart3,
    link: "/market-data",
  },
  {
    title: "Secure Platform",
    description: "Built with security at its core to protect your data and investments.",
    icon: Shield,
  },
  {
    title: "Staking Rewards",
    description: "Earn passive rewards by staking your $FORZA tokens.",
    icon: Rocket,
    link: "/utilities",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-muted/30 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful AI Features for Crypto
          </h2>
          <p className="mt-4 text-muted-foreground">
            Forza AI combines the power of artificial intelligence with blockchain technology,
            creating a seamless experience for investors, developers, and creators.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="group overflow-hidden border-border/40 transition-all hover:border-primary/60 hover:shadow-md">
                <CardHeader className="pb-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="mb-4 rounded-md bg-primary/10 p-2 w-10 h-10 flex items-center justify-center"
                  >
                    <feature.icon className="h-5 w-5 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                  {feature.link && (
                    <div className="mt-4">
                      <a
                        href={feature.link}
                        className="text-primary hover:text-primary/80 text-sm inline-flex items-center"
                      >
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}