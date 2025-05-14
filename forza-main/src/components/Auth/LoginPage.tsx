import React, { useEffect } from "react";
import { Toaster } from "sonner";
import Header from "../Header";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('forza_logged_in') === 'true';

    if (isLoggedIn) {
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect');

      window.location.href = redirect || '/chat';
    }
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email to continue your crypto journey
            </p>
          </div>
          <div className="backdrop-blur-sm bg-card/90 rounded-xl border shadow-sm p-6 sm:p-8">
            <LoginForm />
          </div>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}