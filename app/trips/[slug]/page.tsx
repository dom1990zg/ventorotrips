import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react";

type Trip = {
  slug: string;
  title: string;
  location: string;
  duration: string;
  priceFrom: number;
  rating: number;
  reviews: number;
  tag: string;
  description: string;
};

const TRIPS: Trip[] = [
  {
    slug: "sunset-cruise-porec",
    title: "Sunset Cruise (Poreč Riviera)",
    location: "Poreč • Istria",
    duration: "2h",
    priceFrom: 59,
    rating: 4.9,
    reviews: 214,
    tag: "Best seller",
    description:
      "Golden-hour cruise along the Poreč coastline with a relaxed pace, stunning views and a perfect sunset finish.",
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
    description:
      "Private charter with flexible stops, swimming breaks and a scenic ride into the Lim Fjord.",
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
    description:
      "A calm evening cruise focused on dolphin spotting with respectful distance and beautiful sea-light.",
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
    description:
      "Guided sea-kayak route past the old town with stops for caves, cliffs and swim breaks.",
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
    description:
      "Easy day cruise with free time in Rovinj, photo spots and a laid-back return along the coast.",
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
    description:
      "High-end yacht experience with premium comfort, curated route and the best views of the Riviera.",
  },
];

export default function TripDetails({
  params,
}: {
  params: { slug: string };
}) {
  const trip = TRIPS.find((t) => t.slug === params.slug);

  if (!trip) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-8">
        <div className="max-w-lg text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Not found
          </p>
          <h1 className="mt-4 text-3xl font-semibold">Trip not found</h1>
          <p className="mt-3 text-white/70">
            This trip doesn’t exist (or the slug is wrong).
          </p>
          <Link
            href="/trips"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] backdrop-blur-md transition hover:bg-white/15 hover:border-white/35"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Trips
          </Link>
        </div>
      </main>
    );
  }

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

      {/* Top bar */}
      <div className="px-8 pt-8">
        <Link
          href="/trips"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-black/60 hover:border-white/40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Content */}
      <section className="px-8 pt-12 pb-20">
        <div className="max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            {trip.tag}
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            {trip.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {trip.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {trip.duration}
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="font-semibold text-white">
                {trip.rating.toFixed(1)}
              </span>
              <span className="text-white/50">({trip.reviews})</span>
            </span>
          </div>

          <p className="mt-6 text-white/75 leading-relaxed">
            {trip.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-white/70 text-sm">
              from{" "}
              <span className="text-white text-3xl font-semibold">
                €{trip.priceFrom}
              </span>
            </div>

            <button className="rounded-full bg-white text-black px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition hover:opacity-90">
              Book now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}