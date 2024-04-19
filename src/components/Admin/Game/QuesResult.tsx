"use client"

import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { BarPlot, ChartContainer } from "@mui/x-charts";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Option } from "@prisma/client";
import { RootState } from "@/state/store";
import { setLeaderboard } from "@/state/admin/playersSlice";
import ShowLeaderboard from "@/actions/ShowLeaderboardAction";

export default function QuesResult(props: any) {
    const { currentQues, quizQuestions, gameCode } = props
    const dispatch = useDispatch()
    const currIndex = useSelector((state: RootState) => state.player.currentIndex)
    const allQuestions = quizQuestions?.questions
    const question = allQuestions[currIndex]
    const result = useSelector((state: RootState) => state.player.quesResult)
    const socket = props.socket

    async function handleNext() {

        if (currIndex == allQuestions.length - 1) {
            socket.emit("final-leaderboard", gameCode)
            socket.on("displaying-final-leaderboard", (leaderboard: any[]) => {
                console.log("Final Leaderboard")
                dispatch(setLeaderboard(leaderboard))
                dispatch(setScreenStatus(ScreenStatus.leaderboard))
            })
        }
        else {
            const leaderboard = await ShowLeaderboard(gameCode)
            dispatch(setLeaderboard(leaderboard))
            socket.emit("display-leaderboard", gameCode)
            socket.on("displaying-leaderboard", () => {
                console.log("Leaderboard")
                dispatch(setScreenStatus(ScreenStatus.leaderboard))
            })
        }
    }
    return <>
        <div className="flex flex-col items-center m-auto w-full px-4">
            <p className="w-[70%] md:w-4/5  py-2 px-3 text-2xl text-center bg-white font-semibold rounded max-w-fit capitalize">{question?.title}</p>
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
    // const bars = document.getElementsByClassName("css-1vuxth3-MuiBarElement-root") as HTMLCollectionOf<HTMLElement>;
    const bars = document.getElementsByClassName("MuiBarElement-root") as HTMLCollectionOf<HTMLElement>;
    console.log(bars)

    useEffect(() => {
        if (bars.length >= 4) {
            console.log(bars)

            var index = 0;
            for (var i = 0; i < params.options.length; i++) {
                if (params.options[i].isCorrect === true)
                    index = i;
            }
            for (var i = 0; i < 4; i++) {
                if (i == index)
                    bars[i].style.fill = "#1aff1a"
                else
                    bars[i].style.fill = "#ff3333"
            }
        }
    }, [bars])

    return <>
        <div className="absolute bottom-16 overflow-hidden">
            <div className="relative top-[74px] z-10">
                <ChartContainer
                    width={550}
                    height={300}
                    series={[{ data: uData, label: '', type: 'bar' }]}
                    xAxis={[{ scaleType: 'band', data: xLabels }]}
                >
                    <BarPlot className="barplot" />
                </ChartContainer>
            </div>

            <div className="flex flex-row justify-around w-[450px] text-lg ml-12 relative z-20 ">
                {params.result.length > 0 && params.result.map((opt: any, index: number) => {
                    const isCorrect = params.options[index].isCorrect === true;
                    return <div className="flex flex-col" key={index}>
                        <p className="flex flex-row items-center justify-center w-full">{opt}
                            {isCorrect ? <TiTick size={20} color="#fff" className="text-white font-extrabold ml-2" /> : <RxCross2 size={20} color="#fff" className="text-white font-extrabold ml-2" />}</p>
                        <div key={index} className="w-20 border-t">
                            <p className="text-sm text-white font-semibold w-full text-center">{`${String.fromCharCode(65 + index)})`} {params.options[index].title.length > 15 ? `${params.options[index].title.slice(0, 15)}...` : params.options[index].title}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </>
}
