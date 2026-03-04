import Image from "next/image";

export default function PoweredBy() {
  return (
    <div className="flex items-center gap-2 opacity-70">
      <span className="text-[11px] tracking-[0.22em] uppercase text-white/70">
        Powered by Dom Analytics
      </span>

      {/* Logo wrapper (no extra empty space) */}
      <div className="relative h-5 w-[70px]">
        <Image
          src="/dom-analytics.png"
          alt="Dom Analytics"
          fill
          sizes="70px"
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  );
}