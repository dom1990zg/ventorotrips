"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CalendarDays, Users, CircleCheckBig } from "lucide-react";
import { TRIPS } from "@/app/data/trips";

type BookingForm = {
  date: string;
  guests: number;
  fullName: string;
  email: string;
  phone: string;
  note: string;
};

function BookFlow() {
  const searchParams = useSearchParams();
  const tripSlug = searchParams.get("trip") ?? "";
  const trip = useMemo(() => TRIPS.find((t) => t.slug === tripSlug), [tripSlug]);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<BookingForm>({
    date: "",
    guests: 2,
    fullName: "",
    email: "",
    phone: "",
    note: "",
  });

  const stepTitle =
    step === 1 ? "Select date & guests" : step === 2 ? "Your contact details" : "Review & confirm";

  const canContinueFromStep1 = Boolean(form.date) && form.guests > 0;
  const canContinueFromStep2 =
    form.fullName.trim().length > 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.phone.trim().length >= 6;

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <Image src="/trips.jpg" alt="Sea background" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-8 md:px-10">
        <Link
          href={trip ? `/trips/${trip.slug}` : "/trips"}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/90 backdrop-blur-md transition hover:border-white/40 hover:bg-black/50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Booking</p>
              <div className="text-xs text-white/70">Step {step} / 3</div>
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{stepTitle}</h1>

            <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`rounded-full px-3 py-2 text-center ${
                    i <= step ? "bg-white text-black" : "bg-white/15 text-white/70"
                  }`}
                >
                  {i === 1 ? "Date" : i === 2 ? "Contact" : "Confirm"}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <div className="mt-8 space-y-5">
                <label className="block text-sm text-white/85">
                  Date
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((current) => ({ ...current, date: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white outline-none focus:border-white/45"
                  />
                </label>

                <label className="block text-sm text-white/85">
                  Number of guests
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={form.guests}
                    onChange={(e) =>
                      setForm((current) => ({ ...current, guests: Number(e.target.value) || 1 }))
                    }
                    className="mt-2 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white outline-none focus:border-white/45"
                  />
                </label>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mt-8 space-y-5">
                <label className="block text-sm text-white/85">
                  Full name
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((current) => ({ ...current, fullName: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white outline-none focus:border-white/45"
                    placeholder="Your full name"
                  />
                </label>

                <label className="block text-sm text-white/85">
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white outline-none focus:border-white/45"
                    placeholder="name@email.com"
                  />
                </label>

                <label className="block text-sm text-white/85">
                  Phone
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white outline-none focus:border-white/45"
                    placeholder="+385 ..."
                  />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="mt-8 space-y-4 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm">
                <p className="text-white/80">Review your booking details:</p>
                <div className="flex items-center justify-between text-white/85">
                  <span>Date</span>
                  <span>{form.date || "—"}</span>
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span>Guests</span>
                  <span>{form.guests}</span>
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span>Name</span>
                  <span>{form.fullName || "—"}</span>
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span>Email</span>
                  <span>{form.email || "—"}</span>
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span>Phone</span>
                  <span>{form.phone || "—"}</span>
                </div>

                <label className="block text-sm text-white/85">
                  Note (optional)
                  <textarea
                    rows={3}
                    value={form.note}
                    onChange={(e) => setForm((current) => ({ ...current, note: e.target.value }))}
                    className="mt-2 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white outline-none focus:border-white/45"
                    placeholder="Any special requests..."
                  />
                </label>

                <div className="rounded-xl border border-emerald-300/30 bg-emerald-300/10 p-3 text-emerald-100">
                  This is UI-only confirmation for now. Backend + email notifications come next.
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
                disabled={step === 1}
                className="rounded-full border border-white/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white/90 transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s))}
                  disabled={(step === 1 && !canContinueFromStep1) || (step === 2 && !canContinueFromStep2)}
                  className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                </button>
              ) : (
                <button className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black">
                  <CircleCheckBig className="h-4 w-4" />
                  Confirm booking
                </button>
              )}
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl lg:sticky lg:top-8">
            <h2 className="text-sm uppercase tracking-[0.25em] text-white/65">Selected trip</h2>
            <p className="mt-3 text-xl font-semibold text-white">{trip?.title ?? "Trip not selected"}</p>

            <div className="mt-5 space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{trip?.duration ?? "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{form.guests} guests</span>
              </div>
            </div>

            <div className="mt-6 border-t border-white/15 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Price from</p>
              <p className="mt-1 text-3xl font-semibold text-white">€{trip?.priceFrom ?? "—"}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black text-white p-8">Loading booking...</main>}>
      <BookFlow />
    </Suspense>
  );
}