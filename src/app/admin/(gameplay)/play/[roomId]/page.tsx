import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import Lobby from "@/components/Admin/Lobby";

async function Play({ params }: { params: { roomId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  const room = await prisma.gameSession.findUnique({
    where: {
      id: params.roomId,
    },
  });

  const players = await prisma.player.findMany({
    where: {
      gameId: params.roomId,
    }
  });

  if (!room)
    throw new Error("Room not found");

  if (room.creatorId !== user?.id)
    throw new Error("Unauthorized");

  // fetch quiz
  const quizQuestions = await prisma.quiz.findUnique({
    where: { id: room?.quizId },
    include: {
      questions: {
        include: {
          options: true
        }
      }
    }
  });

  return (
    <>
      <div className="mx-auto my-4 bg-slate-200 p-2 border rounded-md w-fit flex flex-row">
        <div className="border-r-2 border-slate-400 p-2 text-sm">Join at <br /> buzzr.silive.in</div>
        <div className="p-2 flex flex-col justify-center items-center">Game PIN:<br />
          <span className="text-3xl">{room?.gameCode}</span>
        </div>
      </div>
      <Lobby roomId={params.roomId} userId={user.id} gameCode={room?.gameCode} players={players} quizQuestions={quizQuestions} gameStarted={room?.isPlaying} currentQues={room?.currentQuestion} />
    </>
  )
}

export default Play
