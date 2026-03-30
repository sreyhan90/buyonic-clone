"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 text-black">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {/* ICON */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 animate-bounce">
          <ShoppingCart className="h-10 w-10 text-gray-600" />
        </div>

        {/* TAG */}
        <span className="mb-3 rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-600">
          404 • Buyonic Error
        </span>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          This page is out of stock.
        </h1>

        {/* DESC */}
        <p className="mt-4 max-w-md text-gray-500">
          The page you're looking for doesn’t exist or is currently hiding from
          responsibility.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/">
            <Button className="rounded-full bg-black px-6 text-white hover:bg-gray-800">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* FUNNY TEXT */}
        <p className="mt-6 text-sm text-gray-400">
          Error 404: Page not found, but vibes still good.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
