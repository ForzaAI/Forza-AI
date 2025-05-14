import React from "react";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import Header from "../Header";
import Footer from "../Footer";
import Features from "../Home/Features";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <AnimatePresence mode="wait">
        <Header />
        <main className="relative pt-8">
          <div className="py-4">
            <Features />
          </div>
        </main>
        <Footer />
        <Toaster richColors />
      </AnimatePresence>
    </div>
  );
}