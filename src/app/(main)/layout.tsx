"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    // You can show a global loading spinner here
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
