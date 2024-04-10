import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import GameLobby from "@/components/Admin/Game/GameLobby";
import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { roomId: string } }) => {

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
        <div>
            <div className="absolute bottom-0 w-full flex flex-row justify-between bg-black opacity-70 px-4 z-10">
                {/* <button className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded z-20 opacity-100" >End Game</button> */}
                <p className="w-full flex flex-row justify-end px-4 py-2 font-semibold text-white">Game Code: {room?.gameCode}</p>
            </div>

            <GameLobby roomId={params.roomId} userId={user.id} gameCode={room?.gameCode} players={players} quizQuestions={quizQuestions} currentQues={room?.currentQuestion} />

        </div>
    )
}

export default page

// reset redux
