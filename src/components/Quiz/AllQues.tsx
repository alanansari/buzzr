import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { redirect } from "next/navigation"

export default async function AllQues(props: { quizId: string }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect("/api/auth/signin");
    const questions = await prisma.question.findMany({
        where: {
            quizId: props.quizId as string,
        },
        // populate the options array for each question 
        include: {
            options: true 
        }
    });

    console.log(questions)
    return <>
        <div className="flex flex-col justify-between pb-12 pt-4">
            <h2 className="text-2xl mb-4 text-blue-300">All Questions : </h2>
            {questions.length > 0 ? questions.map((ques, index) => {
                return <div key={ques.id} className="w-full flex flex-row border-b border-gray-200 my-3">
                    <p className="text-xl mb-4 font-semibold w-1/2">Question {index+1}. {ques.title}</p>
                    <div className="grid grid-cols-2 w-1/2">
                        {ques?.options?.map((op, index) => {
                            return <p key={index} className="block text-lg my-2">Option {index + 1}: {op.title} <br /></p>
                        })}

                        <p className="my-2"><span className="font-semibold text-blue-400">Correct Option: </span>{ques?.options?.map((op) => {
                            if (op.isCorrect === true)
                                return op.title
                        })}</p>
                    </div>
                </div>
            }) : <p>No Questions added</p>}

        </div>
    </>
}