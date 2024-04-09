"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { resetTimer, setTimer } from "@/state/timer/timerSlice";
import { Socket } from "socket.io-client";
import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";

export default function WaitScreen(params: { currentQues: number, socket: Socket, gameCode: string }) {

    const dispatch = useDispatch()
    const time = useSelector((state: RootState) => state.timer.value)
    const currIndex = useSelector((state: RootState) => state.player.currentIndex)
    const [start, setStart] = useState(false)
    const socket = params.socket

    useEffect(() => {
        if (currIndex != 0) {
            // socket.emit("start-timer")
            const timer = setInterval(() => {
                if (time >= 0) {
                    dispatch(setTimer());
                }
            }, 1000);

            if (time < 0) {
                socket.emit("set-question-index", params.gameCode, currIndex);
                socket.on("get-question-index", () => {
                    dispatch(setScreenStatus(ScreenStatus.question))
                })
            }

            return () => {
                clearInterval(timer);
            };
        }
    }, [time, params.socket,currIndex,dispatch,params.gameCode,socket]);

    function handleSocket() {
        socket.emit("start-timer")
        socket.on("timer-starts", () => {
            console.log("Timer started");
            setStart(true)
            const timer = setInterval(() => {
                if (time >= 0) {
                    dispatch(setTimer());
                }
            }, 1000);

            setTimeout(() => {
                socket.emit("set-question-index", params.gameCode, currIndex);
                dispatch(setScreenStatus(ScreenStatus.question))
            }, 4000);
        })
    }

    return <>
        {currIndex == 0 && <button onClick={() => handleSocket()} className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded" >Start Quiz</button>}
        {(start || currIndex != 0) && <div className="flex flex-col justify-center items-center w-full container h-32 m-auto">
            <span className="overflow-hidden animate-ping text-6xl font-semibold overscroll-none text-[#040]" id="countdown">{time === 0 && 'LESGOOO'}</span>
            <span className="overflow-hidden animate-ping text-6xl font-semibold overscroll-none text-[#040]" id="countdown">{time > 0 && time}</span>
        </div>}
    </>
}