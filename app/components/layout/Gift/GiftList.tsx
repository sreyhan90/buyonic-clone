import { giftingType } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/app/(routes)/cart/cart-context";
import { toast } from "sonner";

interface giftingTypeProps {
  productGift: giftingType;
}

const GiftList = ({ productGift }: giftingTypeProps) => {
  const { addToCart } = useCart();
  return (
    <Card className="group relative w-72 overflow-hidden rounded-2xl border-0 bg-transparent shadow-none">
      {/* IMAGE */}
      <div className="relative flex h-90 items-center justify-center overflow-hidden bg-gray-50 rounded-2xl">
        <img
          src={productGift.img1}
          alt={productGift.name}
          className="absolute h-full w-full object-contain p-2 transition-all duration-500 group-hover:opacity-0"
        />

        <img
          src={productGift.img2}
          alt={productGift.name}
          className="absolute h-full w-full object-contain p-2 opacity-0 transition-all duration-500 group-hover:opacity-100"
        />

        {/* BUTTON (foto üstünde) */}
        <div className="absolute bottom-4 left-1/2 w-[80%] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Button
            className="w-full rounded-full bg-black/70 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black"
            variant="default"
            onClick={() => {
              addToCart({
                id: productGift.id,
                title: productGift.name,
                price: productGift.price,
                image: productGift.img1,
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
            Add to bag
          </Button>
        </div>
      </div>

      {/* TEXT */}
      <div className="mt-1 text-start mx-2">
        <h2 className="text-base font-semibold text-gray-900">
          {productGift.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">${productGift.price}</p>
      </div>
    </Card>
  );
};

export default GiftList;
