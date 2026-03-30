import React from "react";
import { bestDealsType } from "@/app/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface BestDealsProps {
  product: bestDealsType;
}

const BestDealsList = ({ product }: BestDealsProps) => {
  return (
    <Card className="group w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-lg sm:p-4">
      <div className="flex h-36 items-center justify-center rounded-xl bg-gray-50 p-3 sm:h-48">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardHeader className="px-2 pb-2 pt-3 text-center">
        <CardTitle className="line-clamp-2 text-base font-bold text-gray-900 sm:text-lg">
          {product.name}
        </CardTitle>
      </CardHeader>

      <div className="flex items-center justify-center gap-2 pb-3">
        <span className="text-lg font-extrabold text-blue-600 sm:text-xl">
          {product.price}$
        </span>
        <span className="text-xs text-gray-400 line-through sm:text-sm">
          {product.oldPrice}$
        </span>
      </div>

      <CardFooter className="px-2 pt-0">
        <Link href={`/${product.slug}`} className="w-full">
          <Button className="h-10 w-full rounded-full bg-black text-sm text-white transition hover:bg-blue-600">
            View Product
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BestDealsList;
