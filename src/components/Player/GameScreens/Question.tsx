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
    socket: Socket
}) => {
    const options = params.question.options;
    const colors = cssOptionColors;
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(0);

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
        // Socket submit Answer
        // params.socket.emit("submit-answer", params.gameSessionId, params.playerId, optionId, timer);
        submitAnswerAction({ gameSessionId: params.gameSessionId, playerId: params.playerId, optionId: optionId, timeTaken: timer });
        dispatch(setScreenStatus(ScreenStatus.wait));
    }

    return (
        <>
            <div className="bg-slate-200 text-slate-800 p-4 rounded-md font-semibold text-xl">{params.question.title}</div>
            {params.question.mediaType === "image" && <Image src={params.question.media} className="h-[20vh] mt-6 mb-0" alt="media Image" height={300} width={300} />
            }
            <div className="mt-6 w-[85vw]">
                {options.map((option: any, index: number) => {
                    return (
                        <div key={option.id} className="p-4 rounded-md font-semibold text-xl mt-3" style={{ backgroundColor: colors[index] }} onClick={() => { submitAnswer(option.id) }}>{option.title}</div>
                    )
                })}
            </div>
        </>
    )
}

export default Question