"use client";
import BestDealsList from "./BestDealsList";
import { product } from "@/app/constants";
import { useEffect, useState } from "react";

const BestDealsPage = () => {
  const productNames = product.map((p) => p.name);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productNames.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [productNames.length]);

  return (
    <section id="best-deals">
      <h1 className="mx-4 mt-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:mx-9 sm:text-3xl">
        Best deals on{" "}
        <span className="relative inline-block h-[1.2em] min-w-[140px] overflow-hidden align-bottom text-gray-900 sm:min-w-[220px]">
          <span
            key={currentIndex}
            className="absolute left-0 top-0 whitespace-nowrap animate-fade"
          >
            {productNames[currentIndex]}
          </span>
        </span>
      </h1>

      {/* MOBILE SCROLL / DESKTOP GRID */}
      <div className="flex gap-4 overflow-x-auto px-3 pb-3 scroll-smooth snap-x lg:grid lg:grid-cols-5 lg:gap-6 lg:p-3">
        {product.map((product) => (
          <div key={product.id} className="w-[48%] shrink-0 lg:w-auto">
            <BestDealsList product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestDealsPage;
