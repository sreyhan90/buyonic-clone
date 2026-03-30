"use client";
import Image from "next/image";
import BestDealsPage from "../components/layout/BestDeals/bestDeals";
import EyeWear from "../components/layout/EyeWear/EyeWear";
import GiftPage from "../components/layout/Gift/gift";
import WinterPage from "../components/layout/Sportswear/SportswearPage";

export default function HomePage() {
  return (
    <div className="p-1">
      <section className="relative h-35 sm:h-105  md:h-140 overflow-hidden rounded-2xl">
        <Image
          src="/Image/bg0.gif"
          alt="hero banner"
          fill
          priority
          className="absolute inset-0 w-full h-full object-contain sm:object-cover"
        />

        <div className="absolute inset-0 bg-black/30 md:block hidden" />

        {/* TEXT - sadece desktop */}
        <div className="relative z-10 hidden h-full items-center px-6 md:flex md:px-12">
          <div className="max-w-2xl text-white">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
              New Collection
            </p>

            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
              Discover Your Style With Buyonic
            </h1>

            <p className="mb-8 max-w-xl text-base text-white/90 md:text-lg">
              Shop smart, modern, and comfortable pieces crafted for everyday
              life.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  document.getElementById("best-deals")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <BestDealsPage />
      <EyeWear />
      <GiftPage />
      <WinterPage />
    </div>
  );
}
