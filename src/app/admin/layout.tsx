"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Gamepad2,
  Newspaper,
  LayoutDashboard
} from "lucide-react"
import { useDoc, useFirestore, useUser, useMemoFirebase } from "@/firebase"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { doc } from "firebase/firestore"

const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/games", icon: Gamepad2, label: "Games" },
    { href: "/admin/blog", icon: Newspaper, label: "Blog" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const adminRoleRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'roles_admin', user.uid);
  }, [firestore, user]);

  const { data: adminRole, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isChecking = isUserLoading || isAdminRoleLoading;
    
    if (!isChecking) {
      if (!user) {
        router.push('/login');
      } else if (adminRole === null) {
        // Not an admin, redirect to home.
        router.push('/');
      } else {
        // Is an admin
        setIsAuthorized(true);
      }
    }
  }, [user, isUserLoading, adminRole, isAdminRoleLoading, router]);

  if (isUserLoading || isAdminRoleLoading || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold font-headline">
              <Gamepad2 className="h-6 w-6 text-primary" style={{filter: 'drop-shadow(0 0 5px hsl(var(--primary)))'}} />
              <span className="">Tech And Gaming</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map(({href, icon: Icon, label}) => (
                <Link
                  key={href}
                  href={href}
                  className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", { "bg-muted text-primary": pathname === href})}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {/* Mobile header would go here */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
