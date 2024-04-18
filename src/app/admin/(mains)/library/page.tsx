import { prisma } from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect("/api/auth/signin");

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    });

    let quizzes = await prisma.quiz.findMany({
        where: {
            userId: user?.id as string,
        },
        include: {
            _count: {
                select: { 
                    questions: true,
                    gameSessions: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <>
            <h1 className="py-10 text-center text-xl">Library</h1>
            <div className="flex flex-col gap-3 px-16 py-2">
                {quizzes.map((quiz) => (
                    <Link
                        href={`/admin/quiz/${quiz.id}`}
                        key={quiz.id}
                        className="h-auto p-2 bg-slate-400 text-slate-950 rounded-md flex"
                    >
                        <Image
                            src={quiz.thumbnail ? quiz.thumbnail : "/card_placeholder.png"}
                            alt={quiz.title}
                            width={100}
                            height={100}
                            className="h-[60px] w-auto rounded-md"
                        />
                        <div className="mx-2 w-full flex items-center justify-center gap-4">
                            <div className="text-md font-bold flex justify-center items-center">Title: {quiz.title}</div>
                            <div className="text-md font-bold flex justify-center items-center">Questions: {quiz._count.questions}</div>
                            <div className="text-md font-bold flex justify-center items-center">Times Played: {quiz._count.gameSessions}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}