import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-[#243A4C] shadow-[0_18px_34px_rgba(4,12,20,0.26)]">
        <svg viewBox="0 0 80 80" className="h-11 w-11" aria-hidden="true">
          <circle cx="40" cy="40" r="12" fill="#F5B800" />
          <path d="M40 3 43 30H37L40 3Z" fill="#F5B800" />
          <path d="M7 40 32 37v6L7 40Z" fill="#F5B800" />
          <path d="M73 40 48 37v6l25-3Z" fill="#F5B800" />
          <path d="M24 18 37 30l-6 5-7-17Z" fill="#F5B800" />
          <path d="M56 18 49 35l-6-5 13-12Z" fill="#F5B800" />
          <path d="M32 31c3-5 8-8 13-8 6 0 11 3 14 8l-5 2c-2-3-5-5-9-5-4 0-7 2-9 5l-4-2Z" fill="#F5B800" />
          <path d="M55 47c-2 4-5 6-9 7l-2-5c2 0 4-2 5-4l6 2Z" fill="#243A4C" />
        </svg>
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.9rem] tracking-[0.14em] text-[#f4f1ec]">
            Cardinal
          </span>
          <span className="mt-1 text-[0.58rem] uppercase tracking-[0.42em] text-[#bca245]">
            Negocios Inmobiliarios
          </span>
        </span>
      )}
    </Link>
  );
}
