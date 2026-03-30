import Link from "next/link";
import React from "react";

const SportswearPage = () => {
  return (
    <div className="relative mt-4">
      <video
        autoPlay
        muted
        loop
        className="w-full h-112.5 md:h-130 object-cover"
        src="https://assets.gymshark.com/wl6q2in9o7k3/7ARSYAfc8fPDpjqi8Vuwvi/daf83119a76774ff70d25439e9a50d3f/NOVEMBER_HERO_UNIVERSE_SEASONAL_MALE_1_8x3.mp4"
      />

      <div className="absolute inset-0 bg-black/45" />

      {/* glass box */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          className="relative backdrop-blur-xl bg-white/10 border border-white/25
                    rounded-2xl px-6 py-5 md:px-10 md:py-7 text-center text-white
                    shadow-xl animate-fade-in-up"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl
                      bg-white/20 blur-2xl opacity-60 animate-fade-in-soft"
          ></div>

          <p className="text-xs md:text-sm font-medium tracking-[0.15em] uppercase opacity-90">
            Train Hard. Stay Comfortable.
          </p>

          <p className="text-2xl md:text-4xl font-bold mt-2">
            Shop Sportswear Collection
          </p>

          <Link
            href="/sportswear"
            className="mt-4 inline-flex items-center justify-center rounded-full
              border border-white/40 bg-white/90 px-5 py-2 text-sm font-semibold
              text-black transition-all hover:border-black hover:bg-black hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SportswearPage;
