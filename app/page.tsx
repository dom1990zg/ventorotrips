"use client";

import PoweredBy from "./components/PoweredBy";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sailboat, ArrowRight, Briefcase } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleExplore = () => {
    setLoading(true);
    setTimeout(() => router.push("/trips"), 1100);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden text-white">
      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-[position:70%_50%] transition-all duration-[1100ms] ease-out ${
          loading ? "scale-110 blur-md brightness-90" : "scale-100"
        }`}
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

      {/* Top navigation */}
      <div className="relative z-10 flex items-center justify-between px-10 py-8">
        <div className="text-sm tracking-[0.3em] uppercase font-semibold">
          VENTORO
        </div>

        <div className="hidden md:flex gap-8 text-sm text-white/80">
          <span className="hover:text-white cursor-pointer transition">Trips</span>
          <span className="hover:text-white cursor-pointer transition">
            For Providers
          </span>
          <span className="hover:text-white cursor-pointer transition">
            Support
          </span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-[calc(100%-96px)] items-center px-10">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.35em] uppercase text-white/70">
            Poreč • Istria • Croatia
          </p>

          <h1 className="mt-6 text-6xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
            Discover Poreč from <br className="hidden md:block" />
            the Sea
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-lg">
            Private boat tours, sunset cruises and curated coastal experiences
            along the Istrian Riviera.
          </p>

          {/* Premium CTA Row */}
          <div className="mt-10 flex flex-wrap items-center gap-6">

            {/* Explore CTA */}
            <button
              onClick={handleExplore}
              className="group relative flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 backdrop-blur-md transition hover:bg-white/10 active:scale-[0.99]"
              aria-label="Explore trips"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100">
                <span className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
              </span>

              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20">
                <Sailboat className="h-5 w-5 text-white/90 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>

              <span className="relative">
                <span className="block text-sm font-semibold">
                  Explore trips
                </span>
                <span className="block text-xs text-white/65">
                  Start your sunset journey
                </span>
              </span>

              <ArrowRight className="relative ml-2 h-4 w-4 text-white/75 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            {/* Partner CTA */}
            <button
              onClick={() => alert("Partner page coming soon")}
              className="group relative flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 backdrop-blur-md transition hover:bg-white/10 active:scale-[0.99]"
              aria-label="Become a partner"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100">
                <span className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
              </span>

              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20">
                <Briefcase className="h-5 w-5 text-white/90 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>

              <span className="relative">
                <span className="block text-sm font-semibold">
                  Become a partner
                </span>
                <span className="block text-xs text-white/65">
                  List your experience with us
                </span>
              </span>
            </button>

          </div>
        </div>
      </div>
      {/* Powered by (footer) */}
<div className="absolute bottom-6 left-10 z-10">
  <PoweredBy />
</div>
    </main>
  );
}