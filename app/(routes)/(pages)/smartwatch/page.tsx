"use client";
import { productSmartWatch } from "@/app/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import SmartWatchList from "./SmartWatchList";

type SortOption = "low" | "high" | "rating" | "relevance";

const smartWatch = () => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  const isFilterActive = selectedGender || selectedShape;

  const filteredAndSortedProducts = useMemo(() => {
    let updatedProducts = [...productSmartWatch];

    if (selectedGender) {
      updatedProducts = updatedProducts.filter(
        (product) => product.gender === selectedGender,
      );
    }
    if (selectedShape) {
      updatedProducts = updatedProducts.filter(
        (product) => product.shape === selectedShape,
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
  }, [sortBy, selectedGender, selectedShape]);

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
              <span className="font-medium text-gray-900">Smart Watch</span>
            </div>

            {/* Header + Sort */}
            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Smart Watch
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Stay connected, track your health, and manage your day with
                  stylish and intelligent wearable technology.
                </p>
              </div>

              <div className="flex-2 flex flex-wrap gap-3 lg:justify-end">
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
                    variant={selectedGender === "Male" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() =>
                      setSelectedGender(
                        selectedGender === "Male" ? null : "Male",
                      )
                    }
                  >
                    Male
                  </Button>

                  <Button
                    variant={
                      selectedGender === "Female" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setSelectedGender(
                        selectedGender === "Female" ? null : "Female",
                      )
                    }
                  >
                    Female
                  </Button>

                  <Button
                    variant={selectedShape === "Round" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() =>
                      setSelectedShape(
                        selectedShape === "Round" ? null : "Round",
                      )
                    }
                  >
                    Round
                  </Button>
                </div>

                {isFilterActive && (
                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => {
                      setSelectedGender(null);
                      setSelectedShape(null);
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
                <SmartWatchList key={product.id} productSmartWatch={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default smartWatch;
