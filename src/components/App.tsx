import { Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import Hero from "./Home/Hero";
import Features from "./Home/Features";
import Utilities from "./Home/Utilities";
import Chatbot from "./Home/Chatbot";
import MarketData from "./Home/MarketData";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const SectionCTA = ({ href, text }: { href: string; text: string }) => (
  <div className="flex justify-center mt-8">
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button variant="outline" onClick={() => window.location.href = href} className="group">
        {text}
        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <AnimatePresence mode="wait">
        <Header />
        <main className="relative">
          <Hero />

          <div className="relative">
          <Features />
            <SectionCTA href="/features" text="Explore All Features" />
          </div>

          <div className="relative">
          <Utilities />
            <SectionCTA href="/utilities" text="Discover More Utilities" />
          </div>

          <div className="relative">
          <MarketData />
            <SectionCTA href="/market-data" text="View Full Market Data" />
          </div>

          <Chatbot />
        </main>
        <Footer />
        <Toaster richColors />
      </AnimatePresence>
    </div>
  );
}