"use client";
import { productEyeWear } from "@/app/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import EyeWearListpage from "./EyeWearListpage";

type SortOption = "low" | "high" | "rating" | "relevance";

const EyeWearPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const filteredAndSortedProducts = useMemo(() => {
    let updatedProducts = [...productEyeWear];

    if (sortBy === "low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      updatedProducts.sort((a, b) => b.rating - a.rating);
    }

    return updatedProducts;
  }, [sortBy]);

  return (
    <div>
      <div>
        <div className="min-h-screen bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600">
              <ArrowLeft className="h-4 w-4" />
              <Link
                href="/"
                className="underline-offset-4 transition hover:underline hover:text-black"
              >
                Back to Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-medium text-gray-900">Eyeglasses</span>
            </div>

            {/* Header + Sort */}
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Eyeglasses
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Explore stylish frames, modern designs, and all-day comfort
                  for every look.
                </p>
              </div>

              <div className="flex flex-2 flex-wrap gap-3 lg:justify-end">
                <Button
                  variant={sortBy === "relevance" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSortBy("relevance")}
                >
                  Relevance
                </Button>

                <Button
                  variant={sortBy === "high" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSortBy("high")}
                >
                  Price · High to Low
                </Button>

                <Button
                  variant={sortBy === "low" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSortBy("low")}
                >
                  Price · Low to High
                </Button>

                <Button
                  variant={sortBy === "rating" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setSortBy("rating")}
                >
                  Customer Rating
                </Button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedProducts.map((product) => (
                <EyeWearListpage key={product.id} productEyeWear={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeWearPage;
