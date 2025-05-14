import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronRight } from "lucide-react";
import { Input } from "./ui/input";

interface NavLink {
  href: string;
  label: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isChatPage, setIsChatPage] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const mockLoggedInCheck = localStorage.getItem("forza_logged_in") === "true";
    setIsLoggedIn(mockLoggedInCheck);

    setIsChatPage(window.location.pathname === "/chat");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleAuth = (action: 'login' | 'signup' | 'chat' | 'logout') => {
    if (action === "login") {
      window.location.href = "/login";
    } else if (action === "signup") {
      window.location.href = "/signup";
    } else if (action === "chat") {
      window.location.href = "/chat";
    } else if (action === "logout") {
      localStorage.removeItem("forza_logged_in");
      setIsLoggedIn(false);
      window.location.href = "/";
    }
    setIsMenuOpen(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      localStorage.setItem("forza_logged_in", "true");
      window.location.href = "/chat";
    }
  };

  const navLinks: NavLink[] = [
    { href: "/features", label: "Features" },
    { href: "/utilities", label: "Utilities" },
    { href: "/market-data", label: "Market Data" },
    { href: "/chat", label: "AI Assistant" },
    { href: "/code-explainer", label: "Code Explainer" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    window.location.href = href;
  };

  return (
    <header className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled ? "bg-background/90 shadow-md backdrop-blur-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 z-50">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Forza AI" className="h-8 w-8" />
              <span className="text-xl font-bold">Forza AI</span>
            </a>
          </div>

          {/* Center Navigation - absolute positioning to ensure true center alignment */}
          <div className="absolute left-0 right-0 mx-auto w-fit top-1/2 -translate-y-1/2 hidden md:block">
            <nav className="flex items-center space-x-8">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                {!isChatPage && (
                  <Button variant="outline" onClick={() => handleAuth("chat")}>Open AI Chat</Button>
                )}
                <Button onClick={() => handleAuth("logout")}>Log out</Button>
              </>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Fill your email to use our platform"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-64 h-9"
                  required
                />
                <Button type="submit" size="sm">Go</Button>
              </form>
            )}
          </div>

          {/* Mobile Menu Button with Popover */}
          <div className="md:hidden relative menu-container">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="z-50 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ?
                <X className="h-6 w-6 text-primary" /> :
                <Menu className="h-6 w-6" />
              }
            </button>

            {/* Popover Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-64 bg-background rounded-lg shadow-lg z-50 py-4 border">
                {/* Navigation Links */}
                <nav className="flex flex-col">
                  {navLinks.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center justify-between"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}

                  {/* Auth Section */}
                  <div className="mt-2 pt-2 border-t px-4">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        {!isChatPage && (
                          <Button variant="outline" className="w-full justify-center text-sm" size="sm" onClick={() => handleAuth("chat")}>
                            Open AI Chat
                          </Button>
                        )}
                        <Button className="w-full justify-center text-sm" size="sm" onClick={() => handleAuth("logout")}>
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleEmailSubmit} className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Fill your email to use our platform"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-sm"
                          required
                        />
                        <Button type="submit" className="w-full justify-center text-sm" size="sm">
                          Start using AI
                        </Button>
                      </form>
                    )}
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}