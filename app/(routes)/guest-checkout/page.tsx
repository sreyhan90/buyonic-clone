"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useCart } from "../cart/cart-context";

export default function GuestCheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");

    if (storedItems) {
      const items = JSON.parse(storedItems);

      const total = items.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0,
      );

      setTotalPrice(total);
    }
  }, []);

  const shipping = 20;
  const tax = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + shipping + tax;
  const router = useRouter();
  const { clearCart } = useCart();
  const validatePayment = () => {
    const newErrors = {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    };

    // Name
    if (!form.cardName.trim()) {
      newErrors.cardName = "Name on card is required.";
    }

    // Card number (remove spaces)
    const cleanNumber = form.cardNumber.replace(/\s/g, "");

    if (!cleanNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(cleanNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Expiry (MM/YY)
    if (!form.expiry) {
      newErrors.expiry = "Expiry date is required.";
    } else {
      const [month, year] = form.expiry.split("/");

      if (!month || !year) {
        newErrors.expiry = "Invalid format (MM/YY)";
      } else {
        const expMonth = parseInt(month);
        const expYear = parseInt("20" + year);

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (
          expMonth < 1 ||
          expMonth > 12 ||
          expYear < currentYear ||
          (expYear === currentYear && expMonth < currentMonth)
        ) {
          newErrors.expiry = "Card is expired.";
        }
      }
    }

    // CVV
    if (!form.cvv) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3}$/.test(form.cvv)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isPaymentValid = validatePayment();
    if (!isPaymentValid) return;

    const isFormValid = Object.values(form).every(
      (value) => value.trim() !== "",
    );

    if (!isFormValid) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      clearCart();
      router.push("/order-success");
    }, 800);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Guest Checkout
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Complete your order without creating an account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-3 lg:items-start"
        >
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Shipping Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter your personal and delivery details.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+90 5xx xxx xx xx"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Street, building, apartment..."
                  value={form.address}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Izmir"
                  value={form.city}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="35000"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Türkiye"
                  value={form.country}
                  onChange={handleChange}
                  className="h-11 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Payment Details
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter your card information securely.
              </p>
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
                    errors.cardName ? "border-red-500" : ""
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
                    errors.cardNumber ? "border-red-500" : ""
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
                      errors.expiry ? "border-red-500" : ""
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
                      errors.cvv ? "border-red-500" : ""
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
                  Order Summary
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

                  <div className="flex items-center justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${grandTotal}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-xl bg-black text-white hover:bg-black/90"
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>

              <p className="text-center text-xs text-gray-400">
                Your payment information is encrypted and secure.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
