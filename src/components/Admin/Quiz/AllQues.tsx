"use client"

import ShowMedia from "./ShowMediaComp";
import Image from "next/image";
import AddQuesForm from "./AddQuesForm";
import BasicModal from "@/components/Modal";
import dltQuestion from "@/actions/DltQuesAction";
import { toast } from "react-toastify";
import { useEffect, useState } from "react"
import getAllQuestion from "@/actions/GetAllQues"
import reOrderQuestion from "@/actions/ReorderQuesAction";

export default function AllQues(props: { quizId: string }) {

    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {
        async function fetchQues() {
            try {
                const result: any = await getAllQuestion(props.quizId);
                if (result.status == 200) {
                    setQuestions(result.questions)
                }
            }
            catch (err) {
            }
        }
        fetchQues()
    }, [props.quizId])

    async function clientDltAction(formData: FormData) {
        const result = await dltQuestion(formData);
        if (result?.error) {
            const errorMsg = result.error || "Something went wrong";
            toast.error(errorMsg)
        } else {
            toast.success("Question deleted successfully")
        }
    }

    const [dragId, setDragId] = useState("");

    const handleDrag = (ev: any) => {
        setDragId(ev.currentTarget.id);
    };

    const handleDrop = async (ev: any) => {

        const dropId = ev.currentTarget?.id;
        reOrderQuestion({
            dragQuesId: dragId,
            dropQuesId: dropId
        });
        // if (result?.status == 200) {

            const dragBox = questions.find((box: any) => box?.id === dragId);
            const dropBox = questions.find((box: any) => box.id === dropId);

            const dragBoxOrder = dragBox?.order;
            const dropBoxOrder = dropBox?.order;

            const newBoxState = questions.map((box: any) => {
                if (box.id === dragId) {
                    box.order = dropBoxOrder;
                }
                if (box.id === dropId) {
                    box.order = dragBoxOrder;
                }
                return box;
            });

            setQuestions(newBoxState);
        // }
    };

    return <>
        <div className="flex flex-col w-full h-[73vh] overflow-auto overflow-x-hidden">
            {questions.length > 0 ? questions.sort((a, b) => a.order - b.order).map((ques: any, index) => {
                return <div
                    key={ques?.id} className="w-full my-2 flex items-center"
                    draggable
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                    id={ques?.id}
                >
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
                                    <p className="text-md font-semibold flex items-center w-[70%] break-words">{ques?.order}. {ques?.title}</p>
                                    <p className="text-sm text-dark font-black p-1 rounded-md bg-[#dadadd] dark:text-white dark:bg-transparent w-fit">{ques?.timeOut} sec</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:grid md:grid-cols-4">
                                {ques?.options?.map((op: any, index: number) => {
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
                                <form action={clientDltAction}>
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