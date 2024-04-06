import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ChartContainer, BarPlot } from '@mui/x-charts';
import { FcApproval, FcCheckmark } from "react-icons/fc";
import Barchart from "./AnsBarChart";

export default function QuestionScreen(props: any) {

    // console.log("data", props)

    return <>
        <div className="flex flex-col items-center m-auto w-4/5">
            <p className="w-full py-2 px-3 text-2xl text-center bg-white font-semibold rounded max-w-fit">This is Question title</p>
            <div className="absolute right-[10%]">
                <button className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded" >Start</button>
            </div>
            {/* when not showing answers */}
            <div className="flex w-full justify-between items-center flex-row my-8">
                <Countdown />
                <span className="rounded-full bg-white w-12 h-12 flex flex-col justify-center items-center">
                    0 <span className="text-[10px] mt-[-5px]"> Ans</span>
                </span>
            </div>

            {/* when showing answers */}
            {/* <Barchart /> */}
            {/* when not showing answers */}
            <div className="absolute bottom-4 w-4/5">
                <div className="grid grid-cols-2 w-full gap-5 h-full">
                    <p className="text-black bg-red-500 p-6 rounded shadow flex justify-between items-center flex-row w-full"><span>Option 1</span>
                        {/* <FcApproval size={32} className="font-bold" /> */}
                    </p>
                    <p className="text-black bg-yellow-500 p-6 rounded shadow">Option 2</p>
                    <p className="text-black bg-green-500 p-6 rounded shadow">Option 3</p>
                    <p className="text-black bg-pink-600 p-6 rounded shadow">Option 4</p>
                </div>
            </div>
        </div>
    </>
}

function Countdown() {
    return <div className="">
        <CountdownCircleTimer
            isPlaying
            duration={10}
            colors={['#004777', '#F7B801', '#A30000']}
            colorsTime={[10, 5, 0]}
            size={60}
        >
            {({ remainingTime }) => <span className="text-md">{remainingTime}</span>}
        </CountdownCircleTimer>
    </div>
}


// redux -> current index to fetch question, states for screen