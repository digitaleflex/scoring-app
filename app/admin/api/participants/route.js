import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const participants = await prisma.participant.findMany({
    include: { scores: true },
  });
  return Response.json(participants);
}

export async function POST(req) {
  const { name } = await req.json();
  const participant = await prisma.participant.create({ data: { name } });
  return Response.json(participant);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const participantId = parseInt(searchParams.get("participantId"));
  await prisma.score.deleteMany({ where: { participantId } });
  await prisma.participant.delete({ where: { id: participantId } });
  return Response.json({ message: "Participant supprimé" });
}
