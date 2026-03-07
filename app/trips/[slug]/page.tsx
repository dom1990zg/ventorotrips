import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Star, Check, X } from "lucide-react";
import { TRIPS } from "@/app/data/trips";

export default async function TripDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = TRIPS.find((t) => t.slug === slug);

  if (!trip) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-8 text-white">
        <div className="max-w-lg text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Not found</p>
          <h1 className="mt-4 text-3xl font-semibold">Trip not found</h1>
          <Link
            href="/trips"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] backdrop-blur-md transition hover:border-white/35 hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Trips
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <img src={trip.images[0]} alt={trip.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </div>

      <div className="px-6 pt-6 md:px-10 md:pt-8">
        <Link
          href="/trips"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:border-white/40 hover:bg-black/60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <section className="px-6 pb-20 pt-8 md:px-10 md:pt-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
          <article className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl md:p-8">
            <div className="mb-6 grid grid-cols-2 gap-3">
              {trip.images.map((image, index) => (
                <div
                  key={image}
                  className={`overflow-hidden rounded-2xl border border-white/15 ${index === 0 ? "col-span-2" : ""}`}
                >
                  <img
                    src={image}
                    alt={`${trip.title} photo ${index + 1}`}
                    className={`w-full object-cover ${index === 0 ? "h-56 md:h-72" : "h-36 md:h-40"}`}
                  />
                </div>
              ))}
            </div>

            <p className="text-xs uppercase tracking-[0.35em] text-white/60">{trip.tag}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{trip.title}</h1>

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
                <span className="font-semibold text-white">{trip.rating.toFixed(1)}</span>
                <span className="text-white/50">({trip.reviews}) reviews</span>
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-white/75">{trip.description}</p>

            <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5">
              <h2 className="text-sm uppercase tracking-[0.24em] text-white/70">Highlights</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {trip.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="text-sm uppercase tracking-[0.22em] text-white/70">Included</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/85">
                  {trip.included.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="text-sm uppercase tracking-[0.22em] text-white/70">Not included</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/85">
                  {trip.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <X className="mt-0.5 h-4 w-4 text-rose-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <aside className="h-fit rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl lg:sticky lg:top-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Booking preview</p>
            <div className="mt-4 text-sm text-white/70">from</div>
            <div className="text-4xl font-semibold text-white">{trip.priceFrom}</div>

            <button className="mt-7 w-full rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90">
              Book now
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}