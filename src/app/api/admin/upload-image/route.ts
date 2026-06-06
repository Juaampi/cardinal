import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const CLOUDINARY_UPLOAD_TIMEOUT_MS = 60_000;

async function uploadSingleFile(file: File) {
  const cloudinary = getCloudinary();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    let settled = false;

    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "cardinal/properties",
        resource_type: "image",
      },
      (error, result) => {
        if (settled) return;
        settled = true;

        if (error || !result) {
          reject(error || new Error("No se pudo subir la imagen."));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      upload.destroy(new Error("La subida a Cloudinary tardó demasiado."));
      reject(new Error("La subida a Cloudinary tardó demasiado. Probá con una imagen más liviana."));
    }, CLOUDINARY_UPLOAD_TIMEOUT_MS);

    upload.on("close", () => clearTimeout(timeout));
    upload.on("error", () => clearTimeout(timeout));
    upload.end(buffer);
  });
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary no está configurado. Completá las variables de entorno." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No se recibieron imágenes." }, { status: 400 });
  }

  const oversizedFile = files.find((file) => file.size > MAX_FILE_SIZE_BYTES);

  if (oversizedFile) {
    return NextResponse.json(
      {
        error: `La imagen "${oversizedFile.name}" supera el límite de 10 MB. Reducí el peso e intentá nuevamente.`,
      },
      { status: 400 }
    );
  }

  try {
    const uploads = [];

    for (const file of files) {
      uploads.push(await uploadSingleFile(file));
    }

    return NextResponse.json({ images: uploads });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error inesperado al subir imágenes.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
