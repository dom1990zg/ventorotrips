"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, Clock, MapPin, Star, SlidersHorizontal } from "lucide-react";
import { TRIPS } from "@/app/data/trips";

const filterTags = ["All", "Sunset", "Private", "Active", "Day trip", "Luxury", "Wildlife"];

export default function TripsPage() {
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState<"recommended" | "price-asc" | "price-desc">("recommended");

  const filtered = useMemo(() => {
    const base = TRIPS.filter((t) => {
      const matchesSearch = (t.title + " " + t.location + " " + t.tag)
        .toLowerCase()
        .includes(q.toLowerCase());
      const matchesTag = activeTag === "All" ? true : t.tag === activeTag;
      return matchesSearch && matchesTag;
    });

    if (sortBy === "price-asc") return [...base].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sortBy === "price-desc") return [...base].sort((a, b) => b.priceFrom - a.priceFrom);
    return [...base].sort((a, b) => b.rating - a.rating);
  }, [q, activeTag, sortBy]);

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <Image src="/trips.jpg" alt="Sea background" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/90" />
      </div>

      <div className="absolute left-6 top-6 z-20 md:left-8 md:top-8">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/60"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back
        </Link>
      </div>

      <header className="relative z-10 px-6 pb-10 pt-24 md:px-10 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Curated Experiences</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Trips in Istria</h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Handpicked boat tours, sunset cruises and coastal adventures. Pick your style and find your
            ideal experience.
          </p>

          <div className="mt-7 grid gap-3 lg:grid-cols-[1fr_auto]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search trips (sunset, private, kayak)…"
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm outline-none backdrop-blur-md placeholder:text-white/50 focus:border-white/40"
            />
            <label className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm backdrop-blur-md">
              <SlidersHorizontal className="h-4 w-4 text-white/70" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recommended" | "price-asc" | "price-desc")}
                className="bg-transparent text-sm text-white outline-none"
              >
                <option value="recommended" className="text-black">Sort: Recommended</option>
                <option value="price-asc" className="text-black">Price: Low to high</option>
                <option value="price-desc" className="text-black">Price: High to low</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3.5 py-1.5 text-xs tracking-wide transition ${
                  activeTag === tag
                    ? "border-[#d9b382]/60 bg-[#d9b382]/20 text-[#f8e7cd]"
                    : "border-white/20 bg-white/10 text-white/75 hover:border-white/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-white/65">Showing {filtered.length} experiences</p>
        </div>
      </header>

      <section className="relative z-10 px-6 pb-20 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              href={`/trips/${t.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-lg transition hover:border-white/30 hover:bg-white/15"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={t.images[0]}
                  alt={t.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                  {t.tag}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-end text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span className="font-semibold">{t.rating.toFixed(1)}</span>
                    <span className="text-white/50">({t.reviews})</span>
                  </div>
                </div>

                <h3 className="mt-3 text-xl font-semibold tracking-tight">{t.title}</h3>

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
                  <div className="text-sm text-white/70">
                    from <span className="text-2xl font-semibold text-white">€{t.priceFrom}</span>
                  </div>

                  <span className="text-sm text-white/80 transition group-hover:text-white">View details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mx-auto mt-8 max-w-6xl rounded-2xl border border-white/15 bg-white/8 p-6 text-sm text-white/70 backdrop-blur-md">
            No trips match your filters yet. Try another keyword or switch to <strong>All</strong>.
          </div>
        ) : null}
      </section>
    </main>
  );
}