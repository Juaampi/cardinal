import { siteConfig } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteConfig.phoneLink}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-[70] inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-[#25d366] text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] transition hover:scale-105 hover:brightness-105 md:bottom-7 md:right-7"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M19.11 17.2c-.28-.14-1.64-.8-1.9-.89-.25-.1-.43-.14-.61.14-.18.28-.7.89-.86 1.07-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.38-.82-.73-1.37-1.64-1.53-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.46.1-.19.05-.35-.02-.5-.07-.14-.61-1.48-.84-2.03-.22-.52-.45-.45-.61-.46h-.52c-.19 0-.5.07-.77.35-.26.28-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.03 3.11 4.92 4.36.69.3 1.23.48 1.65.61.69.22 1.31.19 1.81.11.55-.08 1.64-.67 1.87-1.32.23-.64.23-1.2.16-1.32-.06-.1-.24-.16-.52-.3Z" />
        <path d="M16.04 3.2c-6.98 0-12.64 5.65-12.64 12.61 0 2.22.58 4.39 1.68 6.29L3.2 28.8l6.88-1.8a12.69 12.69 0 0 0 5.96 1.51h.01c6.97 0 12.64-5.66 12.64-12.62 0-3.37-1.31-6.54-3.69-8.91A12.57 12.57 0 0 0 16.04 3.2Zm0 23.18h-.01a10.6 10.6 0 0 1-5.39-1.47l-.39-.23-4.08 1.07 1.09-3.97-.25-.4a10.5 10.5 0 0 1-1.62-5.59c0-5.82 4.75-10.56 10.61-10.56 2.83 0 5.49 1.09 7.49 3.08a10.47 10.47 0 0 1 3.11 7.47c0 5.82-4.77 10.6-10.56 10.6Z" />
      </svg>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
