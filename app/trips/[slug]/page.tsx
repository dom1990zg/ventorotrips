import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, MapPin, Star, Check, X, Users, Calendar } from "lucide-react";
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
          <Link href="/trips" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] backdrop-blur-md transition hover:bg-white/15">
            <ArrowLeft className="h-4 w-4" /> Back to Trips
          </Link>
        </div>
      </main>
    );
  }

  const otherTrips = TRIPS.filter((t) => t.slug !== trip.slug).slice(0, 3);
  const mailHref = "mailto:info@ventorotrips.com?subject=Question%20about%20" + trip.title.split(" ").join("%20");

  return (
    <main className="min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0a1628 0%, #07111a 40%, #0d1f12 100%)" }}>

      {/* HERO IMAGE */}
      <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden md:h-[65vh]">
        <Image src={trip.images[0]} alt={trip.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#07111a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="absolute left-6 top-6 z-10 md:left-10 md:top-8">
          <Link href="/trips" className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md transition hover:bg-black/60">
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" /> All trips
          </Link>
        </div>

        <div className="absolute bottom-8 left-6 z-10 md:left-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/25 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.25em] backdrop-blur-md">{trip.tag}</span>
            <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-[#f0c97a] text-[#f0c97a]" />
              {trip.rating.toFixed(1)}
              <span className="font-normal text-white/60">({trip.reviews} reviews)</span>
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-6 pb-32 md:px-10 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}
          <div className="-mt-2">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{trip.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#f0c97a]" />{trip.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#f0c97a]" />{trip.duration}</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-[#f0c97a]" />Small group</span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-white/70">{trip.description}</p>

            {trip.images[1] && (
              <div className="relative mt-8 h-56 overflow-hidden rounded-2xl border border-white/10 md:h-72">
                <Image src={trip.images[1]} alt={trip.title + " photo 2"} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
              </div>
            )}

            {/* Highlights */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[#f0c97a]/80">Highlights</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {trip.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0c97a]/20 text-[#f0c97a] text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Included / Not included */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <h3 className="text-xs uppercase tracking-[0.25em] text-emerald-400/80">Included</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                  {trip.included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5">
                <h3 className="text-xs uppercase tracking-[0.25em] text-rose-400/80">Not included</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                  {trip.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* You might also like */}
            {otherTrips.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xs uppercase tracking-[0.3em] text-white/50">You might also like</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {otherTrips.map((t) => (
                    <Link key={t.slug} href={"/trips/" + t.slug} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/25 hover:-translate-y-0.5">
                      <div className="relative h-32 overflow-hidden">
                        <Image src={t.images[0]} alt={t.title} fill sizes="33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <p className="text-xs font-semibold leading-snug">{t.title}</p>
                          <p className="mt-0.5 text-xs text-white/60">from €{t.priceFrom}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT – Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-3xl border border-white/15 bg-white/8 p-6 backdrop-blur-xl">
              <div className="border-b border-white/10 pb-5">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Price per person</p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">€{trip.priceFrom}</span>
                  <span className="mb-1 text-sm text-white/50">/ person</span>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/55"><Clock className="h-4 w-4" />Duration</span>
                  <span className="font-medium">{trip.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/55"><MapPin className="h-4 w-4" />Location</span>
                  <span className="font-medium">{trip.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/55"><Star className="h-4 w-4" />Rating</span>
                  <span className="font-medium">{trip.rating.toFixed(1)} / 5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/55"><Calendar className="h-4 w-4" />Availability</span>
                  <span className="font-medium text-emerald-400">On request</span>
                </div>
              </div>

              <Link href={"/book?trip=" + trip.slug} className="mt-6 flex w-full items-center justify-center rounded-2xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-white/90 active:scale-[0.98]">
                Book this trip →
              </Link>

              <a href={mailHref} className="mt-3 flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 py-3.5 text-sm text-white/80 transition hover:bg-white/10">
                Ask a question
              </a>

              <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs text-white/45">
                <p>✓ Free cancellation up to 24h before</p>
                <p>✓ Instant booking confirmation</p>
                <p>✓ Verified local guide</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* STICKY MOBILE BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#07111a]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/50">from</p>
            <p className="text-2xl font-bold">€{trip.priceFrom} <span className="text-xs font-normal text-white/50">/ person</span></p>
          </div>
          <Link href={"/book?trip=" + trip.slug} className="flex-1 max-w-[200px] flex items-center justify-center rounded-2xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-white/90 active:scale-95">
            Book now →
          </Link>
        </div>
      </div>

    </main>
  );
}