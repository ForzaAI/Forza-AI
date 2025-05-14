import React from "react";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import Header from "../Header";
import Footer from "../Footer";
import Utilities from "../Home/Utilities";

export default function UtilitiesPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <AnimatePresence mode="wait">
        <Header />
        <main className="relative pt-8">
          <div className="w-full">
            <Utilities />
          </div>
        </main>
        <Footer />
        <Toaster richColors />
      </AnimatePresence>
    </div>
  );
}