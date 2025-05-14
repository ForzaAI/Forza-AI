import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import Header from "../Header";
import Footer from "../Footer";
import CodeExplainer from "./CodeExplainer";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

export default function CodeExplainerPage() {

  useAuthRedirect();

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <AnimatePresence mode="wait">
        <Header />
        <main className="relative pt-8">
          <div className="py-4">
            <CodeExplainer />
          </div>
        </main>
        <Footer />
        <Toaster richColors />
      </AnimatePresence>
    </div>
  );
}