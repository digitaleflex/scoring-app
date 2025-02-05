import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const day = searchParams.get("day");
    
    let scores;
    if (day) {
      scores = await prisma.score.findMany({
        where: { day: new Date(day) },
        include: { participant: true },
      });
    } else {
      scores = await prisma.score.findMany({
        include: { participant: true },
      });
    }

    return Response.json(scores);
  } catch (error) {
    console.error("Erreur GET scores:", error);
    return Response.json({ error: "Erreur lors de la récupération des scores" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { participantId, value, day } = await req.json();
    if (!participantId || !value || !day) {
      return Response.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const score = await prisma.score.create({
      data: { participantId, value: parseInt(value), day: new Date(day) },
    });

    return Response.json(score);
  } catch (error) {
    console.error("Erreur POST score:", error);
    return Response.json({ error: "Erreur lors de l'ajout du score" }, { status: 500 });
  }
}
