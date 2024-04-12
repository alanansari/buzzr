import { setCurrIndex } from "@/state/admin/playersSlice";
import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { RootState } from "@/state/store";
import { resetTimer } from "@/state/timer/timerSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function LeaderBoard(props: any) {

    const dispatch = useDispatch()
    const currIndex = useSelector((state: RootState) => state.player.currentIndex)
    const leaderboard = useSelector((state: RootState) => state.player.leaderboard)
    const { currentQues, gameCode, quizQuestions } = props
    const socket = props.socket
    const router = useRouter()

    function handleNext() {
        console.log("next")
        dispatch(resetTimer(3))
        socket.emit("change-question", gameCode, currIndex + 1)
        socket.on("question-changed", (index: number) => {
            console.log("22")
            dispatch(setCurrIndex(index))
            dispatch(setScreenStatus(ScreenStatus.wait))
            socket.emit("start-timer", gameCode)
        })
    }

    function handleEnd() {
        // emit socket to close quiz
        socket.emit("end-game-session", gameCode);
        router.push(`/admin/quiz/${quizQuestions?.id}`)
    }

    return <>
        <div className="flex flex-col items-center m-auto w-full px-4">
            <p className="w-full py-2 px-3 text-2xl text-center bg-white font-semibold rounded max-w-fit capitalize">Leaderboard</p>
            <div className="absolute right-4 mt-1">
                {currIndex < quizQuestions?.questions?.length - 1 ?
                    <button className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded" onClick={handleNext} >Next</button>
                    :
                    <button className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded" onClick={handleEnd} >End</button>
                }
            </div>

            <div className="flex flex-col gap-4 my-6">
                {leaderboard?.length > 0 ? leaderboard.map((lead, index) => {
                    return <div key={index} className={`${index === 0 ? "bg-yellow-600 border-none" : index === 1 ? "bg-gray-600 border-none" : index === 2 ? "bg-orange-900 border-none" : "bg-white"} flex justify-between px-4 py-2 flex-row shadow rounded-md border w-96 items-center`}>
                        <div className="flex flex-row items-center gap-x-2">
                            <Image src={lead.Player.profilePic} className="w-12 h-12 rounded-full" width={16} height={16} alt="profile pic" />
                            <p>{lead.Player.name}</p>
                        </div>
                        <p>{lead.score}</p>
                    </div>
                }) : null}

            </div>
        </div>
    </>

}

// changes at last question -> final leaderboard