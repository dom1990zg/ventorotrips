"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type TripMediaSectionProps = {
  title: string;
  slug: string;
  images: string[];
  priceFrom: number;
  duration: string;
  location: string;
  rating: number;
};

export default function TripMediaSection({
  title,
  slug,
  images,
  priceFrom,
  duration,
  location,
  rating,
}: TripMediaSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const showPrev = () => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? images.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === images.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => openLightbox(index)}
            className={`relative overflow-hidden rounded-2xl border border-white/15 text-left transition hover:border-white/30 ${
              index === 0 ? "col-span-2 h-56 md:h-72" : "h-36 md:h-40"
            }`}
            aria-label={`Open ${title} photo ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${title} photo ${index + 1}`}
              fill
              sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="mb-8 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Booking preview</p>
        <div className="mt-4 text-sm text-white/70">from</div>
        <div className="text-4xl font-semibold text-white">€{priceFrom}</div>
        <div className="mt-2 text-xs text-white/60">per guest • instant confirmation mock</div>

        <div className="mt-6 space-y-2 text-sm text-white/80">
          <div className="flex items-center justify-between">
            <span>Duration</span>
            <span className="font-medium text-white">{duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Location</span>
            <span className="font-medium text-white">{location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Rating</span>
            <span className="font-medium text-white">{rating.toFixed(1)} / 5</span>
          </div>
        </div>

        <Link
          href={`/book?trip=${slug}`}
          className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90"
        >
          Book now
        </Link>
        <button className="mt-3 w-full rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/90 transition hover:bg-white/10">
          Ask a question
        </button>
      </div>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/40 p-2 text-white/90 transition hover:bg-black/70"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={showPrev}
            className="absolute left-4 rounded-full border border-white/30 bg-black/40 p-2 text-white/90 transition hover:bg-black/70 md:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20">
            <Image
              src={images[activeIndex]}
              alt={`${title} photo ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 rounded-full border border-white/30 bg-black/40 p-2 text-white/90 transition hover:bg-black/70 md:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </>
  );
}