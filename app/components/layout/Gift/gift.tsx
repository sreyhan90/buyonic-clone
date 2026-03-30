import React from "react";
import GiftList from "./GiftList";
import { productGift } from "@/app/constants";

const GiftPage = () => {
  return (
    <div className="px-6">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="mb-2 mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
          Gifting head start, this way
        </h1>
        <div className="flex gap-4 overflow-x-auto pb-3 scroll-smooth lg:overflow-visible lg:grid lg:grid-cols-4 lg:gap-8">
          {productGift.map((product) => (
            <div
              key={product.id}
              className="min-w-[48%] flex-shrink-0 lg:min-w-0"
            >
              <GiftList productGift={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftPage;
