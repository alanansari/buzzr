"use client"

import Link from "next/link";
import CreateAIQuiz from "../Gemini/CreateAIQuiz";
import ClientImage from "@/components/ClientImage";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

export default function ClientBuzzr({ quizzes }: { quizzes: any }) {

    const view = useSelector((state: RootState) => state.gridListToggle.view)
    const className = view === "grid" ? "w-11 h-11" : "w-6 h-6";

    return <>
        <div className={`flex ${view === "list" ? "flex-col" : "flex-row flex-wrap"} gap-3 w-full mt-4 md:max-h-[70vh] overflow-y-auto`}>
            <Link
                href="/admin/quiz/createQuiz"
                className={` border border-[#c2b4fe] dark:border-transparent w-full bg-card-light hover:bg-cardhover-light dark:bg-card-dark hover:dark:bg-cardhover-dark text-dark dark:text-white rounded flex justify-center items-center ${view === "list" ? "md:w-full flex-row py-4 px-2" : "p-2 flex-col md:w-40 h-[50vh] md:h-44"}`}
            >
                <div className="h-full w-full flex gap-x-4 justify-center items-center">
                    <ClientImage
                        props={{
                            src: "/add.svg",
                            darksrc: "/add-dark.svg",
                            alt: "Create Quiz",
                            width: 45,
                            height: 45,
                            classname: className
                        }}
                    />

                    {view === "list" && <div className="text-base font-bold w-full">Create a new quiz</div>}
                </div>
                {view === "grid" && <div className="text-xs font-bold w-full">Create a new quiz</div>}
                <div className={`${view === "grid" ? "text-xs" : "text-base"} w-full`}>Build from the ground up</div>
            </Link>
            <Link
                href="#"
                className={` border border-[#c2b4fe] dark:border-transparent w-full bg-card-light hover:bg-cardhover-light dark:bg-card-dark hover:dark:bg-cardhover-dark text-dark dark:text-white rounded flex justify-center items-center ${view === "list" ? "md:w-full flex-row py-4 px-2" : "p-2 flex-col md:w-40 h-[50vh] md:h-44"}`}
            >
                <div className="h-full w-full flex gap-x-4 justify-center items-center">
                    <ClientImage
                        props={{
                            src: "/download.svg",
                            darksrc: "/download-dark.svg",
                            alt: "Import Quiz",
                            width: 45,
                            height: 45,
                            classname: className

                        }}
                    />
                    {view === "list" && <div className="text-base font-bold w-full">Import an existing quiz</div>}
                </div>
                {view === "grid" && <div className="text-xs font-bold w-full">Import an existing quiz</div>}
                <div className={`${view === "grid" ? "text-xs" : "text-base"} w-full`}>Coming soon...</div>
            </Link>
            <CreateAIQuiz />
            {quizzes.map((quiz: any) => (
                <Link
                    href={`/admin/quiz/${quiz.id}`}
                    key={quiz.id}
                    className={` border border-[#c2b4fe] dark:border-transparent w-full bg-card-light hover:bg-cardhover-light dark:bg-card-dark hover:dark:bg-cardhover-dark text-dark dark:text-white rounded flex items-center ${view === "list" ? "md:w-full flex-row py-4 px-2" : "p-2 flex-col md:w-40 h-[50vh] md:h-44"}`}
                >
                    <h2 className="text-md font-bold dark:text-white w-full">{quiz.title}</h2>
                    <p className={` ${view === "grid" ? "text-xs" : "text-base"} w-full text-off-dark dark:text-off-white`}>{quiz.description}</p>
                </Link>
            ))}
        </div>
    </>
}