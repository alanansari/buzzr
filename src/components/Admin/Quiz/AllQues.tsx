import { prisma } from "@/utils/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { redirect } from "next/navigation"
import ShowMedia from "./ShowMediaComp";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import AddQuesForm from "./AddQuesForm";
import BasicModal from "@/components/Modal";

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
        <div className="flex flex-col w-full h-[73vh] overflow-auto overflow-x-hidden">
            {questions.length > 0 ? questions.map((ques, index) => {
                return <div
                    key={ques.id} className="w-full my-2 flex items-center"
                    draggable
                >
                    {/* <form action={handleDeleteQues}>
                        <input type="text" className="hidden" name="ques_id" value={ques.id} />
                        <button className="p-1 mr-1 text-red-light hover:bg-[#fccccc] rounded-md">Delete</button>
                    </form> */}
                    <div className="p-2 cursor-grab hidden md:block">
                        <Image
                            src="/selection-indicator.svg"
                            alt="selection-indicator"
                            width={20}
                            height={20}
                            draggable="false"
                        />
                    </div>
                    <div className="bg-[#f5f5f5] dark:bg-[#3b3c3f] rounded-xl w-full">
                        <div className="p-3">
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <p className="text-md font-semibold flex items-center w-[70%] break-words">{index + 1}. {ques.title}</p>
                                    <p className="text-sm text-dark font-black p-1 rounded-md bg-[#dadadd] dark:text-white dark:bg-transparent w-fit">{ques.timeOut} sec</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:grid md:grid-cols-4">
                                {ques?.options?.map((op, index) => {
                                    return (
                                        <p key={index} className="break-word text-md my-2 flex items-center">
                                            {op.isCorrect ? <Image src="/radio-btn-selected.svg" alt="option" width={25} height={25} /> : <Image src="/radio-btn.svg" alt="option" width={25} height={25} />}
                                            <span>{op.title}</span>
                                        </p>)
                                })}
                            </div>
                        </div>
                        <div className="bg-[#ede9fe] dark:bg-[#332d40] p-2 px-3 rounded-b-xl">
                            <div className="flex [&>*]:text-xs [&>*]:font-semibold">
                                <form action={handleDeleteQues}>
                                    <input type="text" className="hidden" name="ques_id" value={ques.id} />
                                    <button className="p-1 mr-1 text-red-light hover:bg-[#fccccc] rounded-md">Delete</button>
                                </form>
                                <BasicModal isEdit={true} btnTitle="Edit Question">
                                    <AddQuesForm quizId={props.quizId} question={ques} />
                                </BasicModal>
                                {ques.media && <ShowMedia media={ques.media} mediaType={ques.mediaType || ""} />}
                            </div>
                        </div>
                    </div>
                </div>
            }) :
                <div className="border-2 border-gray rounded-2xl border-dashed w-[95%] p-6 py-16 mt-8 mx-auto flex flex-col justify-center items-center">
                    <div className="w-full py-2 flex justify-center">
                        <Image
                            src="/no-questions.svg"
                            alt="no-questions"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="font-black text-lg">No Questions Added Yet!</div>
                    <div className="text-md w-[40%] text-center">It looks like there are no questions for this quiz. Start adding questions to engage your students and make learning fun!</div>
                </div>
            }

        </div>
    </>
}