"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    usernameOrEmail: "",
    password: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      usernameOrEmail: "",
      password: "",
      general: "",
    };

    if (!form.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or email is required.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return !newErrors.usernameOrEmail && !newErrors.password;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const storedUsers = localStorage.getItem("users");

    if (!storedUsers) {
      setErrors((prev) => ({
        ...prev,
        general: "No account found. Please register first.",
      }));
      return;
    }

    const users = JSON.parse(storedUsers);

    const matchedUser = users.find(
      (user: any) =>
        (form.usernameOrEmail === user.username ||
          form.usernameOrEmail === user.email) &&
        form.password === user.password,
    );

    if (matchedUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: matchedUser.fullName,
          username: matchedUser.username,
          email: matchedUser.email,
        }),
      );

      window.dispatchEvent(new Event("auth-change"));

      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
      router.refresh();
    } else {
      setErrors((prev) => ({
        ...prev,
        general: "Invalid username/email or password.",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="flex items-center justify-center px-6 py-1 lg:col-span-2">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin}>
            <FieldSet className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
              <FieldGroup className="space-y-5">
                <Field>
                  <div className="mb-6 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                      Sign In
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                      Welcome back! Please enter your details to continue
                    </p>
                  </div>

                  <FieldLabel
                    htmlFor="usernameOrEmail"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Username or Email
                  </FieldLabel>

                  <Input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    type="text"
                    placeholder="Enter your username or email"
                    className={`mt-2 h-11 rounded-xl dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-500 ${
                      errors.usernameOrEmail
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 dark:border-white/10"
                    }`}
                    value={form.usernameOrEmail}
                    onChange={handleChange}
                  />

                  {errors.usernameOrEmail ? (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.usernameOrEmail}
                    </p>
                  ) : (
                    <FieldDescription className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Use your registered username or email address.
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    Password
                  </FieldLabel>

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={`mt-2 h-11 rounded-xl dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-500 ${
                      errors.password
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 dark:border-white/10"
                    }`}
                    value={form.password}
                    onChange={handleChange}
                  />

                  {errors.password ? (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.password}
                    </p>
                  ) : (
                    <FieldDescription className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Must be at least 8 characters long.
                    </FieldDescription>
                  )}
                </Field>

                {errors.general && (
                  <p className="text-sm text-red-500">{errors.general}</p>
                )}

                <Button
                  type="submit"
                  className="mt-2 h-11 w-full rounded-xl bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Sign In
                </Button>
              </FieldGroup>
            </FieldSet>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-black hover:underline dark:text-white"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPageClient;
