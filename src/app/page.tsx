import Image from "next/image";
import Link from "next/link";
import { Award, ChevronRight, Search, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { PropertyCard } from "@/components/public/property-card";
import { SearchBar } from "@/components/public/search-bar";
import { SectionHeading } from "@/components/shared/section-heading";
import { getFeaturedProperties, getSearchMeta } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default async function Home() {
  const [featuredProperties, searchMeta] = await Promise.all([getFeaturedProperties(), getSearchMeta()]);
  const services = [
    {
      title: "Ventas",
      text: "Comercialización cuidada, presencia visual sólida y seguimiento cercano de cada oportunidad.",
    },
    {
      title: "Compras",
      text: "Acompañamiento para detectar oportunidades y decidir con mejor información y confianza.",
    },
    {
      title: "Administración",
      text: "Gestión ordenada y profesional para propietarios que buscan respaldo y tranquilidad.",
    },
    {
      title: "Tasaciones profesionales",
      text: "Valoraciones serias y fundamentadas para proyectar una operación con criterio.",
    },
    {
      title: "Alquileres",
      text: "Procesos ágiles para unir oferta y demanda con claridad y buena comunicación.",
    },
    {
      title: "Inmuebles urbanos y rurales",
      text: "Una mirada amplia para viviendas, lotes, campos y activos comerciales.",
    },
  ];

  return (
    <div className="min-h-screen bg-night text-ivory">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(200,169,107,0.16),_transparent_35%),linear-gradient(120deg,rgba(8,23,40,0.96),rgba(8,23,40,0.74))]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center xl:py-28">
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-rose-gold">
                <Sparkles className="h-4 w-4" />
                Negocios inmobiliarios premium
              </div>

              <div className="space-y-6">
                <h1 className="max-w-4xl font-serif text-6xl leading-none md:text-7xl xl:text-[6rem]">
                  Inmobiliaria premium con visión estratégica y atención personalizada.
                </h1>
                <p className="max-w-2xl text-lg leading-9 text-ivory/72">
                  {siteConfig.name} acompaña ventas, compras, alquileres, administración y tasaciones
                  profesionales con una imagen elegante, criterio comercial y atención cercana en Esperanza y la región.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/propiedades"
                  className="inline-flex items-center gap-2 rounded-full bg-champagne px-6 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-night transition hover:brightness-105"
                >
                  Ver propiedades
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.phoneLink}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-ivory transition hover:bg-white/5"
                >
                  Hablar por WhatsApp
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Ubicación", value: "Esperanza, Santa Fe" },
                  { label: "Atención", value: "Personalizada y estratégica" },
                  { label: "Matrícula", value: siteConfig.license },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-rose-gold">{item.label}</p>
                    <p className="mt-3 text-lg text-ivory">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_35px_90px_rgba(0,0,0,0.28)]">
              <div className="aspect-[4/5] rounded-[1.7rem] border border-white/10 bg-[linear-gradient(155deg,rgba(200,169,107,0.18),rgba(11,30,49,0.28)),url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
              <div className="-mt-16 ml-auto max-w-sm rounded-[1.8rem] border border-white/10 bg-night/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-[0.28em] text-champagne">Acompañamiento real</p>
                <h2 className="mt-3 font-serif text-3xl">Operaciones claras, presencia sólida y foco en resultados.</h2>
                <p className="mt-4 text-sm leading-7 text-ivory/70">
                  Una propuesta pensada para dar confianza, ordenar la búsqueda y destacar cada inmueble con criterio.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto -mt-10 max-w-7xl px-5 md:px-8">
          <SearchBar cities={searchMeta.cities} propertyTypes={searchMeta.propertyTypes} />
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 md:grid-cols-3 md:px-8">
          {[
            {
              icon: ShieldCheck,
              title: "Respaldo profesional",
              text: "Cada gestión se apoya en experiencia, claridad operativa y respaldo matriculado.",
            },
            {
              icon: Search,
              title: "Búsqueda y captación",
              text: "Filtrado inteligente, exhibición cuidada y seguimiento comercial para compradores y propietarios.",
            },
            {
              icon: Award,
              title: "Imagen premium",
              text: "Un lenguaje visual sobrio y elegante para comunicar confianza desde el primer contacto.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                <Icon className="h-5 w-5 text-champagne" />
                <h3 className="mt-6 font-serif text-3xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-ivory/70">{item.text}</p>
              </article>
            );
          })}
        </section>

        <section className="mx-auto max-w-7xl space-y-10 px-5 py-12 md:px-8">
          <SectionHeading
            eyebrow="Propiedades destacadas"
            title="Selección destacada para venta y alquiler"
            description="Cada propiedad se presenta con foco en claridad, contexto comercial y una experiencia de navegación simple."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" id="nosotros">
          <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(200,169,107,0.08),rgba(255,255,255,0.02))] p-5">
              <div className="aspect-[4/5] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(200,169,107,0.06),rgba(255,255,255,0.02)),url('/brand/cardinal-emblem.svg')] bg-cover bg-center" />
            </div>

            <div className="space-y-8">
              <SectionHeading
                eyebrow="Nosotros"
                title="Cardinal es una inmobiliaria pensada para orientar decisiones con confianza."
                description="Construimos una presencia profesional, elegante y cercana para acompañar operaciones urbanas y rurales con mirada estratégica."
              />

              <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-5 lg:grid-cols-[0.82fr_1.18fr]">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white p-3">
                  <Image
                    src="/brand/cci-matricula-378.jpeg"
                    alt="Credencial CCI de Natalia Alicia Rossler, matrícula 378"
                    width={900}
                    height={675}
                    className="h-full w-full rounded-[1rem] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4 rounded-[1.5rem] border border-white/10 bg-black/15 p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-champagne">Respaldo institucional</p>
                  <h3 className="font-serif text-3xl text-ivory">Matrícula profesional activa y aval del colegio inmobiliario.</h3>
                  <p className="text-sm leading-8 text-ivory/72">
                    Sumamos esta credencial para reforzar la confianza, la formalidad y el respaldo profesional
                    que acompañan cada operación de Cardinal Negocios Inmobiliarios.
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-gold">
                    C. I. Rossler, Natalia Alicia - Mat. N° 378
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                  <article key={service.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                    <h3 className="font-serif text-2xl">{service.title}</h3>
                    <p className="mt-3 text-sm leading-8 text-ivory/70">{service.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionHeading
            eyebrow="Nuestra forma de trabajar"
            title="Una propuesta pensada para generar confianza desde el primer contacto"
            description="Combinamos presencia profesional, respuestas ágiles y un trato humano para acompañar mejor cada operación."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              "Acompañamiento personalizado para quienes venden, compran o alquilan con expectativas claras.",
              "Comunicación directa, asesoramiento profesional y seguimiento cercano en cada instancia.",
              "Una imagen sobria y confiable para potenciar propiedades y construir relaciones duraderas.",
            ].map((quote, index) => (
              <blockquote key={quote} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                <p className="text-lg leading-9 text-ivory/78">“{quote}”</p>
                <footer className="mt-6 text-xs uppercase tracking-[0.28em] text-rose-gold">Valor {index + 1}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="grid gap-10 xl:grid-cols-[1fr_0.9fr] xl:items-start">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Contacto"
                title="Conversemos sobre tu próxima operación inmobiliaria."
                description="Estamos en Esperanza para ayudarte con ventas, compras, alquileres, administración y tasaciones con una mirada profesional."
              />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-rose-gold">Dirección</p>
                  <p className="mt-3 text-base leading-8 text-ivory/75">{siteConfig.address}</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-rose-gold">WhatsApp</p>
                  <p className="mt-3 text-base leading-8 text-ivory/75">{siteConfig.phoneDisplay}</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <iframe src={siteConfig.mapEmbed} title="Ubicación de la inmobiliaria" width="100%" height="460" loading="lazy" className="w-full" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
