"use client";
import { productLaptop } from "@/app/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import GamingLaptopList from "./GamingLaptopList";

type SortOption = "low" | "high" | "rating" | "relevance";

const Laptop = () => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedProcessor, setSelectedProcessor] = useState<string | null>(
    null,
  );
  const isFilterActive = selectedCompany || selectedProcessor || selectedSize;

  const filteredAndSortedProducts = useMemo(() => {
    let updatedProducts = [...productLaptop];

    if (selectedCompany) {
      updatedProducts = updatedProducts.filter(
        (product) => product.company === selectedCompany,
      );
    }
    if (selectedProcessor) {
      updatedProducts = updatedProducts.filter(
        (product) => product.processor === selectedProcessor,
      );
    }
    if (selectedSize) {
      updatedProducts = updatedProducts.filter(
        (product) => product.size === selectedSize,
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
  }, [sortBy, selectedCompany, selectedProcessor, selectedSize]);

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
              <span className="font-medium text-gray-900">Gaming Laptop</span>
            </div>

            {/* Header + Sort */}

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center">
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Gaming Laptops
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Discover powerful GPUs, fast processors, and immersive
                  displays built for ultimate gaming performance.
                </p>
              </div>

              <div className="flex-[2] flex flex-wrap gap-3 lg:justify-end">
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
                    variant={selectedCompany === "HP" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() =>
                      setSelectedCompany(selectedCompany === "HP" ? null : "HP")
                    }
                  >
                    HP
                  </Button>

                  <Button
                    variant={selectedCompany === "Acer" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() =>
                      setSelectedCompany(
                        selectedCompany === "Acer" ? null : "Acer",
                      )
                    }
                  >
                    Acer
                  </Button>

                  <Button
                    variant={
                      selectedProcessor === "AMD Ryzen" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setSelectedProcessor(
                        selectedProcessor === "AMD Ryzen" ? null : "AMD Ryzen",
                      )
                    }
                  >
                    AMD Ryzen
                  </Button>

                  <Button
                    variant={
                      selectedProcessor === "Intel" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setSelectedProcessor(
                        selectedProcessor === "Intel" ? null : "Intel",
                      )
                    }
                  >
                    Intel
                  </Button>
                  <Button
                    variant={
                      selectedSize === "15.6inch" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setSelectedSize(
                        selectedSize === "15.6inch" ? null : "15.6inch",
                      )
                    }
                  >
                    15.6inch
                  </Button>
                </div>

                {isFilterActive && (
                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => {
                      setSelectedCompany(null);
                      setSelectedProcessor(null);
                      setSelectedSize(null);
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
                <GamingLaptopList key={product.id} productLaptop={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laptop;
