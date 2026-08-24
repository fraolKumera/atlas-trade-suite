import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/kokora-logo.png";
import { ThemeToggle } from "./theme";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#routes", label: "Trade Routes" },
  { href: "#commodities", label: "Commodities" },
  { href: "#operations", label: "Operations" },
  { href: "#services", label: "Services" },
  { href: "#quote", label: "Quote" },
  { href: "#trust", label: "Compliance" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="Kokora Import & Export logo"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-border"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold tracking-tight sm:text-base">
              KOKORA
            </span>
            <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Import &amp; Export
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden shadow-[var(--shadow-glow)] sm:inline-flex">
            <a href="#quote">Request a Quote</a>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <ul className="col-span-2 grid gap-1 border-t border-border pt-3 lg:hidden">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
