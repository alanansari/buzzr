"use client"

import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { resetTimer } from "@/state/timer/timerSlice";
import { BarPlot, ChartContainer } from "@mui/x-charts";
import { useEffect } from "react";
import { FcCheckmark, FcApproval } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";
// import "./styles.css"

export default function QuesResult(props: any) {
    const { currentQues, quizQuestions } = props
    const allQuestions = quizQuestions?.questions
    const question = allQuestions[currentQues]
    const dispatch = useDispatch()

    function handleSocket() {
        dispatch(setScreenStatus(ScreenStatus.wait))
        dispatch(resetTimer(3))
    }
    return <>
        <div className="flex flex-col items-center m-auto w-full px-4">
            <p className="w-full py-2 px-3 text-2xl text-center bg-white font-semibold rounded max-w-fit capitalize">{allQuestions[currentQues]?.title}</p>
            <button onClick={() => handleSocket()}>click me</button>
            <Barchart />
        </div>
    </>

}

function Barchart() {
    const uData = [4000, 3000, 2000, 2780];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
    ];
    const bars = document.getElementsByClassName("css-1vuxth3-MuiBarElement-root") as HTMLCollectionOf<HTMLElement>;

    useEffect(() => {
        if (bars.length >= 4) {
            bars[0].style.fill = "#EF4444";
            bars[1].style.fill = "#22C55E";
            bars[2].style.fill = "#EAB308";
            bars[3].style.fill = "#DB2777";
        }
    }, [bars])

    return <>
        <div className="absolute bottom-6 overflow-hidden">
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
                <p className="text-black text-sm bg-red-500 p-2 rounded shadow flex flex-row items-center">
                    Option 1 <TiTick size={20} id="correct" color="#fff" className="text-white font-extrabold m-auto ml-2" />
                </p>
                <p className="text-black text-sm bg-green-500 p-2 rounded shadow flex flex-row items-center">
                    Option 2 <FcCheckmark size={16} className="font-extrabold m-auto ml-2" />
                </p>
                <p className="text-black text-sm bg-yellow-500 p-2 rounded shadow flex flex-row items-center">
                    Option 3 <FcCheckmark size={16} className="font-extrabold m-auto ml-2" />
                </p>
                <p className="text-black text-sm bg-pink-600 p-2 rounded shadow flex flex-row items-center">
                    Option 4 <FcCheckmark size={16} className="font-extrabold m-auto ml-2" />
                </p>
            </div>
        </div>
    </>
}