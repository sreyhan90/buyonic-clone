"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CartPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border p-10 text-center">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Add some products before continuing.
          </p>
          <Link href="/" className="mt-6 inline-block">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shipping = 20;
  const tax = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + shipping + tax;

  const handleCompleteOrder = () => {
    if (isLoggedIn) {
      router.push("/checkout");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review your products and complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* LEFT - PRODUCTS */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border bg-white p-5">
            <h2 className="mb-5 text-xl font-semibold">Cart Items</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-gray-50 sm:h-28 sm:w-28 sm:aspect-auto">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain object-center p-1"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Unit price: ${item.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </Button>

                        <span className="min-w-6 text-center font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </Button>
                      </div>

                      <p className="text-base font-bold">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT - SUMMARY / PAYMENT */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>

            <div className="my-6 h-px bg-border" />

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax}</span>
              </div>

              <div className="flex items-center justify-between border-t pt-3 text-base font-bold">
                <span>Total</span>
                <span>${grandTotal}</span>
              </div>
            </div>

            {isLoggedIn ? (
              <Button
                type="button"
                onClick={handleCompleteOrder}
                className="mt-6 h-11 w-full rounded-xl bg-black text-white hover:bg-black/90"
              >
                Complete Order
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-6 h-11 w-full rounded-xl bg-black text-white hover:bg-black/90">
                    Complete Order
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md rounded-2xl border-0 p-0 overflow-hidden">
                  <div className="p-6">
                    <DialogHeader className="items-center text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-8 w-8 text-orange-500"
                        >
                          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" x2="12" y1="9" y2="13" />
                          <line x1="12" x2="12.01" y1="17" y2="17" />
                        </svg>
                      </div>

                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        Continue your order
                      </DialogTitle>

                      <DialogDescription className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                        You can continue as a guest or sign in to your Buyonic
                        account for a faster checkout experience and easier
                        order tracking.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-6 grid gap-3">
                      <a href="/guest-checkout" className="w-full">
                        <Button
                          variant="outline"
                          className="h-11 w-full rounded-xl border-gray-300 text-gray-800 hover:bg-gray-100"
                        >
                          Continue as Guest
                        </Button>
                      </a>

                      <a href="/login?redirect=/cart" className="w-full">
                        <Button
                          type="button"
                          className="h-11 w-full rounded-xl bg-black text-white hover:bg-black/90"
                        >
                          Login / Register
                        </Button>
                      </a>
                    </div>

                    <p className="mt-4 text-center text-xs text-gray-400">
                      Secure checkout powered by Buyonic
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Secure checkout powered by Buyonic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
