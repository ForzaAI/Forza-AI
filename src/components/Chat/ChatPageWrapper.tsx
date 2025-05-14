import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import Header from "../Header";
import Footer from "../Footer";
import ChatPage from "./ChatPage";

export default function ChatPageWrapper() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <AnimatePresence mode="wait">
        <Header />
        <main className="relative pt-8">
          <ChatPage />
        </main>
        <Footer />
        <Toaster richColors />
      </AnimatePresence>
    </div>
  );
}