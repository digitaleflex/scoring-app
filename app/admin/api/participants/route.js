import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const participants = await prisma.participant.findMany({
      include: { scores: true },
    });
    return Response.json(participants);
  } catch (error) {
    console.error("Erreur GET participants:", error);
    return Response.json({ error: "Erreur lors de la récupération des participants" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { name } = await req.json();
    if (!name) {
      return Response.json({ error: "Le nom est requis" }, { status: 400 });
    }

    const participant = await prisma.participant.create({ data: { name } });
    return Response.json(participant);
  } catch (error) {
    console.error("Erreur POST participant:", error);
    return Response.json({ error: "Erreur lors de l'ajout du participant" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const participantId = parseInt(searchParams.get("participantId"));

    if (!participantId) {
      return Response.json({ error: "ID du participant requis" }, { status: 400 });
    }

    await prisma.score.deleteMany({ where: { participantId } });
    await prisma.participant.delete({ where: { id: participantId } });
    return Response.json({ message: "Participant supprimé avec succès" });
  } catch (error) {
    console.error("Erreur DELETE participant:", error);
    return Response.json({ error: "Erreur lors de la suppression du participant" }, { status: 500 });
  }
}
