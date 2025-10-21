import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-muted/20 mt-0 border-t py-8 md:py-36">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 2xl:max-w-[90rem]">
        {/* Kiri: Tagline SCBD */}
        <p className="text-muted-foreground text-sm">
          © {currentYear} PT Sukses Cuan Bersama Darrell (SCBD)® —{" "}
          <span className="inline-flex items-center gap-1">
            <span aria-hidden className="motion-safe:animate-blink">
              _
            </span>
          </span>
        </p>

        {/* Tengah: Sparkles + Logo (CSS-only; nol JS) */}
        <div className="group relative flex items-center gap-3">
          <Sparkles
            className="text-primary motion-safe:animate-floaty group-hover:motion-safe:animate-wiggle h-8 w-8 md:h-18 md:w-18"
            aria-hidden
          />
          <Link
            href="/"
            prefetch={false} // hindari prefetch tak perlu dari footer
            aria-label="Kembali ke beranda (klik untuk +7 semangat)"
            className="inline-flex items-center"
          >
            <Image
              src="https://res.cloudinary.com/drvu0dpry/image/upload/v1760967599/footer_eaf8ep.webp"
              alt="Logo Darrell"
              width={150}
              height={150}
              // biar ringan & responsif
              sizes="(max-width: 640px) 64px, 96px"
              loading="lazy"
              className="transition-transform duration-300 group-hover:-rotate-6 group-active:scale-95"
            />
          </Link>

          {/* Tooltip no-JS */}
          <span className="bg-muted text-foreground pointer-events-none absolute -bottom-8 left-1/2 hidden -translate-x-1/2 rounded-full px-3 py-1 text-xs whitespace-nowrap opacity-0 shadow group-hover:block group-hover:opacity-100">
            Psst... kamu keren ✨
          </span>
        </div>

        {/* Kanan: credit */}
        <p className="text-muted-foreground invisible text-sm md:visible">
          © {currentYear} Darrell Valentino — Made with ❤️ + kopi Golda
        </p>
      </div>
    </footer>
  );
}
