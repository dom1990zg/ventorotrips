"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, Clock, MapPin, Star, SlidersHorizontal, X, Search } from "lucide-react";
import { TRIPS } from "@/app/data/trips";

const filterTags = ["All", "Sunset", "Private", "Active", "Day trip", "Luxury", "Wildlife"];

export default function TripsPage() {
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState<"recommended" | "price-asc" | "price-desc">("recommended");
  const [maxPrice, setMaxPrice] = useState(300);
  const [availableToday, setAvailableToday] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const base = TRIPS.filter((t) => {
      const matchesSearch = (t.title + " " + t.location + " " + t.tag).toLowerCase().includes(q.toLowerCase());
      const matchesTag = activeTag === "All" ? true : t.tag === activeTag;
      const matchesPrice = t.priceFrom <= maxPrice;
      return matchesSearch && matchesTag && matchesPrice;
    });
    if (sortBy === "price-asc") return [...base].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sortBy === "price-desc") return [...base].sort((a, b) => b.priceFrom - a.priceFrom);
    return [...base].sort((a, b) => b.rating - a.rating);
  }, [q, activeTag, sortBy, maxPrice, availableToday]);

  const activeFilterCount = (activeTag !== "All" ? 1 : 0) + (maxPrice < 300 ? 1 : 0) + (availableToday ? 1 : 0);

  return (
    <main className="relative min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0a1628 0%, #07111a 40%, #0d1f12 100%)" }}>

      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden">
        {/* Background image with parallax feel */}
        <div className="absolute inset-0 -z-0">
          <Image src="/trips.jpg" alt="Istria" fill priority className="object-cover object-center scale-105" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#07111a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Back button */}
        <div className="relative z-10 px-6 pt-8 md:px-10">
          <Link href="/" className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-black/50">
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" /> Back
          </Link>
        </div>

        {/* Hero text */}
        <div className="relative z-10 px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#f0c97a]/80">Curated Experiences</p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">
              Explore<br />
              <span className="text-[#f0c97a]">Istria</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/70 md:text-lg">
              Handpicked boat tours, sunset cruises and coastal adventures — all bookable in minutes.
            </p>

            {/* ── SEARCH BAR ── */}
            <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search trips, locations, activities…"
                  className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-11 pr-5 text-sm outline-none backdrop-blur-md placeholder:text-white/40 focus:border-[#f0c97a]/50 focus:bg-white/15 transition"
                />
              </div>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`relative flex items-center justify-center gap-2 rounded-2xl border px-5 py-4 text-sm font-medium backdrop-blur-md transition ${showFilters ? "border-[#f0c97a]/60 bg-[#f0c97a]/20 text-[#f0c97a]" : "border-white/20 bg-white/10 text-white hover:bg-white/15"}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#f0c97a] text-[10px] font-bold text-black">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <label className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm backdrop-blur-md">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "recommended" | "price-asc" | "price-desc")}
                  className="bg-transparent text-sm text-white outline-none"
                >
                  <option value="recommended" className="text-black">Recommended</option>
                  <option value="price-asc" className="text-black">Price: Low → High</option>
                  <option value="price-desc" className="text-black">Price: High → Low</option>
                </select>
              </label>
            </div>

            {/* ── FILTER PANEL ── */}
            {showFilters && (
              <div className="mt-3 max-w-2xl rounded-2xl border border-white/15 bg-black/50 p-5 backdrop-blur-xl">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Max price per person</span>
                      <span className="font-semibold text-[#f0c97a]">€{maxPrice}{maxPrice === 300 ? "+" : ""}</span>
                    </div>
                    <input type="range" min={20} max={300} step={10} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-3 w-full accent-[#f0c97a]" />
                    <div className="mt-1 flex justify-between text-xs text-white/35"><span>€20</span><span>€300+</span></div>
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <button
                      onClick={() => setAvailableToday((v) => !v)}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${availableToday ? "border-[#f0c97a]/50 bg-[#f0c97a]/15 text-[#f0c97a]" : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"}`}
                    >
                      <div className={`relative h-4 w-8 rounded-full transition-colors ${availableToday ? "bg-[#f0c97a]" : "bg-white/20"}`}>
                        <div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${availableToday ? "translate-x-4" : "translate-x-0.5"}`} />
                      </div>
                      Available today
                    </button>
                    {activeFilterCount > 0 && (
                      <button onClick={() => { setActiveTag("All"); setMaxPrice(300); setAvailableToday(false); }} className="flex items-center gap-2 text-xs text-white/40 transition hover:text-white/70">
                        <X className="h-3 w-3" /> Reset filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── TAG PILLS ── */}
            <div className="mt-5 flex flex-wrap gap-2">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition ${activeTag === tag ? "border-[#f0c97a]/70 bg-[#f0c97a]/20 text-[#f0c97a]" : "border-white/15 bg-white/8 text-white/60 hover:border-white/30 hover:text-white/90"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-6xl">

          <p className="mb-6 text-sm text-white/40">
            {filtered.length} {filtered.length === 1 ? "experience" : "experiences"} found
          </p>

          {/* ── TRIP GRID ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((t, i) => (
              <Link
                key={t.slug}
                href={`/trips/${t.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:border-white/25 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1"
              >
                {/* Image — taller */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={t.images[0]}
                    alt={t.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-107"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Tag top-left */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
                    {t.tag}
                  </span>

                  {/* Rating top-right */}
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
                    <Star className="h-3 w-3 fill-[#f0c97a] text-[#f0c97a]" />
                    {t.rating.toFixed(1)}
                    <span className="font-normal text-white/50">({t.reviews})</span>
                  </span>

                  {/* Price overlaid on image bottom */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs text-white/60">from</span>
                    <p className="text-2xl font-bold leading-none text-white">€{t.priceFrom}</p>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">{t.title}</h3>
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{t.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{t.duration}</span>
                  </div>

                  {/* CTA row */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-white/40">{t.reviews} reviews</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-xs font-medium text-white transition group-hover:border-[#f0c97a]/50 group-hover:bg-[#f0c97a]/15 group-hover:text-[#f0c97a]">
                      View & Book →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <p className="text-4xl">🔍</p>
              <p className="mt-4 text-lg font-semibold">No trips found</p>
              <p className="mt-2 text-sm text-white/50">Try adjusting your filters or search term.</p>
              <button onClick={() => { setQ(""); setActiveTag("All"); setMaxPrice(300); setAvailableToday(false); }} className="mt-6 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm transition hover:bg-white/15">
                Reset everything
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}