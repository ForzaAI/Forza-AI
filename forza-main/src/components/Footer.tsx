import { Github, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Forza AI" className="h-8 w-8" />
              <span className="text-xl font-bold">Forza AI</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Supercharge your journey through the blockchain universe with Forza AI.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://x.com/forzaaisol" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" className="h-5 w-5">
                  <g fill="none">
                    <g clipPath="url(#primeTwitter0)">
                      <path fill="currentColor" d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z" />
                    </g>
                    <defs>
                      <clipPath id="primeTwitter0">
                        <path fill="#fff" d="M0 0h14v14H0z" />
                      </clipPath>
                    </defs>
                  </g>
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Socials</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="https://x.com/forzaaisol" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" className="h-4 w-4">
                    <g fill="none">
                      <g clipPath="url(#primeTwitter1)">
                        <path fill="currentColor" d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z" />
                      </g>
                      <defs>
                        <clipPath id="primeTwitter1">
                          <path fill="#fff" d="M0 0h14v14H0z" />
                        </clipPath>
                      </defs>
                    </g>
                  </svg>
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Forza AI. All rights reserved.</p>
          <p className="mt-2">
            Built on <span className="text-primary">Solana</span>. Powered by AI.
          </p>
        </div>
      </div>
    </footer>
  );
}