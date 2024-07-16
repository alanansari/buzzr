import BasicModal from "@/components/Modal"
import AddQuesForm from "@/components/Admin/Quiz/AddQuesForm"
import AllQues from "@/components/Admin/Quiz/AllQues"
import QuizInfoSection from "@/components/Admin/Quiz/QuizInfoSection"
import { ToastContainer } from "react-toastify"
import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { redirect } from "next/navigation"
import SubmitButton from "@/components/SubmitButton"

async function Quiz({ params }: { params: { quizId: string } }) {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect("/api/auth/signin");
    const quiz = await prisma.quiz.findUnique({
        where: {
            id: params.quizId as string,
        },
        include: {
            questions: true,
            gameSessions: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    return (
        <div className="w-full bg-light-bg dark:bg-dark-bg h-full">
            <div className="text-dark dark:text-white w-full h-full flex">
                <QuizInfoSection quizId={params.quizId} />
                <div className="bg-white dark:bg-dark w-full p-2">
                    <div className="w-[95%] mx-auto my-2 md:hidden">
                        <SubmitButton text="Host quiz" isQuiz={true} error={(quiz?.questions.length === 0)} />
                    </div>
                    <BasicModal btnTitle="+Add Question">
                        <AddQuesForm quizId={params.quizId} />
                    </BasicModal>
                    <AllQues quizId={params.quizId} />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Quiz

