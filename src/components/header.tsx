"use client";

import Link from "next/link";
import { Gamepad2, Menu, LogOut, User as UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, useDoc, useFirestore, useUser, useMemoFirebase } from "@/firebase";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { doc } from "firebase/firestore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/blog", label: "News" },
];

export function Header() {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();

  // This logic is kept in case you want to re-implement RBAC later.
  const adminRoleRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'roles_admin', user.uid);
  }, [firestore, user]);

  const { data: adminRole } = useDoc(adminRoleRef);
  const isAdmin = adminRole !== null;

  const handleSignOut = () => {
    if (auth) {
      auth.signOut();
      router.push('/login');
    }
  };


  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "relative py-2 text-sm font-medium transition-colors text-foreground/70 hover:text-foreground",
        pathname === href && "text-foreground"
      )}
    >
      {label}
      {pathname === href && (
         <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-primary" style={{filter: 'drop-shadow(0 0 5px hsl(var(--primary)))'}} />
            <span className="hidden font-bold sm:inline-block font-headline text-foreground">
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
        <div className="flex-1 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background text-foreground border-r-accent/20">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="mb-4 flex items-center space-x-2">
                  <Gamepad2 className="h-6 w-6 text-primary" style={{filter: 'drop-shadow(0 0 5px hsl(var(--primary)))'}} />
                  <span className="font-bold font-headline text-foreground">
                    Tech And Gaming
                  </span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-foreground/80",
                      pathname === link.href
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/management"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-foreground/80",
                      pathname.startsWith('/management')
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    Management
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar>
                            <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                            <AvatarFallback>
                                <UserIcon />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {isAdmin && <DropdownMenuItem asChild><Link href="/management">Management</Link></DropdownMenuItem>}
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
