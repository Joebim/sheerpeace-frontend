"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/utils/authService";
import useUserStore from "@/store/user.store";
import { toast } from "sonner";
import Link from "next/link";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onSuccess?: () => void;
}

export function LoginForm({ className, onSuccess, ...props }: LoginFormProps) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { fetchUser, setAuthToken } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const response = await loginUser(credentials);
      console.log(response);
      setAuthToken(response.token);
      fetchUser();
      if (response) {
        onSuccess?.();
        router.push("/");
        toast.success("Logged in successfully");
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleLogin}
      {...props}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to continue
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm underline-offset-4 hover:underline">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-sheerpeace-purple-secondary text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="underline underline-offset-4 text-sheerpeace-purple-secondary"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
