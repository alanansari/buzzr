import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { redirect } from "next/navigation"
import ShowMedia from "./ShowMediaComp";
import { revalidatePath } from "next/cache";
import Image from "next/image";

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

        await prisma.question.delete({
            where: {
                id: quesId,
            },
        });

        revalidatePath("/quiz/[quizId]");
    }

    return <>
        <div className="flex flex-col justify-between h-[90vh] overflow-auto">
            {questions.length > 0 ? questions.map((ques, index) => {
                return <div key={ques.id} className="w-full my-2 flex items-center">
                    {/* <form action={handleDeleteQues}>
                        <input type="text" className="hidden" name="ques_id" value={ques.id} />
                        <button type="submit">Delete</button>
                    </form> */}
                    <div className="p-2 cursor-move">
                        <Image
                            src="/selection-indicator.svg"
                            alt="selection-indicator"
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className="bg-[#f5f5f5] dark:bg-[#3b3c3f] rounded-t-xl w-full">
                        <div className="p-3">
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <p className="text-md font-semibold flex items-center w-[70%] break-words">{index + 1}. {ques.title}</p>
                                    <p className="text-sm text-dark font-black p-1 rounded-md bg-[#dadadd] w-fit">{ques.timeOut} sec</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                {ques?.options?.map((op, index) => {
                                    return (
                                        <p key={index} className="break-word text-md my-2 flex items-center">
                                            {op.isCorrect ? <Image src="/radio-btn-selected.svg" alt="option" width={25} height={25} /> : <Image src="/radio-btn.svg" alt="option" width={25} height={25} />}
                                            <span>{op.title}</span>
                                        </p>)
                                })}
                            </div>
                        </div>
                        <div className="bg-[#ede9fe] p-2 px-3 rounded-b-xl">
                            <div className="flex [&>*]:text-xs [&>*]:font-semibold">
                                <button className="p-1 mr-1 text-red-light">Delete</button>
                                <button className="p-1 text-lprimary mr-1">Edit question</button>
                                {ques.media && <ShowMedia media={ques.media} mediaType={ques.mediaType || ""} />}
                            </div>        
                        </div>
                    </div>
                </div>
            }) : <p>No Questions added</p>}

        </div>
    </>
}