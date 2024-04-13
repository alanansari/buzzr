import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { redirect } from "next/navigation"
import ShowMedia from "./ShowMediaComp";
import { MdDeleteOutline } from "react-icons/md";
import { revalidatePath } from "next/cache";

export default async function AllQues(props: { quizId: string }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) redirect("/api/auth/signin");
    const questions = await prisma.question.findMany({
        where: {
            quizId: props.quizId as string,
        },
        include: {
            options: true
        }
    });

    async function handleDeleteQues(formData: FormData) {
        "use server"
        const quesId = formData.get("ques_id") as string;

        await prisma.option.deleteMany({
            where: {
                questionId: quesId,
            },
        });

        await prisma.question.delete({
            where: {
                id: quesId,
            },
        });

        revalidatePath("/quiz/[quizId]");
    }

    return <>
        <div className="flex flex-col justify-between pb-12 pt-4">
            <h2 className="text-2xl mb-4 text-blue-300">All Questions : </h2>
            {questions.length > 0 ? questions.map((ques, index) => {
                return <div key={ques.id} className="relative w-full flex flex-row border-b border-gray-200 my-3">
                    <form action={handleDeleteQues}>
                        <input type="text" className="hidden" name="ques_id" value={ques.id} />
                        <button type="submit"><MdDeleteOutline size={24} className="absolute right-1 top-0 cursor-pointer" /></button>
                    </form>
                    <div className="flex flex-col w-1/2">
                        <p className="text-xl mb-2 font-semibold">Question {index + 1}. {ques.title}</p>
                        <p className="text-sm text-gray-300 mb-4">Timeout : {ques.timeOut}</p>
                        {ques.media && <ShowMedia media={ques.media} mediaType={ques.mediaType || ""} />}
                    </div>
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