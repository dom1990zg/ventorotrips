'use client';

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type TripImageGalleryProps = {
  images: string[];
  title: string;
};

export default function TripImageGallery({ images, title }: TripImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = images.length;

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % totalImages);
  }, [totalImages]);

  if (totalImages === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-black/10 p-3">
      <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-white/15 md:h-72">
        <Image
          src={images[activeIndex]}
          alt={`${title} photo ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          priority
        />

        {totalImages > 1 ? (
          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white transition hover:bg-black/70"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      {totalImages > 1 ? (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/35 hover:bg-white/60"}`}
              aria-label={`Select photo ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}