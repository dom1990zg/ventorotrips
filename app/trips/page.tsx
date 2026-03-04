"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Clock, MapPin, Star, ArrowLeft } from "lucide-react";

type Trip = {
  slug: string;
  title: string;
  location: string;
  duration: string;
  priceFrom: number;
  rating: number;
  reviews: number;
  tag: string;
};

export default function TripsPage() {
  const trips: Trip[] = useMemo(
    () => [
      {
        slug: "sunset-cruise-porec",
        title: "Sunset Cruise (Poreč Riviera)",
        location: "Poreč • Istria",
        duration: "2h",
        priceFrom: 59,
        rating: 4.9,
        reviews: 214,
        tag: "Best seller",
      },
      {
        slug: "private-boat-lim-fjord",
        title: "Private Boat to Lim Fjord",
        location: "Lim Fjord • Istria",
        duration: "4h",
        priceFrom: 189,
        rating: 4.8,
        reviews: 98,
        tag: "Private",
      },
      {
        slug: "dolphin-watching",
        title: "Dolphin Watching (Golden Hour)",
        location: "West Coast • Istria",
        duration: "2.5h",
        priceFrom: 75,
        rating: 4.7,
        reviews: 161,
        tag: "Wildlife",
      },
      {
        slug: "kayak-old-town",
        title: "Sea Kayak: Old Town & Caves",
        location: "Poreč",
        duration: "3h",
        priceFrom: 49,
        rating: 4.6,
        reviews: 122,
        tag: "Active",
      },
      {
        slug: "rovinj-day-cruise",
        title: "Day Cruise to Rovinj",
        location: "Poreč → Rovinj",
        duration: "6h",
        priceFrom: 79,
        rating: 4.8,
        reviews: 203,
        tag: "Day trip",
      },
      {
        slug: "luxury-yacht-experience",
        title: "Luxury Yacht Experience",
        location: "Poreč Marina",
        duration: "3h",
        priceFrom: 299,
        rating: 5.0,
        reviews: 44,
        tag: "Luxury",
      },
    ],
    []
  );

  const [q, setQ] = useState("");

  const filtered = trips.filter((t) =>
    (t.title + " " + t.location + " " + t.tag)
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/trips.jpg"
          alt="Sea background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </div>

      {/* BACK BUTTON */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-black/60 hover:border-white/40"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back
        </Link>
      </div>

      {/* HEADER */}
      <header className="relative z-10 px-10 pt-28 pb-10">
        <div className="mt-14 max-w-3xl">
          <p className="text-xs tracking-[0.35em] uppercase text-white/60">
            Curated Experiences
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Premium Trips in Istria
          </h1>

          <p className="mt-4 text-white/70 max-w-2xl">
            Handpicked boat tours, sunset cruises and coastal adventures.
          </p>

          <div className="mt-8">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search trips (sunset, private, kayak)…"
              className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm outline-none backdrop-blur-md placeholder:text-white/50 focus:border-white/40"
            />
          </div>
        </div>
      </header>

      {/* TRIPS GRID */}
      <section className="relative z-10 px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              href={`/trips/${t.slug}`}
              className="group rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-lg transition hover:bg-white/15 hover:border-white/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                  {t.tag}
                </span>

                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">{t.rating.toFixed(1)}</span>
                  <span className="text-white/50">({t.reviews})</span>
                </div>
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {t.title}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t.duration}
                </span>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div className="text-white/70 text-sm">
                  from{" "}
                  <span className="text-white text-2xl font-semibold">
                    €{t.priceFrom}
                  </span>
                </div>

                <span className="text-sm text-white/80 transition group-hover:text-white">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}