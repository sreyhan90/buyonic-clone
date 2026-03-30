"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Order Confirmed
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Thank you for shopping with Buyonic. Your order has been received
          successfully.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          You will be redirected to the homepage in 3 seconds.
        </p>
      </div>
    </section>
  );
}
