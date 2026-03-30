"use client";

import React, { useMemo, useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LocateIcon, MailIcon, PhoneIcon } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isFormValid = useMemo(() => {
    return (
      fullName.trim().length > 0 &&
      email.trim().length > 0 &&
      message.trim().length > 10
    );
  }, [fullName, email, message]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-5">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              Get in touch
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
              Have a question or need help? Fill out the form and our team will
              get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-5 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Please fill in the required fields below.
              </p>
            </div>

            <FieldSet>
              <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field>
                  <FieldLabel className="text-sm font-medium text-gray-900">
                    Full Name *
                  </FieldLabel>
                  <Input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2 h-12 rounded-xl border-gray-300"
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-sm font-medium text-gray-900">
                    Email *
                  </FieldLabel>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-2 h-12 rounded-xl border-gray-300"
                  />
                </Field>

                <Field className="md:col-span-2">
                  <FieldLabel className="text-sm font-medium text-gray-900">
                    Describe your issue *
                  </FieldLabel>
                  <Textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    rows={8}
                    className="mt-2 rounded-2xl border-gray-300"
                  />
                </Field>

                <div className="md:col-span-2">
                  <Button
                    disabled={!isFormValid}
                    className="h-12 w-full rounded-xl bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={() => {
                      toast.success("Message sent. We'll reply shortly.", {
                        position: "top-center",
                        style: {
                          background: "#16a34a",
                          color: "#fff",
                          border: "1px solid #15803d",
                          borderRadius: "12px",
                        },
                      });
                      setFullName("");
                      setEmail("");
                      setMessage("");
                    }}
                  >
                    Send Message
                  </Button>
                </div>
              </FieldGroup>
            </FieldSet>
          </div>

          {/* Right - Contact details */}
          <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <h3 className="text-xl font-bold text-gray-900">Contact details</h3>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Prefer direct contact? Use the details below and we will reply
              quickly.
            </p>

            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4 rounded-2xl bg-gray-50 p-4">
                <span className="mt-1 rounded-full bg-white p-2 text-slate-700 shadow-sm">
                  <MailIcon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Email</p>
                  <a
                    href="mailto:support@example.com"
                    className="mt-1 block text-sm text-gray-600 hover:underline"
                  >
                    support@example.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4 rounded-2xl bg-gray-50 p-4">
                <span className="mt-1 rounded-full bg-white p-2 text-slate-700 shadow-sm">
                  <PhoneIcon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Phone</p>
                  <a
                    href="tel:+901234567890"
                    className="mt-1 block text-sm text-gray-600 hover:underline"
                  >
                    +90 123 456 78 90
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4 rounded-2xl bg-gray-50 p-4">
                <span className="mt-1 rounded-full bg-white p-2 text-slate-700 shadow-sm">
                  <LocateIcon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Office</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    123 Example Street, Heris Tower, Izmir, Turkey
                  </p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
