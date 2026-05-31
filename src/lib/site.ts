export const siteConfig = {
  name: "Cardinal Negocios Inmobiliarios",
  shortName: "Cardinal",
  phoneDisplay: "+54 3496 53-0870",
  phoneLink: "543496530870",
  whatsappMessage:
    "Hola, quiero consultar por una propiedad de Cardinal Negocios Inmobiliarios.",
  address: "Avda. Córdoba 2653, Ciudad Esperanza, Provincia de Santa Fe",
  license: "CCI N° 378",
  mapEmbed:
    "https://www.google.com/maps?q=Avda.%20C%C3%B3rdoba%202653%2C%20Esperanza%2C%20Santa%20Fe%2C%20Argentina&output=embed",
  email: "natirossler9@gmail.com",
  instagramHandle: "@cardinal_negocios_inmobiliario",
  instagramUrl: "https://www.instagram.com/cardinal_negocios_inmobiliario",
  facebookName: "Cardinal Negocios Inmobiliarios",
  facebookUrl: "https://www.facebook.com/Cardinal%20Negocios%20Inmobiliarios",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Venta", href: "/propiedades?operationType=SALE" },
  { label: "Alquiler", href: "/propiedades?operationType=RENT" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

export const operationLabels = {
  SALE: "Venta",
  RENT: "Alquiler",
} as const;

export const propertyTypeLabels = {
  HOUSE: "Casa",
  APARTMENT: "Departamento",
  LAND: "Lote",
  COMMERCIAL: "Local",
  OFFICE: "Oficina",
  COUNTRY_HOUSE: "Casaquinta",
  WAREHOUSE: "Galpón",
} as const;

export const propertyStatusLabels = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservado",
  SOLD: "Vendido",
  RENTED: "Alquilado",
  DRAFT: "Borrador",
} as const;
