'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Sailboat, ArrowRight, Briefcase, X, Mail, CheckCircle2,
  Star, Clock, MapPin, ChevronRight, Users, Shield, Zap
} from "lucide-react";
import { TRIPS } from "@/app/data/trips";

const PARTNER_EMAIL = "info@ventorotrips.com";
const CONTACT_EMAIL = "info@ventorotrips.com";

type PartnerFormState = {
  fullName: string;
  email: string;
  company: string;
  details: string;
};

type PartnerFormErrors = Partial<Record<keyof PartnerFormState, string>>;

const initialPartnerForm: PartnerFormState = {
  fullName: "",
  email: "",
  company: "",
  details: "",
};

const FEATURED_TRIPS = TRIPS.slice(0, 3);

const HOW_IT_WORKS = [
  { icon: "🔍", step: "1", title: "Browse & Choose", desc: "Explore handpicked tours and activities across the Istrian Riviera." },
  { icon: "📅", step: "2", title: "Book in Minutes", desc: "Select your date, fill in details and confirm instantly. No back-and-forth." },
  { icon: "⛵", step: "3", title: "Enjoy Your Trip", desc: "Show up and have an unforgettable experience. We handle the rest." },
];

const STATS = [
  { value: "500+", label: "Happy guests" },
  { value: "4.9", label: "Average rating", icon: "★" },
  { value: "12", label: "Local partners" },
  { value: "100%", label: "Secure booking" },
];

function VentoroLogo({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 70" fill="none" className={className} aria-label="Ventoro logo">
      <defs>
        <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d060" />
          <stop offset="100%" stopColor="#e8980a" />
        </linearGradient>
        <linearGradient id="vGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5d060" />
          <stop offset="100%" stopColor="#e8980a" />
        </linearGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8dfc8" />
        </linearGradient>
      </defs>
      <line x1="32" y1="28" x2="32" y2="6"  stroke="url(#sunGrad)" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
      <line x1="32" y1="28" x2="14" y2="12" stroke="url(#sunGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      <line x1="32" y1="28" x2="50" y2="12" stroke="url(#sunGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      <line x1="32" y1="28" x2="10" y2="28" stroke="url(#sunGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.60" />
      <line x1="32" y1="28" x2="54" y2="28" stroke="url(#sunGrad)" strokeWidth="1.4" strokeLinecap="round" opacity="0.60" />
      <line x1="32" y1="28" x2="15" y2="44" stroke="url(#sunGrad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.40" />
      <line x1="32" y1="28" x2="49" y2="44" stroke="url(#sunGrad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.40" />
      <circle cx="32" cy="28" r="5.5" fill="url(#sunGrad)" opacity="0.25" />
      <circle cx="32" cy="28" r="3"   fill="url(#sunGrad)" opacity="0.9" />
      <path d="M17 14 L32 52 L47 14" stroke="url(#vGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M21 18 L32 46 L43 18" stroke="#2d9e5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55" />
      <text x="68" y="34" fontFamily="Georgia, 'Times New Roman', serif" fontSize="23" fontWeight="700" letterSpacing="3" fill="url(#textGrad)">VENTORO</text>
      <rect x="68" y="40" width="118" height="1.5" rx="1" fill="#2d9e5f" opacity="0.7" />
      <text x="68" y="54" fontFamily="Georgia, serif" fontSize="8" letterSpacing="4" fill="#2d9e5f" opacity="0.85">ISTRIA · EXPERIENCES</text>
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false);
  const [partnerForm, setPartnerForm] = useState<PartnerFormState>(initialPartnerForm);
  const [partnerErrors, setPartnerErrors] = useState<PartnerFormErrors>({});
  const [isPartnerReadyToSend, setIsPartnerReadyToSend] = useState(false);
  const [partnerMailtoUrl, setPartnerMailtoUrl] = useState("");

  const handleExplore = () => {
    setLoading(true);
    setTimeout(() => router.push("/trips"), 400);
  };

  const validatePartnerForm = (values: PartnerFormState): PartnerFormErrors => {
    const errors: PartnerFormErrors = {};
    if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!values.email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!values.company.trim()) errors.company = "Please enter company/service name.";
    if (!values.details.trim()) errors.details = "Please tell us what you offer.";
    return errors;
  };

  const resetPartnerFlow = () => {
    setPartnerForm(initialPartnerForm);
    setPartnerErrors({});
    setIsPartnerReadyToSend(false);
    setPartnerMailtoUrl("");
  };

  const handlePartnerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validatePartnerForm(partnerForm);
    setPartnerErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const subject = `Partner inquiry - ${partnerForm.company || partnerForm.fullName}`;
    const body = [`Name: ${partnerForm.fullName}`, `Email: ${partnerForm.email}`, `Company/Service: ${partnerForm.company}`, "", "Partnership details:", partnerForm.details].join("\n");
    const mailtoUrl = `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPartnerMailtoUrl(mailtoUrl);
    setIsPartnerReadyToSend(true);
  };

  const resetPartnerFlowAndOpen = () => { resetPartnerFlow(); setIsPartnerFormOpen(true); };
  const contactMailto = `mailto:${CONTACT_EMAIL}?subject=Trip%20inquiry`;

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-white">

      {/* STICKY NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 backdrop-blur-md bg-black/30 border-b border-white/10">
        <Link href="/"><VentoroLogo className="h-9 w-auto" /></Link>
        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          <Link href="/trips" className="transition hover:text-white">Trips</Link>
          <button onClick={resetPartnerFlowAndOpen} className="transition hover:text-white">For Providers</button>
          <a href={contactMailto} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium transition hover:bg-white/20">
            <Mail className="h-3.5 w-3.5" />Contact us
          </a>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/trips" className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-medium">Trips</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${loading ? "scale-105 blur-[2px] brightness-90" : "scale-100"}`} style={{ backgroundImage: "url('/porec.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-16 md:px-10 md:pt-28">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/65">Poreč • Istria • Croatia</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Unforgettable trips<br /><span className="text-[#f0c97a]">in Istria</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg leading-relaxed">
              Private boat tours, sunset cruises, wine routes and handpicked local adventures. Book in minutes, directly with local guides.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={handleExplore} className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.99] shadow-lg">
                <Sailboat className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Browse all trips
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a href={contactMailto} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/20 active:scale-[0.99]">
                <Mail className="h-4 w-4" />Send us an email
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/65 md:text-sm">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#f0c97a]" />Verified local guides</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-[#f0c97a]" />Instant confirmation</span>
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#f0c97a]" />Small groups</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative z-10 bg-black/70 backdrop-blur-md border-y border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-6 md:px-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white md:text-3xl">{stat.icon ? <span className="text-[#f0c97a]">{stat.icon}</span> : null}{stat.value}</p>
                <p className="mt-1 text-xs text-white/55 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRIPS */}
      <section className="relative bg-[#07111a]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, #1a3a50 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #1a2e20 0%, transparent 50%)" }} />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#f0c97a]/80">Popular experiences</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Top trips this season</h2>
            </div>
            <Link href="/trips" className="hidden items-center gap-1.5 text-sm text-white/60 transition hover:text-white md:flex">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {FEATURED_TRIPS.map((trip) => (
              <Link key={trip.slug} href={`/trips/${trip.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/25 hover:bg-white/10">
                <div className="relative h-48 overflow-hidden">
                  <Image src={trip.images[0]} alt={trip.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] backdrop-blur-md">{trip.tag}</span>
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs backdrop-blur-md">
                    <Star className="h-3 w-3 fill-[#f0c97a] text-[#f0c97a]" /><span className="font-semibold">{trip.rating.toFixed(1)}</span>
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold leading-snug">{trip.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-white/55">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{trip.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{trip.duration}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div><span className="text-xs text-white/50">from </span><span className="text-xl font-bold text-white">€{trip.priceFrom}</span><span className="text-xs text-white/50"> / person</span></div>
                    <span className="text-xs text-white/50 transition group-hover:text-white inline-flex items-center gap-1">Book now <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/trips" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm transition hover:bg-white/10">View all trips <ChevronRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#050e14] border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#f0c97a]/80">Simple process</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Book in 3 easy steps</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < HOW_IT_WORKS.length - 1 && <div className="absolute top-8 left-[60%] hidden h-px w-[80%] bg-gradient-to-r from-white/20 to-transparent md:block" />}
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-3xl">{item.icon}</div>
                <div className="mt-1 -mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Step {item.step}</div>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={handleExplore} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 shadow-lg">
              Start exploring <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="bg-[#0d1e15] border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-10">
          <div className="rounded-2xl border border-[#f0c97a]/20 bg-[#f0c97a]/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#f0c97a]/70">For local guides & operators</p>
              <h3 className="mt-2 text-2xl font-bold">Offer your trips on Ventoro</h3>
              <p className="mt-2 text-sm text-white/60 max-w-md">Reach more tourists, manage bookings easily and grow your business. Join our network of verified Istrian partners.</p>
            </div>
            <button onClick={resetPartnerFlowAndOpen} className="shrink-0 inline-flex items-center gap-2 rounded-full border border-[#f0c97a]/50 bg-[#f0c97a]/15 px-6 py-3 text-sm font-medium text-[#f7e6cc] transition hover:bg-[#f0c97a]/25">
              <Briefcase className="h-4 w-4" />Become a partner
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050e14] border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <VentoroLogo className="h-8 w-auto opacity-80" />
            <div className="flex flex-wrap gap-6 text-xs text-white/50">
              <Link href="/trips" className="hover:text-white transition">All trips</Link>
              <a href={contactMailto} className="hover:text-white transition">Contact us</a>
              <a href={`mailto:${PARTNER_EMAIL}`} className="hover:text-white transition">{PARTNER_EMAIL}</a>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-[10px] text-white/30">© 2026 Ventoro Trips. All rights reserved.</p>
            <div className="flex items-center gap-2 text-[10px] text-white/30">
              <span>Powered by</span>
              <Image src="/dom-analytics.png" alt="Dom Analytics" width={80} height={16} className="h-4 w-auto opacity-50" />
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING MAIL BUTTON */}
      <a href={contactMailto} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#2d9e5f] shadow-xl transition hover:bg-[#1e7a45] hover:scale-105 active:scale-95" aria-label="Send us an email">
        <Mail className="h-6 w-6 text-white" />
      </a>

      {/* PARTNER MODAL */}
      {isPartnerFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#0b1e2d]/98 p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#f0c97a]/80">Become a partner</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Send us your collaboration request</h2>
              </div>
              <button onClick={() => setIsPartnerFormOpen(false)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:bg-white/10" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            {!isPartnerReadyToSend ? (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-sm text-white/80">
                    Full name
                    <input required value={partnerForm.fullName} onChange={(e) => setPartnerForm((c) => ({ ...c, fullName: e.target.value }))} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#f0c97a]/50" placeholder="Your full name" />
                    {partnerErrors.fullName && <span className="text-xs text-red-300">{partnerErrors.fullName}</span>}
                  </label>
                  <label className="flex flex-col gap-1 text-sm text-white/80">
                    Email
                    <input type="email" required value={partnerForm.email} onChange={(e) => setPartnerForm((c) => ({ ...c, email: e.target.value }))} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#f0c97a]/50" placeholder="name@company.com" />
                    {partnerErrors.email && <span className="text-xs text-red-300">{partnerErrors.email}</span>}
                  </label>
                </div>
                <label className="flex flex-col gap-1 text-sm text-white/80">
                  Company / service name
                  <input required value={partnerForm.company} onChange={(e) => setPartnerForm((c) => ({ ...c, company: e.target.value }))} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#f0c97a]/50" placeholder="e.g. Adriatic Sunset Cruises" />
                  {partnerErrors.company && <span className="text-xs text-red-300">{partnerErrors.company}</span>}
                </label>
                <label className="flex flex-col gap-1 text-sm text-white/80">
                  Tell us what you offer
                  <textarea required rows={4} value={partnerForm.details} onChange={(e) => setPartnerForm((c) => ({ ...c, details: e.target.value }))} className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#f0c97a]/50" placeholder="Type of tours, max group size, languages, pricing model..." />
                  {partnerErrors.details && <span className="text-xs text-red-300">{partnerErrors.details}</span>}
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-white/50">Next step opens your email app with a prefilled message.</p>
                  <button type="submit" className="rounded-full border border-[#f0c97a]/50 bg-[#f0c97a]/15 px-5 py-2.5 text-sm font-medium text-[#f7e6cc] transition hover:bg-[#f0c97a]/25">Review and continue →</button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 rounded-xl border border-emerald-300/30 bg-emerald-200/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <div>
                    <h3 className="text-base font-semibold text-white">Great, your request is ready.</h3>
                    <p className="mt-1 text-sm text-white/80">Click below to open your email app and send the inquiry to us.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={partnerMailtoUrl} className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-300/15 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-300/25">
                    <Mail className="h-4 w-4" />Open email app
                  </a>
                  <button onClick={() => setIsPartnerFormOpen(false)} className="rounded-full border border-white/30 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}