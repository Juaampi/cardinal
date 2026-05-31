"use server";

import { redirect } from "next/navigation";
import { comparePassword, createSession, destroySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators";

export type ActionState = {
  success?: boolean;
  error?: string;
};

export async function loginAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Revisá tus datos." };
  }

  let user;

  try {
    user = await prisma.adminUser.findUnique({
      where: { email: parsed.data.email },
    });
  } catch {
    return { error: "No pudimos conectar con la base de datos. Reiniciá el servidor local e intentá nuevamente." };
  }

  if (!user) {
    return { error: "No encontramos un usuario con ese email." };
  }

  const isValid = await comparePassword(parsed.data.password, user.passwordHash);

  if (!isValid) {
    return { error: "La contraseña es incorrecta." };
  }

  try {
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
  } catch {
    return { error: "La sesión no pudo iniciarse por un problema de base de datos. Reiniciá el servidor local e intentá nuevamente." };
  }

  await createSession({
    userId: user.id,
    role: user.role,
    email: user.email,
  });

  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
