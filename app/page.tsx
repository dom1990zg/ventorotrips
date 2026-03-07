'use client';

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sailboat, ArrowRight, Briefcase, X, Mail, CheckCircle2 } from "lucide-react";

const PARTNER_EMAIL = "info@ventorotrips.com";

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
    setTimeout(() => router.push("/trips"), 900);
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
    const body = [
      `Name: ${partnerForm.fullName}`,
      `Email: ${partnerForm.email}`,
      `Company/Service: ${partnerForm.company}`,
      "",
      "Partnership details:",
      partnerForm.details,
    ].join("\n");

    const mailtoUrl = `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPartnerMailtoUrl(mailtoUrl);
    setIsPartnerReadyToSend(true);
  };

  const trustBullets = useMemo(
    () => ["Handpicked local providers", "Fast booking confirmation", "Secure guest experience"],
    []
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out ${
          loading ? "scale-105 blur-[2px] brightness-90" : "scale-100"
        }`}
        style={{ backgroundImage: "url('/porec.jpg')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#07131f]/35 via-[#07131f]/45 to-[#07131f]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07131f]/70 via-[#07131f]/35 to-transparent" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[#eaf2f8]">VENTORO</div>

        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <span className="cursor-pointer transition hover:text-white">Trips</span>
          <span className="cursor-pointer transition hover:text-white">For Providers</span>
          <span
            onClick={() => alert("Hello little one! Me miss you :)")}
            className="cursor-pointer transition hover:text-white"
          >
            Support
          </span>
        </nav>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-7xl items-center px-6 pb-20 md:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#eaf2f8]/70">Poreč • Istria • Croatia</p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">What to do in Poreč</h1>

          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
            Private boat tours, wine routes, sunset cruises and handpicked local adventures across the
            Istrian Riviera.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={handleExplore}
              className="group relative inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.08)] px-5 py-3 backdrop-blur-md transition hover:bg-[rgba(255,255,255,0.14)] active:scale-[0.99]"
              aria-label="Explore trips"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <Sailboat className="h-4 w-4 text-white/90 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
              <span className="text-sm font-medium">Explore trips</span>
              <ArrowRight className="h-4 w-4 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => {
                resetPartnerFlow();
                setIsPartnerFormOpen(true);
              }}
              className="group inline-flex items-center gap-3 rounded-full border border-[rgba(217,179,130,0.45)] bg-[rgba(217,179,130,0.15)] px-5 py-3 text-[#f7e6cc] backdrop-blur-md transition hover:bg-[rgba(217,179,130,0.24)] active:scale-[0.99]"
              aria-label="Become a partner"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#f7e6cc]/30 bg-[#f7e6cc]/10">
                <Briefcase className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">Become a partner</span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70 md:text-sm">
            {trustBullets.map((bullet) => (
              <span key={bullet}>✓ {bullet}</span>
            ))}
          </div>
        </div>
      </section>

      {isPartnerFormOpen ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Partner inquiry form"
            className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#0b1e2d]/95 p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#eaf2f8]/70">Become a partner</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Send us your collaboration request</h2>
              </div>
              <button
                onClick={() => setIsPartnerFormOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close partner form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!isPartnerReadyToSend ? (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-sm text-white/80">
                    Full name
                    <input
                      required
                      value={partnerForm.fullName}
                      onChange={(event) => setPartnerForm((current) => ({ ...current, fullName: event.target.value }))}
                      className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d9b382]/70"
                      placeholder="Your full name"
                    />
                    {partnerErrors.fullName ? <span className="text-xs text-red-300">{partnerErrors.fullName}</span> : null}
                  </label>

                  <label className="flex flex-col gap-1 text-sm text-white/80">
                    Email
                    <input
                      type="email"
                      required
                      value={partnerForm.email}
                      onChange={(event) => setPartnerForm((current) => ({ ...current, email: event.target.value }))}
                      className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d9b382]/70"
                      placeholder="name@company.com"
                    />
                    {partnerErrors.email ? <span className="text-xs text-red-300">{partnerErrors.email}</span> : null}
                  </label>
                </div>

                <label className="flex flex-col gap-1 text-sm text-white/80">
                  Company / service name
                  <input
                    required
                    value={partnerForm.company}
                    onChange={(event) => setPartnerForm((current) => ({ ...current, company: event.target.value }))}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d9b382]/70"
                    placeholder="Example: Adriatic Sunset Cruises"
                  />
                  {partnerErrors.company ? <span className="text-xs text-red-300">{partnerErrors.company}</span> : null}
                </label>

                <label className="flex flex-col gap-1 text-sm text-white/80">
                  Tell us what you offer
                  <textarea
                    required
                    rows={4}
                    value={partnerForm.details}
                    onChange={(event) => setPartnerForm((current) => ({ ...current, details: event.target.value }))}
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d9b382]/70"
                    placeholder="Type of tours, max group size, languages, pricing model..."
                  />
                  {partnerErrors.details ? <span className="text-xs text-red-300">{partnerErrors.details}</span> : null}
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-white/60">Next step opens your email app with prefilled message.</p>
                  <button
                    type="submit"
                    className="rounded-full border border-[rgba(217,179,130,0.65)] bg-[rgba(217,179,130,0.2)] px-5 py-2.5 text-sm font-medium text-[#f7e6cc] transition hover:bg-[rgba(217,179,130,0.3)]"
                  >
                    Review and continue
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 rounded-xl border border-emerald-300/30 bg-emerald-200/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <div>
                    <h3 className="text-base font-semibold text-white">Great, your request is ready.</h3>
                    <p className="mt-1 text-sm text-white/80">
                      Click below to open your email app and send the inquiry to us.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={partnerMailtoUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-300/15 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-300/25"
                  >
                    <Mail className="h-4 w-4" />
                    Open email app
                  </a>
                  <button
                    onClick={() => setIsPartnerFormOpen(false)}
                    className="rounded-full border border-white/30 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none fixed bottom-4 left-4 z-20 hidden items-center gap-2 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/50">Powered by Dom Analytics</span>
        <Image src="/dom-analytics.png" alt="Dom Analytics" width={92} height={20} className="h-5 w-auto opacity-80" />
      </div>
    </main>
  );
}