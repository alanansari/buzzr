import { setCurrIndex } from "@/state/admin/playersSlice";
import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { RootState } from "@/state/store";
import { resetTimer } from "@/state/timer/timerSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LeaderBoard(props: any) {

    const dispatch = useDispatch()
    const currIndex = useSelector((state: RootState) => state.player.currentIndex)
    const { currentQues, gameCode } = props
    const socket = props.socket
    function handleNext() {
        // console.log(currIndex, currentQues)
        dispatch(resetTimer(3))
        socket.emit("change-question", gameCode, currIndex + 1)
        socket.on("question-changed", () => {
            dispatch(setCurrIndex(currIndex + 1))
            // dispatch(setScreenStatus(ScreenStatus.wait))
            socket.emit("start-timer")
        })
    }

    return <>
        <div className="flex flex-col items-center m-auto w-full px-4">
            <p className="w-full py-2 px-3 text-2xl text-center bg-white font-semibold rounded max-w-fit capitalize">Leaderboard</p>
            <div className="absolute right-4 mt-1">
                <button className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded" onClick={handleNext} >Next</button>
            </div>
        </div>
    </>

}

// changes at last question -> final leaderboard