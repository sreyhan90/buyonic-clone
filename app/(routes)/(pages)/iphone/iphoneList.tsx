"use client";
import { iphoneType } from "@/app/constants";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { useCart } from "@/app/(routes)/cart/cart-context";
import { toast } from "sonner";


interface iphoneProps {
  productIphone: iphoneType;
}

const IphoneList = ({ productIphone }: iphoneProps) => {
  const { addToCart } = useCart();
  const discount = Math.round(
    ((productIphone.mrp - productIphone.price) / productIphone.mrp) * 100,
  );
  return (
    <div>
      <div className="p-4">
        <Card className="group mx-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          {/* IMAGE */}
          <div className="relative flex h-56 items-center justify-center rounded-xl bg-gray-50 p-4">
            {/* DISCOUNT BADGE */}
            <div className="absolute left-2 top-2 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">
              {discount}% OFF
            </div>

            <img
              src={productIphone.image}
              alt={productIphone.title}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* TITLE */}
          <CardHeader className="px-0 pb-2 pt-4 text-left">
            <CardTitle className="line-clamp-2 text-lg font-bold leading-snug text-gray-900">
              {productIphone.title}
            </CardTitle>
          </CardHeader>

          {/* RATING */}
          <div className="mb-3 flex items-center gap-2 text-left">
            <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
              <span>{productIphone.rating}</span>
              <StarIcon className="h-4 w-4 fill-green-600 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">
              ({productIphone.ratingCount})
            </span>
          </div>

          {/* PRICE */}
          <div className="mb-3 flex items-center gap-3 text-left">
            <span className="text-2xl font-extrabold text-gray-900">
              ${productIphone.price}
            </span>
            <span className="text-sm font-medium text-gray-400 line-through">
              ${productIphone.mrp}
            </span>
          </div>

          {/* INFO */}
          <div className="mb-4 flex flex-col gap-1 text-left">
            <span className="text-sm font-medium text-gray-500">
              Save extra with No Cost EMI
            </span>
            <span className="text-sm text-gray-400">
              FREE delivery Mon, 24 Nov
            </span>
          </div>

          {/* BUTTON */}
          <CardFooter className="px-0 pb-0 pt-2">
            <Button
              className="w-full rounded-full bg-black py-5 text-white transition hover:bg-blue-600"
              variant="default"
              onClick={() => {
                addToCart({
                  id: productIphone.id,
                  title: productIphone.title,
                  price: productIphone.price,
                  image: productIphone.image,
                });
                toast.success("Product added successfully.", {
                  position: "bottom-right",
                  style: {
                    background: "#16a34a",
                    color: "#fff",
                    border: "1px solid #15803d",
                    borderRadius: "12px",
                  },
                  icon: "🛒",
                });
              }}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default IphoneList;
