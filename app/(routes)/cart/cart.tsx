"use client";

import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon, Trash2 } from "lucide-react";
import { useCart } from "./cart-context";
import Link from "next/link";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

const CartMenu = () => {
  const {
    cartItems,
    totalItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingBagIcon className="cursor-pointer hover:scale-110 transition" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-xl border p-3">
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain object-center p-0.5"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${item.price}
                        </p>
                      </div>

                      <button onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </Button>

                        <span className="min-w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </Button>
                      </div>

                      <p className="text-sm font-semibold">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-bold">${totalPrice}</span>
            </div>
            <SheetFooter className="mt-10">
              <SheetClose asChild>
                <Link href="/cart">
                  <Button className="h-11 w-full rounded-x">
                    Proceed to Checkout
                  </Button>
                </Link>
              </SheetClose>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartMenu;
