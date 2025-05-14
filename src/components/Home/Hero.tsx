"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const mockLoggedInCheck = localStorage.getItem("forza_logged_in") === "true"
    setIsLoggedIn(mockLoggedInCheck)
  }, [])

  const handleGetStarted = () => {
    if (isLoggedIn) {
      window.location.href = "/chat"
    } else {
      window.location.href = "/login"
    }
  }

  return (
    <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* 3D Grid Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-grid-white/[0.2] dark:bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 h-[40vh] w-[40vh] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-20 h-[50vh] w-[50vh] rounded-full bg-gradient-to-tr from-destructive/20 to-transparent blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-[40%] right-[20%] h-[30vh] w-[30vh] rounded-full bg-gradient-to-tl from-chart-3/20 to-transparent blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Floating Logo Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute top-[25%] left-[15%] z-10 opacity-80"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl border border-primary/30 flex items-center justify-center bg-background/30 backdrop-blur-md shadow-lg">
            <img src="/logo.png" alt="" className="w-10 h-10 md:w-16 md:h-16" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[10%] right-[15%] z-10 opacity-80"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-destructive/30 flex items-center justify-center bg-background/30 backdrop-blur-md shadow-lg">
            <img src="/logo.png" alt="" className="w-8 h-8 md:w-12 md:h-12" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-[70%] left-[25%] z-10 opacity-80 hidden md:block"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="w-16 h-16 rounded-lg border border-chart-3/30 flex items-center justify-center bg-background/30 backdrop-blur-md shadow-lg">
            <img src="/logo.png" alt="" className="w-10 h-10" />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container relative z-20 mx-auto px-6 py-16 md:py-24 mt-0">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now with advanced crypto insights
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-tight"
            >
              <span className="relative">
                <motion.span
                  className="bg-gradient-to-r from-destructive via-primary to-chart-3 bg-clip-text text-transparent block"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  Forza AI
                </motion.span>
              </span>
              <span className="text-foreground block mt-2">
                Your AI-Powered <br className="md:hidden" />
                Crypto Companion
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl text-muted-foreground max-w-2xl"
            >
              Supercharge your journey through the blockchain universe with Forza AI. Make crypto investing, coding, and
              productivity easier, smarter, and faster for everyone.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden h-14 px-8 text-lg font-medium transition-all"
                onClick={handleGetStarted}
              >
                <span className="relative z-10 flex items-center">
                  {isLoggedIn ? "Open AI Chat" : "Get Started"}
                  <motion.span
                    className="ml-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group h-14 px-8 text-lg font-medium border-primary/20 hover:border-primary/50 backdrop-blur-sm"
              >
                Learn More
                <Sparkles className="ml-2 h-5 w-5 text-primary" />
              </Button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center mt-8 md:mt-0"
            >
              <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ChevronDown className="h-6 w-6 text-muted-foreground" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
