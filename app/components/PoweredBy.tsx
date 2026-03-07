import Image from "next/image";

export default function PoweredBy() {
  return (
    <div className="fixed bottom-4 left-4 z-50 hidden items-center gap-2 md:flex">
      <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Powered by</span>
      <Image src="/dom-analytics.png" alt="Dom Analytics" width={92} height={20} className="h-5 w-auto opacity-80" />
    </div>
  );
}