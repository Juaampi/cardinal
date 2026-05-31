import "dotenv/config";
import { PrismaClient, OperationType, PropertyStatus, PropertyType, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || "CardinalAdmin1234!", 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: process.env.SEED_ADMIN_EMAIL || "natirossler9@gmail.com" },
    update: {
      fullName: "Administración Cardinal",
      passwordHash,
      role: UserRole.SUPERADMIN,
    },
    create: {
      fullName: "Administración Cardinal",
      email: process.env.SEED_ADMIN_EMAIL || "natirossler9@gmail.com",
      passwordHash,
      role: UserRole.SUPERADMIN,
    },
  });

  const properties = [
    {
      title: "Casa familiar con patio y galería en Esperanza",
      seoSlug: "casa-familiar-patio-galeria-esperanza",
      description:
        "Propiedad luminosa y funcional, con ambientes amplios, patio verde y una distribución ideal para vida familiar.",
      price: "178000",
      operationType: OperationType.SALE,
      propertyType: PropertyType.HOUSE,
      address: "Barrio centro norte",
      city: "Esperanza",
      province: "Santa Fe",
      latitude: "-31.4478",
      longitude: "-60.9317",
      rooms: 6,
      bedrooms: 3,
      bathrooms: 2,
      garage: 2,
      coveredArea: 198,
      totalArea: 420,
      featured: true,
      status: PropertyStatus.AVAILABLE,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      title: "Departamento céntrico en alquiler con balcón",
      seoSlug: "departamento-centrico-alquiler-balcon",
      description:
        "Unidad práctica y cálida, ideal para quienes buscan cercanía, luz natural y una experiencia de alquiler ágil.",
      price: "650000",
      operationType: OperationType.RENT,
      propertyType: PropertyType.APARTMENT,
      address: "Centro de Esperanza",
      city: "Esperanza",
      province: "Santa Fe",
      latitude: "-31.4486",
      longitude: "-60.9303",
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      garage: 1,
      coveredArea: 74,
      totalArea: 86,
      featured: true,
      status: PropertyStatus.AVAILABLE,
      videoUrl: null,
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      title: "Fracción rural con excelente acceso en la región",
      seoSlug: "fraccion-rural-acceso-region",
      description:
        "Una alternativa con potencial productivo, resguardo de valor y acceso conveniente para proyectos futuros.",
      price: "215000",
      operationType: OperationType.SALE,
      propertyType: PropertyType.LAND,
      address: "Corredor rural oeste",
      city: "Esperanza",
      province: "Santa Fe",
      latitude: "-31.4201",
      longitude: "-60.9724",
      rooms: null,
      bedrooms: null,
      bathrooms: null,
      garage: null,
      coveredArea: null,
      totalArea: 12500,
      featured: false,
      status: PropertyStatus.AVAILABLE,
      videoUrl: null,
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ];

  for (const property of properties) {
    await prisma.property.upsert({
      where: { seoSlug: property.seoSlug },
      update: {
        ...property,
        images: {
          deleteMany: {},
          create: property.images.map((url, index) => ({
            url,
            alt: property.title,
            sortOrder: index,
            isFeatured: index === 0,
          })),
        },
      },
      create: {
        title: property.title,
        seoSlug: property.seoSlug,
        description: property.description,
        price: property.price,
        operationType: property.operationType,
        propertyType: property.propertyType,
        address: property.address,
        city: property.city,
        province: property.province,
        latitude: property.latitude,
        longitude: property.longitude,
        rooms: property.rooms,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        garage: property.garage,
        coveredArea: property.coveredArea,
        totalArea: property.totalArea,
        featured: property.featured,
        status: property.status,
        videoUrl: property.videoUrl,
        authorId: admin.id,
        images: {
          create: property.images.map((url, index) => ({
            url,
            alt: property.title,
            sortOrder: index,
            isFeatured: index === 0,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
