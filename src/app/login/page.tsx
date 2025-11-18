
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gamepad2 } from "lucide-react";
import { initiateEmailSignIn, useAuth, useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!auth) {
        setError("Authentication service is not available.");
        return;
    }
    
    initiateEmailSignIn(auth, email, password).catch(err => {
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
            setError("Hahahah, I knew you aren't allowed here... Now GET OUT!");
        } else {
            setError(err.message || "An unexpected error occurred.");
        }
    });
  };
  
  if (isUserLoading || user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="text-foreground">Loading...</div>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-grow flex items-center justify-center w-full">
        <Image
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Hero background"
          fill
          className="object-cover"
          data-ai-hint="abstract background"
          priority
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <Card className="w-full max-w-sm z-10 bg-card/60 border-white/20">
          <form onSubmit={handleAuthAction}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                  <Gamepad2 className="h-10 w-10 text-primary" style={{filter: 'drop-shadow(0 0 10px hsl(var(--primary)))'}} />
              </div>
              <CardTitle className="text-2xl font-headline">
                Nope, this is not ready YET!
              </CardTitle>
              <CardDescription>
                Lets see if you are allowed here 🤔
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              {error && <p className="text-sm text-white">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit">
                Let me in!
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
