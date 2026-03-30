"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  UserIcon,
  Search,
  MessageSquare,
  TicketPercent,
  UserCircle2,
  Sparkles,
  Bot,
  Wallet,
  Star,
  Package,
  LogOut,
} from "lucide-react";
import { placeholders } from "../constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import CartMenu from "./cart/cart";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { routes } from "../constants/index";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type User = {
  username: string;
  fullName?: string;
};

const Header = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const handleSearch = () => {
    const searchValue = query.toLowerCase().trim();

    if (!searchValue) {
      router.push("/");
      return;
    }

    const words = searchValue.split(" ");

    const matchedKey = Object.keys(routes).find((key) =>
      words.some((word) => word.includes(key)),
    );

    if (matchedKey) {
      router.push(routes[matchedKey as keyof typeof routes]);
    } else {
      router.push("/not-found");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);
    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
      window.removeEventListener("auth-change", syncUser);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-fit">
          <div className="flex items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <Link href="/">
              <Image
                alt="logo"
                src="/Image/shopify.jpeg"
                width={50}
                height={35}
                className="h-10 w-auto object-cover"
              />
            </Link>
          </div>
          <Link href="/">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Buyonic
            </h2>
          </Link>
        </div>

        {/* Center */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-xl ">
            <Input
              placeholder=""
              className="h-11 rounded-full border-gray-300 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-orange-400 "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            {!query && (
              <div className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 h-5 w-220 overflow-hidden z-10">
                <div className="relative h-full w-full">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute left-0 top-0 whitespace-nowrap text-md text-black"
                    >
                      {placeholders[index]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            )}
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 min-w-fit">
          <Link href="/contact">
            <Button
              variant="outline"
              className="hidden md:inline-flex rounded-full border-gray-300 px-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Contact
            </Button>
          </Link>

          <CartMenu />
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full bg-gray-900 px-5 text-white hover:text-orange-300"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  {user.username}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-xl"
              >
                {/* Top Banner */}
                <div className="bg-linear-to-r from-orange-500 via-pink-500 to-red-500 px-4 py-4 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-90">
                    Buyonic Account
                  </p>
                  <h3 className="mt-1 text-lg font-bold">
                    {user.fullName || user.username}
                  </h3>
                  <p className="text-sm text-white/90">
                    Welcome back to Buyonic
                  </p>
                </div>

                {/* Menu */}
                <div className="p-2">
                  <div className="space-y-1">
                    <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span>My Orders</span>
                    </div>

                    <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
                      <Star className="h-4 w-4 text-gray-500" />
                      <span>My Reviews</span>
                    </div>

                    <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
                      <Wallet className="h-4 w-4 text-gray-500" />
                      <span>Credits</span>
                      <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-medium text-orange-700">
                        Special Offer
                      </span>
                    </div>

                    <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span>Seller Messages</span>
                    </div>

                    <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
                      <TicketPercent className="h-4 w-4 text-gray-500" />
                      <span>Discount Coupons</span>
                    </div>

                    <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
                      <UserCircle2 className="h-4 w-4 text-gray-500" />
                      <span>Account Details</span>
                    </div>

                    <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
                      <Sparkles className="h-4 w-4 text-gray-500" />
                      <span>Buyonic Plus</span>
                      <span className="ml-auto rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        NEW
                      </span>
                    </div>

                    <div className="flex cursor-default items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100">
                      <Bot className="h-4 w-4 text-gray-500" />
                      <span>Buyonic Assistant</span>
                    </div>
                  </div>

                  <div className="my-2 border-t border-gray-200" />

                  {/* Active Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login">
              <Button className="rounded-full bg-gray-900 px-5 text-white hover:text-orange-300">
                <UserIcon className="mr-2 h-4 w-4" />
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
