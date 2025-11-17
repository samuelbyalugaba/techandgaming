"use client";

import Link from "next/link";
import { Gamepad2, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/blog", label: "News" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary-foreground/80",
        pathname === href
          ? "text-primary-foreground"
          : "text-primary-foreground/60"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-accent" style={{filter: 'drop-shadow(0 0 5px hsl(var(--accent)))'}} />
            <span className="hidden font-bold sm:inline-block font-headline text-primary-foreground">
              Tech And Gaming
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary text-primary-foreground border-r-accent/20">
            <div className="flex flex-col gap-6 mt-8">
              <Link href="/" className="mb-4 flex items-center space-x-2">
                 <Gamepad2 className="h-6 w-6 text-accent" style={{filter: 'drop-shadow(0 0 5px hsl(var(--accent)))'}} />
                <span className="font-bold font-headline text-primary-foreground">
                  Tech And Gaming
                </span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary-foreground/80",
                    pathname === link.href
                      ? "text-primary-foreground"
                      : "text-primary-foreground/60"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Right side content can go here if needed */}
        </div>
      </div>
    </header>
  );
}
