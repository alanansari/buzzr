"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { resetTimer, setTimer } from "@/state/timer/timerSlice";
import { Socket } from "socket.io-client";

export default function WaitScreen(params: { currentQues: number, socket: Socket }) {

    const dispatch = useDispatch()
    const time = useSelector((state: RootState) => state.timer.value)
    const [start, setStart] = useState(false)
    const currIndex = useSelector((state: RootState) => state.player.currentIndex)
    console.log(currIndex)
    useEffect(() => {
        if (start || currIndex != 0) {
            const timer = setInterval(() => {
                if (time >= 0) {
                    dispatch(setTimer());
                }
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [time, params.socket, start]);

    function handleSocket() {
        // dispatch(resetTimer(3))
        params.socket.emit("start-timer")
        params.socket.on("timer-starts", () => {
            console.log("Timer started")
            setStart(true)
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