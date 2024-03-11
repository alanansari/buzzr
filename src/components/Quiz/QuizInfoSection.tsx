import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { redirect } from "next/navigation"
import Image from "next/image";

async function QuizInfoSection(props: { quizId: string }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect("/api/auth/signin");
    const quiz = await prisma.quiz.findUnique({
        where: {
            id: props.quizId as string,
        },
    });
    return <>
        <div className="flex flex-row justify-between pb-12 border-dashed border-b">
            <div className="flex flex-col w-full">
                <h2 className="text-3xl mb-4 font-bold">{quiz?.title}</h2>
                <p className="capitalize mb-4">{quiz?.description}</p>
                <p className="text-xl text-gray-200">Number of Questions : <span className="font-semibold text-gray-50">10</span></p>
            </div>
            <div className="w-full">
                <Image src={`${quiz?.thumbnail ? quiz.thumbnail : "/card_placeholder.png"}`}
                    alt="Quiz Thumbnail"
                    width={100}
                    height={100}
                    className="w-3/5 h-auto rounded-md mx-auto"
                />
            </div>
        </div>
    </>
}

export default QuizInfoSection