import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
  imageClassName?: string;
};

export function Logo({ className, compact = false, imageClassName }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      <Image
        src="/brand/logocardinal.png"
        alt="Cardinal Negocios Inmobiliarios"
        width={820}
        height={566}
        priority
        className={cn(
          "h-auto object-contain",
          compact ? "w-[168px] min-w-[168px]" : "w-[186px] min-w-[186px] md:w-[224px] md:min-w-[224px]",
          imageClassName
        )}
      />
    </Link>
  );
}
