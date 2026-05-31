import { Prisma, PropertyStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const propertyInclude = {
  images: {
    orderBy: { sortOrder: "asc" as const },
  },
  author: true,
} satisfies Prisma.PropertyInclude;

type PublicProperty = {
  id: string;
  title: string;
  description: string;
  price: number;
  operationType: string;
  propertyType: string;
  address: string;
  city: string;
  province: string;
  latitude: number | null;
  longitude: number | null;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  garage: number | null;
  coveredArea: number | null;
  totalArea: number | null;
  status: string;
  featured: boolean;
  videoUrl: string;
  seoSlug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  images: Array<{ id: string; url: string; alt: string | null; isFeatured: boolean; sortOrder: number }>;
};

const demoProperties: PublicProperty[] = [
  {
    id: "demo-house",
    title: "Casa familiar con patio y galería en Esperanza",
    description:
      "Una propiedad luminosa y funcional, ideal para quienes buscan comodidad, buena distribución y una ubicación urbana consolidada.",
    price: 178000,
    operationType: "SALE",
    propertyType: "HOUSE",
    address: "Barrio centro norte",
    city: "Esperanza",
    province: "Santa Fe",
    latitude: -31.4478,
    longitude: -60.9317,
    rooms: 6,
    bedrooms: 3,
    bathrooms: 2,
    garage: 2,
    coveredArea: 198,
    totalArea: 420,
    status: "AVAILABLE",
    featured: true,
    videoUrl: "",
    seoSlug: "casa-familiar-patio-galeria-esperanza",
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
        alt: "Casa familiar en Esperanza",
        isFeatured: true,
        sortOrder: 0,
      },
      {
        id: "img-2",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
        alt: "Interior de la propiedad",
        isFeatured: false,
        sortOrder: 1,
      },
    ],
  },
  {
    id: "demo-field",
    title: "Fracción rural con excelente acceso en la región",
    description:
      "Una alternativa ideal para producción, resguardo patrimonial o desarrollo, con entorno abierto y conectividad estratégica.",
    price: 215000,
    operationType: "SALE",
    propertyType: "LAND",
    address: "Corredor rural oeste",
    city: "Esperanza",
    province: "Santa Fe",
    latitude: -31.4201,
    longitude: -60.9724,
    rooms: null,
    bedrooms: null,
    bathrooms: null,
    garage: null,
    coveredArea: null,
    totalArea: 12500,
    status: "AVAILABLE",
    featured: true,
    videoUrl: "",
    seoSlug: "fraccion-rural-acceso-region",
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [
      {
        id: "img-3",
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
        alt: "Fracción rural",
        isFeatured: true,
        sortOrder: 0,
      },
    ],
  },
];

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.DIRECT_URL);
}

function normalizeProperty(property: {
  id: string;
  title: string;
  description: string;
  price: Prisma.Decimal | string;
  operationType: string;
  propertyType: string;
  address: string;
  city: string;
  province: string;
  latitude?: Prisma.Decimal | string | null;
  longitude?: Prisma.Decimal | string | null;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  garage: number | null;
  coveredArea: number | null;
  totalArea: number | null;
  status: string;
  featured: boolean;
  videoUrl: string | null;
  seoSlug: string;
  publishedAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  images: Array<{ id: string; url: string; alt: string | null; isFeatured: boolean; sortOrder: number }>;
}): PublicProperty {
  return {
    id: property.id,
    title: property.title,
    description: property.description,
    price: Number(property.price),
    operationType: property.operationType,
    propertyType: property.propertyType,
    address: property.address,
    city: property.city,
    province: property.province,
    latitude: property.latitude ? Number(property.latitude) : null,
    longitude: property.longitude ? Number(property.longitude) : null,
    rooms: property.rooms,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    garage: property.garage,
    coveredArea: property.coveredArea,
    totalArea: property.totalArea,
    status: property.status,
    featured: property.featured,
    videoUrl: property.videoUrl || "",
    seoSlug: property.seoSlug,
    publishedAt: new Date(property.publishedAt).toISOString(),
    createdAt: new Date(property.createdAt).toISOString(),
    updatedAt: new Date(property.updatedAt).toISOString(),
    images: property.images,
  };
}

export async function getFeaturedProperties() {
  if (!isDatabaseConfigured()) {
    return demoProperties;
  }

  try {
    const properties = await prisma.property.findMany({
      where: {
        featured: true,
        status: { not: PropertyStatus.DRAFT },
      },
      include: propertyInclude,
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      take: 6,
    });

    return properties.map(normalizeProperty);
  } catch {
    return demoProperties;
  }
}

type PropertyFilters = {
  q?: string;
  city?: string;
  operationType?: string;
  propertyType?: string;
  featured?: boolean;
};

export async function getProperties(filters: PropertyFilters = {}) {
  if (!isDatabaseConfigured()) {
    return demoProperties.filter((property) => {
      const matchesQuery = filters.q
        ? `${property.title} ${property.city} ${property.address}`.toLowerCase().includes(filters.q.toLowerCase())
        : true;
      const matchesCity = filters.city ? property.city.toLowerCase() === filters.city.toLowerCase() : true;
      const matchesOperation = filters.operationType ? property.operationType === filters.operationType : true;
      const matchesType = filters.propertyType ? property.propertyType === filters.propertyType : true;

      return matchesQuery && matchesCity && matchesOperation && matchesType;
    });
  }

  const where: Prisma.PropertyWhereInput = {
    status: { not: PropertyStatus.DRAFT },
    ...(filters.featured ? { featured: true } : {}),
    ...(filters.operationType ? { operationType: filters.operationType as never } : {}),
    ...(filters.propertyType ? { propertyType: filters.propertyType as never } : {}),
    ...(filters.city ? { city: { equals: filters.city, mode: "insensitive" } } : {}),
    ...(filters.q
      ? {
          OR: [
            { title: { contains: filters.q, mode: "insensitive" } },
            { city: { contains: filters.q, mode: "insensitive" } },
            { address: { contains: filters.q, mode: "insensitive" } },
            { description: { contains: filters.q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  try {
    const properties = await prisma.property.findMany({
      where,
      include: propertyInclude,
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    });

    return properties.map(normalizeProperty);
  } catch {
    return demoProperties;
  }
}

export async function getPropertyBySlug(slug: string) {
  if (!isDatabaseConfigured()) {
    return demoProperties.find((property) => property.seoSlug === slug) || null;
  }

  try {
    const property = await prisma.property.findUnique({
      where: { seoSlug: slug },
      include: {
        ...propertyInclude,
        inquiries: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return property ? normalizeProperty(property) : null;
  } catch {
    return demoProperties.find((property) => property.seoSlug === slug) || null;
  }
}

export async function getAdminPropertyById(id: string) {
  if (!isDatabaseConfigured()) return null;

  const property = await prisma.property.findUnique({
    where: { id },
    include: propertyInclude,
  });

  return property ? normalizeProperty(property) : null;
}

export async function getDashboardStats() {
  if (!isDatabaseConfigured()) {
    return {
      properties: demoProperties.length,
      inquiries: 0,
      featured: demoProperties.filter((item) => item.featured).length,
      available: demoProperties.filter((item) => item.status === "AVAILABLE").length,
    };
  }

  const [properties, inquiries, featured, available] = await Promise.all([
    prisma.property.count(),
    prisma.inquiry.count(),
    prisma.property.count({ where: { featured: true } }),
    prisma.property.count({ where: { status: PropertyStatus.AVAILABLE } }),
  ]);

  return { properties, inquiries, featured, available };
}

export async function getRecentInquiries() {
  if (!isDatabaseConfigured()) return [];

  return prisma.inquiry.findMany({
    include: {
      property: true,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function getAdminUsers() {
  if (!isDatabaseConfigured()) return [];

  return prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getSearchMeta() {
  const properties = await getProperties();
  const cities = [...new Set(properties.map((property) => property.city))].sort();
  const propertyTypes = [...new Set(properties.map((property) => property.propertyType))].sort();

  return { cities, propertyTypes };
}

export function ensureSlug(input: string, fallback: string) {
  return slugify(input) || slugify(fallback);
}
