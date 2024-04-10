"use client"

import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { BarPlot, ChartContainer } from "@mui/x-charts";
import { useEffect } from "react";
import { FcCheckmark, FcApproval } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { optionColors } from "@/utils/optionColors"
import { Option } from "@prisma/client";
import { RootState } from "@/state/store";
import { setLeaderboard } from "@/state/admin/playersSlice";

export default function QuesResult(props: any) {
    const { currentQues, quizQuestions, gameCode } = props
    const dispatch = useDispatch()
    const currIndex = useSelector((state: RootState) => state.player.currentIndex)
    const allQuestions = quizQuestions?.questions
    const question = allQuestions[currIndex]
    const result = useSelector((state: RootState) => state.player.quesResult)
    const socket = props.socket
    const options = question.options

    function handleNext() {

        // socket event to leaderboard screen 
        if (currIndex == allQuestions.length - 1) {
            socket.emit("final-leaderboard", gameCode)
            socket.on("displaying-final-leaderboard", (leaderboard: any[]) => {
                console.log("Final Leaderboard")
                dispatch(setLeaderboard(leaderboard))
                dispatch(setScreenStatus(ScreenStatus.leaderboard))
            })
        }
        else {
            socket.emit("display-leaderboard", gameCode)
            socket.on("displaying-leaderboard", (leaderboard: any[]) => {
                console.log("Leaderboard")
                dispatch(setLeaderboard(leaderboard))
                dispatch(setScreenStatus(ScreenStatus.leaderboard))
            })
        }
    }
    return <>
        <div className="flex flex-col items-center m-auto w-full px-4">
            <p className="w-full py-2 px-3 text-2xl text-center bg-white font-semibold rounded max-w-fit capitalize">{question?.title}</p>
            <div className="absolute right-4 mt-1">
                <button className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded" onClick={handleNext} >Next</button>
            </div>
            <Barchart result={result} options={question?.options} />
        </div>
    </>
}

function Barchart(params: { result: number[], options: Option[] }) {
    const uData = params?.result ? params?.result : [0, 0, 0, 0];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
    ];
    const bars = document.getElementsByClassName("css-1vuxth3-MuiBarElement-root") as HTMLCollectionOf<HTMLElement>;

    useEffect(() => {
        if (bars.length >= 4) {
            bars[0].style.fill = "#EF4444"
            bars[1].style.fill = "#3B82F6"
            bars[2].style.fill = "#22C55E"
            bars[3].style.fill = "#EAB308"
        }
    }, [bars])

    return <>
        <div className="absolute bottom-16 overflow-hidden">
            <div className="relative top-[32px]">
                <ChartContainer
                    width={550}
                    height={300}
                    // series={seriesData as AllSeriesType[]}
                    series={[{ data: uData, label: '', type: 'bar' }]}
                    xAxis={[{ scaleType: 'band', data: xLabels }]}
                >
                    <BarPlot className="barplot" />
                </ChartContainer>
            </div>

            <div className="flex flex-row justify-around w-[450px] text-lg ml-12">
                {params.result.length > 0 && params.result.map((opt: any, index: number) => {
                    const isCorrect = params.options[index].isCorrect === true;
                    return <p key={index} className={`text-black text-sm p-2 rounded shadow flex flex-row items-center ${optionColors[index]}`}>{opt}
                        {isCorrect ? <TiTick size={20} color="#fff" className="text-white font-extrabold m-auto ml-2" /> : <RxCross2 size={20} color="#fff" className="text-white font-extrabold m-auto ml-2" />}</p>
                })}
            </div>
        </div>
    </>
}

// modify css if needed as like in kahoot