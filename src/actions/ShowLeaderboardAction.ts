"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export default async function ShowLeaderboard(gameCode: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/api/auth/signin");
  const room = await prisma.gameSession.findUnique({
    where: {
      gameCode: gameCode,
    },
  });
  const leaderboard = await prisma.gameLeaderboard.findMany({
    where: {
      gameSessionId: room?.id,
    },
    include: {
      Player: true,
    },
    orderBy: {
      score: "desc",
    },
  });

  return leaderboard;
}
