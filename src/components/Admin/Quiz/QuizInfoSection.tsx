import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { redirect } from "next/navigation"
import createRoom from "@/actions/CreateRoomAction"
import SubmitButton from "@/components/SubmitButton"
import Image from "next/image";
import Link from "next/link"

async function QuizInfoSection(props: { quizId: string }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect("/api/auth/signin");
    const quiz = await prisma.quiz.findUnique({
        where: {
            id: props.quizId as string,
        },
        include: {
            questions: true,
            gameSessions: {
                orderBy:{
                    createdAt: 'desc'
                }
            }
        }
    });

    const allQuiz = quiz?.gameSessions ? quiz?.gameSessions : [];

    return <>
        <form className="flex flex-row justify-between pb-12 border-dashed border-b" action={createRoom}>
            <div className="flex flex-col w-full">
                <h2 className="text-3xl mb-4 font-bold">{quiz?.title}</h2>
                <p className="capitalize mb-4">{quiz?.description}</p>
                <p className="text-xl text-gray-200">Number of Questions : <span className="font-semibold text-gray-50">{quiz?.questions?.length}</span></p>
                <input type="hidden" name="quizId" value={props.quizId} />
                <SubmitButton text="Host" isQuiz={true} />
                {allQuiz.length > 0 &&
                    <div className="my-2">
                        Previous Game Sessions :
                        <div className="grid grid-cols-2 my-2">
                            {allQuiz?.length > 0 ? allQuiz.map((quiz) => {
                                return <Link key={quiz.id} href={`/admin/quiz/leaderboard/${quiz.id}`}><li className="cursor-pointer text-sm underline text-blue-300 hover:text-blue-400 transition-all mb-1" >{quiz.gameCode}</li>
                                </Link>
                            })
                                : ""}
                        </div>
                    </div>
                }
            </div>
            <div className="w-full">
                <Image src={`${quiz?.thumbnail ? quiz.thumbnail : "/card_placeholder.png"}`}
                    alt="Quiz Thumbnail"
                    width={300}
                    height={300}
                    className="w-3/5 h-auto rounded-md mx-auto"
                />
            </div>
        </form>
    </>
}

export default QuizInfoSection