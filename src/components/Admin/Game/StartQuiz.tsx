"use client"

import { useEffect, useState } from "react";
import QuestionScreen from "./QuestionScreen";
import { useDispatch, useSelector } from "react-redux";
import { stopGame } from "@/state/admin/playersSlice";
import { RootState } from "@/state/store";
import { resetTimer, setTimer } from "@/state/timer/timerSlice";

export default function StartQuiz(props: any) {

    const dispatch = useDispatch()
    const time = useSelector((state: RootState) => state.timer.value)
    const socket = props.socket;
    const gameCode = props.gameCode;
    const currentQues = props.currentQues;

    useEffect(() => {
        const timer = setInterval(() => {
            if (time >= 0) {
                dispatch(setTimer());
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [time, socket]);

    useEffect(() => {
        // console.log(typeof socket.emit)
        if (time < 0 && socket) {
            if (typeof socket.emit === "function") {
                socket.emit("set-question-index", gameCode, currentQues);

                socket.on("get-question-index", () => {
                    console.log("yesssss")
                })
            }
            // else
            //     console.log("no")
        }
    }, [time, socket])

    return <>
        {time >= 0 ?
            <div className="flex flex-col justify-center items-center container h-32 m-auto">
                <span className="overflow-hidden animate-ping text-6xl font-semibold overscroll-none text-[#040]" id="countdown">{time === 0 && 'LESGOOO'}</span>
                <span className="overflow-hidden animate-ping text-6xl font-semibold overscroll-none text-[#040]" id="countdown">{time > 0 && time}</span>
            </div> :
            <>
                {/* <button onClick={() => dispatch(resetTimer(3))}>click me</button> */}
                <QuestionScreen {...props} /> </>}
    </>
}

// redux -> question 1 socket -> uski screen

// remove resetTimer and stopGame from redux