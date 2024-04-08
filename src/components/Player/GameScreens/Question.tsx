"use client"
import { optionColors } from "@/utils/optionColors";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setScreenStatus, ScreenStatus } from "@/state/player/screenSlice";

const Question = (params:{
    question: any,
    gameSessionId: string,
    playerId: string,
    socket: Socket
}) => {
    const options = params.question.options;
    const colors = optionColors;
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
        params.socket.emit("submit-answer", params.gameSessionId, params.playerId, optionId, timer);
        dispatch(setScreenStatus(ScreenStatus.wait));
    }

    return (
        <>
        <div className="bg-slate-200 p-4 rounded-md font-semibold text-xl">{params.question.title}</div>
        <div className="mt-6 w-full">
            {options.map((option: any, index: number) => {
                return (
                    <div key={option.id} className={`${colors[index]} p-4 rounded-md font-semibold text-xl mt-1`} onClick={()=>{submitAnswer(option.id)}}>{option.title}</div>
                )
            })}
        </div>
        </>
    )
}

export default Question