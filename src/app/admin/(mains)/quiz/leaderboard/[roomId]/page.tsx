import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function QuizLeaderboard({ params }: { params: { roomId: string } }) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect("/api/auth/signin");

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    });

    const leaderboard = await prisma.gameLeaderboard.findMany({
        where: {
            gameSessionId: params?.roomId,
        },
        include: {
            Player: true,
        },
        orderBy: {
            score: "desc",
        },
    });

    return <>
        <div className="flex flex-col items-center m-auto w-full px-4 my-8">
            <p className="w-full py-2 px-3 text-2xl text-center bg-white text-slate-900 font-semibold rounded max-w-fit capitalize">Leaderboard</p>

            <div className="flex flex-col gap-4 my-6">
                {leaderboard?.length > 0 ? leaderboard.map((lead, index) => {
                    return <div key={index} className={`${index === 0 ? "bg-yellow-600 border-none" : index === 1 ? "bg-gray-600 border-none" : index === 2 ? "bg-orange-900 border-none" : "bg-white text-slate-900"} flex justify-between px-4 py-2 flex-row shadow rounded-md border w-[60vw] items-center`}>
                        #{index + 1}
                        <div className="flex flex-row items-center gap-x-2">
                            <Image src={lead.Player.profilePic || "/avatar-1577909_1280.webp"} className="w-12 h-12 rounded-full" width={50} height={50} alt="profile pic" />
                            <p>{lead.Player.name}</p>
                        </div>
                        <p>{lead.score}</p>
                    </div>
                }) : null}

            </div>
        </div>
    </>
}