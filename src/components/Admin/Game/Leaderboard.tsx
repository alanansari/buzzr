import { setCurrIndex } from "@/state/admin/playersSlice";
import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { RootState } from "@/state/store";
import { resetTimer } from "@/state/timer/timerSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LeaderBoard(props: any) {

    const dispatch = useDispatch()
    const currIndex = useSelector((state: RootState) => state.player.currentIndex)
    const leaderboard = useSelector((state: RootState) => state.player.leaderboard)
    const { currentQues, gameCode } = props
    const socket = props.socket
    // const [leaderboard, setLeaderboard] = useState([])
    // useEffect(() => {
    //     socket.on("displaying-leaderboard", (leaderboard: any) => {
    //         console.log(leaderboard)
    //         setLeaderboard(leaderboard)
    //     })
    // }, [socket])
    function handleNext() {
        // console.log(currIndex, currentQues)
        dispatch(resetTimer(3))
        socket.emit("set-question-index", gameCode, currIndex + 1)
        socket.on("get-question-index", (index: number) => {
            dispatch(setCurrIndex(index))
            // dispatch(setScreenStatus(ScreenStatus.wait))
            socket.emit("start-timer")
        })
    }

    // console.log(leaderboard)

    return <>
        <div className="flex flex-col items-center m-auto w-full px-4">
            <p className="w-full py-2 px-3 text-2xl text-center bg-white font-semibold rounded max-w-fit capitalize">Leaderboard</p>
            <div className="absolute right-4 mt-1">
                <button className="w-24 h-10 shadow hover:bg-slate-200 transition-all bg-white border rounded" onClick={handleNext} >Next</button>
            </div>

            <div className="flex flex-col gap-4 my-6">
                {leaderboard?.length > 0 ? leaderboard.map((lead, index) => {
                    return <div className={`${index === 0 ? "bg-yellow-600 border-none" : index === 1 ? "bg-gray-600 border-none" : index === 2 ? "bg-orange-900 border-none" : "bg-white"} flex justify-between px-4 py-2 flex-row shadow rounded-md border w-96 items-center`}>
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