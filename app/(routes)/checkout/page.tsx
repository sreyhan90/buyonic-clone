"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useCart } from "../cart/cart-context";
import { ShieldCheck, CreditCard } from "lucide-react";

const CheckoutPage = () => {
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const { clearCart, cartItems } = useCart();

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validatePayment = () => {
    const newErrors = {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    };

    if (!form.cardName.trim()) {
      newErrors.cardName = "Name on card is required.";
    }

    const cleanNumber = form.cardNumber.replace(/\s/g, "");

    if (!cleanNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(cleanNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    if (!form.expiry.trim()) {
      newErrors.expiry = "Expiry date is required.";
    } else {
      const [month, year] = form.expiry.split("/");

      if (!month || !year || month.length !== 2 || year.length !== 2) {
        newErrors.expiry = "Invalid format (MM/YY).";
      } else {
        const expMonth = parseInt(month, 10);
        const expYear = parseInt(`20${year}`, 10);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (
          Number.isNaN(expMonth) ||
          Number.isNaN(expYear) ||
          expMonth < 1 ||
          expMonth > 12 ||
          expYear < currentYear ||
          (expYear === currentYear && expMonth < currentMonth)
        ) {
          newErrors.expiry = "Card is expired.";
        }
      }
    }

    if (!form.cvv.trim()) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3}$/.test(form.cvv)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((value) => value === "");
  };

  const shipping = 20;
  const tax = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isPaymentValid = validatePayment();

    if (!isPaymentValid) return;

    clearCart();
    router.push("/order-success");
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Secure Checkout
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Complete your payment securely with Buyonic.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-linear-to-r from-black to-gray-800 p-8 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                  Buyonic
                </p>
                <h2 className="text-2xl font-bold">Trusted Payment</h2>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/80">
              Your checkout is protected with secure payment handling. Review
              your total and complete your order with confidence.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-white/70">Order Total</p>
              <p className="mt-2 text-4xl font-extrabold">${grandTotal}</p>

              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-gray-100 p-3">
                <CreditCard className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Payment Details
                </h2>
                <p className="text-sm text-gray-500">
                  Enter your card information securely.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="John Doe"
                  value={form.cardName}
                  onChange={handleChange}
                  className={`h-11 rounded-xl ${
                    errors.cardName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.cardName && (
                  <p className="text-xs text-red-500">{errors.cardName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className={`h-11 rounded-xl ${
                    errors.cardNumber
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.cardNumber && (
                  <p className="text-xs text-red-500">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleChange}
                    className={`h-11 rounded-xl ${
                      errors.expiry
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.expiry && (
                    <p className="text-xs text-red-500">{errors.expiry}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={form.cvv}
                    onChange={handleChange}
                    className={`h-11 rounded-xl ${
                      errors.cvv
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.cvv && (
                    <p className="text-xs text-red-500">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Summary
                </h3>

                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>

                  <div className="flex items-center justify-between border-t pt-3 font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${grandTotal}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-black text-white hover:bg-black/90"
              >
                Place Order
              </Button>

              <p className="text-center text-xs text-gray-400">
                Your payment information is encrypted and secure.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
