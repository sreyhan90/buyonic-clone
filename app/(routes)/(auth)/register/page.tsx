"use client";

import Link from "next/link";
import { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type FormType = {
  fullName: string;
  username: string;
  email: string;
  emailConfirm: string;
  password: string;
  confirmPassword: string;
};

type ErrorsType = {
  fullName?: string;
  username?: string;
  email?: string;
  emailConfirm?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

const RegisterPage = () => {
  const router = useRouter();

  const [form, setForm] = useState<FormType>({
    fullName: "",
    username: "",
    email: "",
    emailConfirm: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorsType>({});

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
    const newErrors: ErrorsType = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!form.emailConfirm.trim()) {
      newErrors.emailConfirm = "Please confirm your email.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    }

    if (
      form.email.trim() &&
      form.emailConfirm.trim() &&
      form.email !== form.emailConfirm
    ) {
      newErrors.emailConfirm = "Emails do not match.";
    }

    if (
      form.password.trim() &&
      form.confirmPassword.trim() &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const registeredUser = {
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      password: form.password,
    };

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const isUsernameTaken = existingUsers.some(
      (user: any) => user.username === form.username,
    );

    const isEmailTaken = existingUsers.some(
      (user: any) => user.email === form.email,
    );

    if (isUsernameTaken) {
      setErrors((prev) => ({
        ...prev,
        username: "Username already taken.",
      }));
      return;
    }

    if (isEmailTaken) {
      setErrors((prev) => ({
        ...prev,
        email: "Email already registered.",
      }));
      return;
    }

    const updatedUsers = [...existingUsers, registeredUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem(
      "user",
      JSON.stringify({
        fullName: form.fullName,
        username: form.username,
        email: form.email,
      }),
    );

    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen justify-center bg-white px-6 pt-5">
      <div className="w-full max-w-2xl">
        <div className="mt-3">
          <h2 className="text-3xl font-semibold tracking-tight text-black">
            Create your account
          </h2>
        </div>

        <form onSubmit={handleRegister}>
          <FieldSet className="mt-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel className="text-sm font-medium text-black">
                  Full Name
                </FieldLabel>
                <Input
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className={`mt-2 h-11 rounded-xl ${
                    errors.fullName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  value={form.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <p className="mt-2 text-xs text-red-500">{errors.fullName}</p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-sm font-medium text-black">
                  Username
                </FieldLabel>
                <Input
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  className={`mt-2 h-11 rounded-xl ${
                    errors.username
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  value={form.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="mt-2 text-xs text-red-500">{errors.username}</p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-sm font-medium text-black">
                  Email
                </FieldLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`mt-2 h-11 rounded-xl ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-sm font-medium text-black">
                  Confirm Email
                </FieldLabel>
                <Input
                  name="emailConfirm"
                  type="email"
                  placeholder="Enter your email again"
                  className={`mt-2 h-11 rounded-xl ${
                    errors.emailConfirm
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  value={form.emailConfirm}
                  onChange={handleChange}
                />
                {errors.emailConfirm && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.emailConfirm}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-sm font-medium text-black">
                  Password
                </FieldLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={`mt-2 h-11 rounded-xl ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="mt-2 text-xs text-red-500">{errors.password}</p>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-sm font-medium text-black">
                  Confirm Password
                </FieldLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className={`mt-2 h-11 rounded-xl ${
                    errors.confirmPassword
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </Field>

              {errors.general && (
                <p className="col-span-1 text-sm text-red-500 md:col-span-2">
                  {errors.general}
                </p>
              )}

              <Button
                type="submit"
                className="col-span-1 mt-2 h-11 w-full rounded-xl bg-black text-white hover:bg-gray-800 md:col-span-2"
              >
                Create Account
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-black hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
