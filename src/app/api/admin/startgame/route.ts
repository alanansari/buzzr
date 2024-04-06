import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { gameCode } = await req.json();
    const gamesession = await prisma.gameSession.update({
      where: { gameCode: gameCode },
      data: {
        isPlaying: true,
      },
    });
    console.log("api call", gamesession);
    return NextResponse.json({
      success: true,
      message: "Game Started",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      {
        status: 500,
      }
    );
  }
};
