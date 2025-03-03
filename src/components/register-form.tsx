"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/utils/authService";

interface RegisterFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onSuccess?: () => void;
}

export function RegisterForm({
  className,
  onSuccess,
  ...props
}: RegisterFormProps) {
  const [registerUserDetails, setRegisterUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (registerUserDetails.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const data = {
      first_name: registerUserDetails.firstname,
      last_name: registerUserDetails.lastname,
      email: registerUserDetails.email.toLowerCase(),
      password: registerUserDetails.password,
      phone_number: registerUserDetails.phone_number,
      role: "user",
    };

    try {
      setLoading(true);
      const response = await registerUser(data);
      if (response) {
        onSuccess?.();
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleRegister}
      {...props}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to sign up
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          {" "}
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              value={registerUserDetails.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              value={registerUserDetails.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={registerUserDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              type="tel"
              value={registerUserDetails.phone_number}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={registerUserDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
