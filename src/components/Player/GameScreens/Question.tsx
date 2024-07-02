"use client"
import { cssOptionColors } from "@/utils/optionColors";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setScreenStatus, ScreenStatus } from "@/state/player/screenSlice";
import submitAnswerAction from "@/actions/SubmitAnswerAction";
import Image from "next/image";

const Question = (params: {
    question: any,
    gameSessionId: string,
    playerId: string,
    socket: Socket,
    currentQuestion: number,
    quizTitle: string
}) => {
    const options = params.question.options;
    const colors = cssOptionColors;
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(0);
    const [optionId, setOptionId] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("time up")
            dispatch(setScreenStatus(ScreenStatus.result));
        }, params.question.timeOut * 1000);

        const interval = setInterval(() => {
            setTimer(timer + 0.5);
        }, 500);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        }

    }, [dispatch, params.question.timeOut, timer])

    const submitAnswer = (optionId: string) => {
        console.log("submitting answer", optionId);
        setOptionId(optionId)
        // Socket submit Answer
        // params.socket.emit("submit-answer", params.gameSessionId, params.playerId, optionId, timer);
        submitAnswerAction({ gameSessionId: params.gameSessionId, playerId: params.playerId, optionId: optionId, timeTaken: timer });
        dispatch(setScreenStatus(ScreenStatus.wait));
    }

    return (
        <>
            {/* <div className="py-4 px-8 flex justify-between">
                <Image
                    src="/logo.svg"
                    width={80}
                    height={80}
                    alt="Logo"
                />
            </div> */}
            <div className="w-full h-full flex gap-4 py-4 px-8 [&>*]:bg-white dark:[&>*]:bg-dark [&>*]:rounded-xl">
                <div className="hidden md:w-1/3 md:flex flex-col justify-between py-6 px-5">
                    <div className="border-[12px] dark:border-lprimary border-dprimary light: rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                        <span className="font-semibold text-3xl dark:text-white">{params.currentQuestion+1}</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1 rounded-xl dark:bg-opacity-30 bg-opacity-30 bg-red-light dark:bg-red-dark w-fit p-1 py-[2px]">
                            <div className="rounded-full w-3 h-3 bg-red-600"></div>
                            <p className="text-xs text-red-light dark:text-red-dark">Live</p>
                        </div>
                        <p className="font-extrabold mt-2 mb-4 dark:text-white capitalize text-xl">{params.quizTitle}</p>
                        <p className="dark:text-white mb-1">Quiz by</p>

                        <div className="flex gap-2 items-center">
                            <Image
                                src="/SI.svg"
                                width={48}
                                height={48}
                                alt="Logo"
                            />
                            <p className="dark:text-white">SDC-SI</p>
                        </div>
                    </div>
                </div>
                <div className="w-full p-6 flex flex-col">
                    {params.question.mediaType === "image" && <Image src={params.question.media} className="md:h-[35vh] mb-10 mx-auto" alt="media Image" height={300} width={500} />}
                    <p className="dark:text-white">Question</p>
                    <p className="font-bold text-2xl dark:text-white">{params.question.title}</p>

                    <div className={`grid grid-cols-1 ${params.question.mediaType === "image" && "lg:grid-cols-2 my-2"} gap-x-4 my-4`}>
                        {options.map((option: any, index: number) => {
                            return (
                                <div key={option.id} className={`cursor-pointer p-4 rounded-xl text-lg dark:text-white mt-4 capitalize ${option.id === optionId ? "dark:bg-dprimary bg-lprimary" : "bg-light-bg dark:bg-[#434349]"}`} onClick={() => { submitAnswer(option.id) }}>{index + 1}. {option.title}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Question