"use client";

import IphoneList from "./iphoneList";
import { productIphone } from "@/app/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

type SortOption = "low" | "high" | "rating" | "relevance";

const Iphone = () => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const isFilterActive = selectedStorage || selectedColor;

  const filteredAndSortedProducts = useMemo(() => {
    let updatedProducts = [...productIphone];

    if (selectedStorage) {
      updatedProducts = updatedProducts.filter(
        (product) => product.storage === selectedStorage,
      );
    }
    if (selectedColor) {
      updatedProducts = updatedProducts.filter(
        (product) => product.color === selectedColor,
      );
    }

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
  }, [sortBy, selectedStorage, selectedColor]);

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
              <span className="font-medium text-gray-900">iPhone</span>
            </div>

            {/* Header + Sort */}
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Apple iPhones
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Explore the latest models, colors, and storage options.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
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

            {/* Filters */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={
                      selectedStorage === "128 GB" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setSelectedStorage(
                        selectedStorage === "128 GB" ? null : "128 GB",
                      )
                    }
                  >
                    128 GB
                  </Button>

                  <Button
                    variant={
                      selectedStorage === "256 GB" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setSelectedStorage(
                        selectedStorage === "256 GB" ? null : "256 GB",
                      )
                    }
                  >
                    256 GB
                  </Button>

                  <Button
                    variant={selectedColor === "Black" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() =>
                      setSelectedColor(
                        selectedColor === "Black" ? null : "Black",
                      )
                    }
                  >
                    Black
                  </Button>

                  <Button
                    variant={selectedColor === "Blue" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() =>
                      setSelectedColor(selectedColor === "Blue" ? null : "Blue")
                    }
                  >
                    Blue
                  </Button>
                </div>

                {isFilterActive && (
                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => {
                      setSelectedStorage(null);
                      setSelectedColor(null);
                    }}
                  >
                    Reset ✕
                  </Button>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedProducts.map((product) => (
                <IphoneList key={product.id} productIphone={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iphone;
