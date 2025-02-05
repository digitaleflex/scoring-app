import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return Response.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const existingUser = await prisma.admin.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "Cet email est déjà utilisé" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.admin.create({
      data: { username, email, password: hashedPassword },
    });

    return Response.json({ message: "Compte créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
