import Image from "next/image";

export function NeonBanner() {
  return (
    <section className="relative isolate flex h-[52vh] min-h-[360px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,#170707,#050505_60%),radial-gradient(circle_at_75%_40%,rgba(196,0,0,0.3),transparent_55%)]">
        <Image
          src="/images/banner.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
      </div>
      <div className="cinematic-overlay absolute inset-0 -z-10" />

      {/* Decorative neon-sign accents around the edges */}
      <span className="pointer-events-none absolute left-6 top-6 hidden font-display text-sm tracking-signage text-lacquer-bright/70 sm:block [text-shadow:0_0_10px_rgba(255,48,48,0.6)]">
        ยินดีต้อนรับ
      </span>
      <span className="pointer-events-none absolute bottom-6 right-6 hidden font-display text-sm tracking-signage text-gold/70 sm:block [text-shadow:0_0_10px_rgba(214,165,42,0.6)]">
        横浜・馬車道
      </span>

      <div className="relative text-center">
        <h2 className="font-neon text-5xl leading-none text-lacquer-bright neon-text animate-neon-pulse sm:text-7xl">
          BOATHONG
        </h2>
        <p className="mt-4 font-display text-xl text-gold neon-text-gold sm:text-2xl">
          ボアトウン
        </p>
      </div>
    </section>
  );
}
