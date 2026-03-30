"use client";
import { productEyeWear, productMonitor } from "@/app/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import MonitorList from "./MonitorList";

type SortOption = "low" | "high" | "rating" | "relevance";

const MonitorPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [selectedPanelType, setPanelType] = useState<string | null>(null);
  const [selectedSuitableFor, setselectedSuitableFor] = useState<string | null>(
    null,
  );

  const isFilterActive = selectedPanelType || selectedSuitableFor;

  const filteredAndSortedProducts = useMemo(() => {
    let updatedProducts = [...productMonitor];

    if (selectedPanelType) {
      updatedProducts = updatedProducts.filter(
        (product) => product.PanelType === selectedPanelType,
      );
    }
    if (selectedSuitableFor) {
      updatedProducts = updatedProducts.filter(
        (product) => product.SuitableFor === selectedSuitableFor,
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
  }, [sortBy, selectedPanelType, selectedSuitableFor]);

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
              <span className="font-medium text-gray-900">Monitors</span>
            </div>

            {/* Header + Sort */}

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center">
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Monitors
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Experience crystal-clear visuals with monitors designed for
                  gaming, productivity, and creative work.
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
                    variant={
                      selectedPanelType === "IPS Panel" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setPanelType(
                        selectedPanelType === "IPS Panel" ? null : "IPS Panel",
                      )
                    }
                  >
                    IPS Panel
                  </Button>

                  <Button
                    variant={
                      selectedPanelType === "Led" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setPanelType(selectedPanelType === "Led" ? null : "Led")
                    }
                  >
                    Led
                  </Button>

                  <Button
                    variant={
                      selectedSuitableFor === "Gaming" ? "default" : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setselectedSuitableFor(
                        selectedSuitableFor === "Gaming" ? null : "Gaming",
                      )
                    }
                  >
                    Gaming
                  </Button>
                  <Button
                    variant={
                      selectedSuitableFor === "Home and Office"
                        ? "default"
                        : "outline"
                    }
                    className="rounded-full"
                    onClick={() =>
                      setselectedSuitableFor(
                        selectedSuitableFor === "Home and Office"
                          ? null
                          : "Home and Office",
                      )
                    }
                  >
                    Home and Office
                  </Button>
                </div>

                {isFilterActive && (
                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => {
                      setPanelType(null);
                      setselectedSuitableFor(null);
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
                <MonitorList key={product.id} productMonitor={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;
