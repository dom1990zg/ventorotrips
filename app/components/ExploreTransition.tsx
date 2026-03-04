"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  label?: string;
  to?: string;
  durationMs?: number;
};

export default function ExploreTransition({
  label = "Explore",
  to = "/trips",
  durationMs = 2600,
}: Props) {
  const router = useRouter();
  const [run, setRun] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => router.push(to), prefersReducedMotion ? 50 : durationMs);
    return () => clearTimeout(t);
  }, [run, router, to, durationMs, prefersReducedMotion]);

  return (
    <>
      <button
        onClick={() => setRun(true)}
        className="group inline-flex items-center justify-center rounded-2xl bg-black px-8 py-4 text-base font-medium text-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.65)] transition hover:bg-gray-900 active:scale-[0.99]"
      >
        <span className="mr-2">{label}</span>
        <span className="inline-block translate-x-0 transition group-hover:translate-x-0.5">→</span>
      </button>

      <div
        aria-hidden
        className={[
          "fixed inset-0 z-[9999] pointer-events-none",
          run ? "opacity-100" : "opacity-0",
          "transition-opacity duration-200",
        ].join(" ")}
      >
        <div className="scene">
          {/* Sky */}
          <div className="sky" />
          {/* Sun glow */}
          <div className="sun" />
          {/* Clouds/atmosphere */}
          <div className="haze" />

          {/* Sea layers */}
          <div className="sea" />
          <div className="glitter" />
          <div className="waves waves1" />
          <div className="waves waves2" />
          <div className="waves waves3" />

          {/* Boat + wake */}
          <div className={run ? "boat boat-run" : "boat"}>
            <Boat />
            <div className="wake" />
          </div>

          {/* Film grain */}
          <div className="grain" />

          {/* Final fade to white (feels like page transition) */}
          <div className={run ? "fade fade-run" : "fade"} />
        </div>

        <style jsx>{`
          .scene {
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden;
            background: #0b1220;
          }

          /* SKY */
          .sky {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(1200px 700px at 50% 25%, rgba(255, 200, 140, 0.45), transparent 55%),
              radial-gradient(900px 500px at 65% 20%, rgba(140, 120, 255, 0.25), transparent 55%),
              radial-gradient(900px 520px at 35% 22%, rgba(255, 130, 90, 0.18), transparent 60%),
              linear-gradient(to bottom, #090f1a 0%, #1a1130 35%, #6b2b3f 70%, #ffb36a 100%);
            transform: scale(1.05);
            filter: saturate(1.05) contrast(1.05);
          }

          .sun {
            position: absolute;
            left: 50%;
            top: 33%;
            width: 220px;
            height: 220px;
            transform: translate(-50%, -50%);
            border-radius: 999px;
            background: radial-gradient(circle at 35% 35%, #fff6d9 0%, #ffd1a3 35%, #ff8a3d 62%, rgba(255, 138, 61, 0) 72%);
            box-shadow: 0 0 120px 30px rgba(255, 160, 95, 0.32);
            opacity: 0.95;
            filter: blur(0.2px);
          }

          .haze {
            position: absolute;
            inset: 0;
            background:
              radial-gradient(900px 480px at 50% 45%, rgba(255, 255, 255, 0.10), transparent 60%),
              radial-gradient(900px 480px at 50% 55%, rgba(0, 0, 0, 0.18), transparent 60%);
            mix-blend-mode: soft-light;
            opacity: 0.7;
          }

          /* SEA */
          .sea {
            position: absolute;
            inset-x: 0;
            bottom: 0;
            height: 56%;
            background:
              radial-gradient(800px 250px at 50% 0%, rgba(255, 170, 120, 0.18), transparent 60%),
              linear-gradient(to bottom, #061a26 0%, #05202e 45%, #03141c 100%);
            filter: saturate(1.05);
          }

          /* Sun reflection glitter */
          .glitter {
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 420px;
            height: 52%;
            transform: translateX(-50%);
            background: linear-gradient(
              to bottom,
              rgba(255, 230, 190, 0.55),
              rgba(255, 200, 140, 0.14) 35%,
              rgba(255, 255, 255, 0.0) 75%
            );
            filter: blur(10px);
            opacity: 0.6;
            mask-image: radial-gradient(closest-side at 50% 0%, black 0%, transparent 78%);
          }

          /* WAVES (multiple layers for depth) */
          .waves {
            position: absolute;
            inset-x: -30%;
            bottom: 20%;
            height: 220px;
            background: radial-gradient(70px 18px at 70px 24px, rgba(255, 255, 255, 0.18) 35%, transparent 36%) repeat-x;
            background-size: 140px 70px;
            filter: blur(0.3px);
            opacity: 0.45;
          }
          .waves1 {
            bottom: 24%;
            opacity: 0.38;
            animation: drift 2.2s linear infinite;
          }
          .waves2 {
            bottom: 20%;
            opacity: 0.26;
            animation: drift 3.3s linear infinite reverse;
          }
          .waves3 {
            bottom: 16%;
            opacity: 0.20;
            animation: drift 4.4s linear infinite;
          }
          @keyframes drift {
            from { transform: translateX(0); }
            to { transform: translateX(-140px); }
          }

          /* BOAT */
          .boat {
            position: absolute;
            left: -28%;
            bottom: 18%;
            width: 260px;
            height: 180px;
            transform-origin: 50% 70%;
            filter: drop-shadow(0 18px 20px rgba(0,0,0,0.35));
          }
          .boat-run {
            animation: sail 2.35s cubic-bezier(0.22, 1, 0.36, 1) forwards, bob 0.95s ease-in-out infinite;
          }
          @keyframes sail {
            0%   { transform: translateX(0) translateY(0) scale(0.98) rotate(-1.2deg); opacity: 1; }
            55%  { transform: translateX(70vw) translateY(-4px) scale(1) rotate(0.7deg); opacity: 1; }
            100% { transform: translateX(122vw) translateY(-2px) scale(1.02) rotate(1.1deg); opacity: 0.98; }
          }
          @keyframes bob {
            0%,100% { translate: 0 0; }
            50%     { translate: 0 -7px; }
          }

          /* Wake trail behind boat */
          .wake {
            position: absolute;
            left: -22px;
            bottom: 42px;
            width: 220px;
            height: 70px;
            background: linear-gradient(to right, rgba(255,255,255,0.0), rgba(255,255,255,0.12), rgba(255,255,255,0.0));
            transform: rotate(-4deg);
            filter: blur(1px);
            opacity: 0.0;
          }
          .boat-run .wake {
            opacity: 0.9;
            animation: wake 0.55s ease-in-out infinite;
          }
          @keyframes wake {
            0%,100% { transform: rotate(-4deg) scaleX(1); opacity: 0.55; }
            50%     { transform: rotate(-4deg) scaleX(1.06); opacity: 0.75; }
          }

          /* Film grain for “expensive” look */
          .grain {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0.12;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
            mix-blend-mode: overlay;
          }

          /* Fade to white to “hand off” to next page */
          .fade {
            position: absolute;
            inset: 0;
            background: white;
            opacity: 0;
          }
          .fade-run {
            animation: fadeout 2.6s ease-in-out forwards;
          }
          @keyframes fadeout {
            0%, 72% { opacity: 0; }
            100% { opacity: 1; }
          }

          @media (prefers-reduced-motion: reduce) {
            .boat-run, .waves1, .waves2, .waves3, .fade-run { animation: none !important; }
          }
        `}</style>
      </div>
    </>
  );
}

function Boat() {
  return (
    <svg viewBox="0 0 260 180" className="h-full w-full">
      {/* mast */}
      <rect x="128" y="18" width="6" height="118" rx="3" fill="rgba(10,10,10,0.55)" />
      {/* sails */}
      <path d="M131 24 L131 126 L58 126 Z" fill="rgba(255,255,255,0.94)" />
      <path d="M135 32 L135 126 L214 126 Z" fill="rgba(255,255,255,0.78)" />
      {/* hull */}
      <path
        d="M52 132 C88 158, 172 158, 208 132 L230 132 C212 166, 48 166, 30 132 Z"
        fill="rgba(12,12,12,0.86)"
      />
      {/* highlight */}
      <path
        d="M64 140 C95 156, 165 156, 196 140"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}