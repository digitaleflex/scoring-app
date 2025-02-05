import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { participantId, value, day } = await req.json();
  const score = await prisma.score.create({
    data: { participantId, value, day: new Date(day) },
  });
  return Response.json(score);
}


