import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/shared/logo";
import { destroySession, getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session?.userId) {
    try {
      const user = await prisma.adminUser.findUnique({
        where: { id: session.userId },
      });

      if (user) {
        redirect("/admin");
      }
    } catch {
      // Ignore DB issues here and let the login form render.
    }

    await destroySession();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-night px-5">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
