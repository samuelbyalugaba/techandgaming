"use client";

import { useState } from "react";
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
import { initiateEmailSignIn, initiateEmailSignUp, useAuth, useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
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
    try {
        if (isSignUp) {
            initiateEmailSignUp(auth, email, password);
        } else {
            initiateEmailSignIn(auth, email, password);
        }
    } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
    }
  };
  
  if (isUserLoading || user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <p>Loading...</p>
        </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleAuthAction}>
          <CardHeader className="text-center">
             <div className="flex justify-center mb-4">
                <Gamepad2 className="h-10 w-10 text-primary" style={{filter: 'drop-shadow(0 0 10px hsl(var(--primary)))'}} />
            </div>
            <CardTitle className="text-2xl font-headline">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription>
              {isSignUp
                ? "Enter your details to create an account."
                : "Enter your credentials to access your account."}
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
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Button
              variant="link"
              type="button"
              className="text-muted-foreground"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
