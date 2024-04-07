"use client"

import { RootState } from '@/state/store';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { optionColors } from "@/utils/optionColors";

export default function QuestionScreen(props: any) {

    const screen = useSelector((state: RootState) => state.adminscreen.screenStatus);
    const { currentQues, quizQuestions } = props
    const allQuestions = quizQuestions?.questions
    const question = allQuestions[currentQues]
    const [time, setTime] = useState(question?.timeOut)
    const dispatch = useDispatch()

    function handleNext() {
        socket.emit("display-result");
        socket.on("displaying-result", () => {
            console.log("Displaying result")
            dispatch(setScreenStatus(ScreenStatus.result))
        })
    }
    const socket = props.socket
    console.log(time)

    return <>
        <div className="flex flex-col items-center m-auto w-full px-4">
            <p className="w-full py-2 px-3 text-2xl text-center bg-white font-semibold rounded max-w-fit capitalize">{allQuestions[currentQues]?.title}</p>

            <div className="absolute right-4 mt-1">
                <button className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded" onClick={handleNext} >Next</button>
            </div>
            <div className="flex w-full justify-between items-center flex-row my-8">
                <Countdown timer={question?.timeOut} setTime={setTime} />
                <span className="rounded-full bg-white w-12 h-12 flex flex-col justify-center items-center">
                    0 <span className="text-[10px] mt-[-5px]"> Ans</span>
                </span>
            </div>

            <div className="absolute bottom-16 w-4/5">
                <div className="grid grid-cols-2 w-full gap-5 h-full">
                    {question.options.length > 0 && question.options.map((opt: any, index: number) => {
                        return <p className={`text-black p-6 rounded shadow ${optionColors[index]}`}>{opt.title}</p>
                    })}
                    {/* <p className="text-black bg-red-500 p-6 rounded shadow flex justify-between items-center flex-row w-full"><span>Option 1</span>
                    <FcApproval size={32} className="font-bold" /> 
                </p> */}
                </div>
            </div>
        </div>
    </>
}

function Countdown(params: { timer: number, setTime: any }) {
    return <div className="">
        <CountdownCircleTimer
            isPlaying
            duration={params?.timer}
            colors={['#004777', '#F7B801', '#A30000']}
            colorsTime={[10, 5, 0]}
            size={60}
            updateInterval={1}
            onUpdate={(remainingTime: number) => params.setTime(remainingTime)}
        >
            {({ remainingTime }) => <span className="text-md">{remainingTime}</span>}
        </CountdownCircleTimer>
    </div>
}

// vertically align components