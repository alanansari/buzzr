"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { addPlayer, removePlayer, setPlayers } from "@/state/admin/playersSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { resetTimer } from "@/state/timer/timerSlice";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Lobby = (params: {
    roomId: string,
    userId: string,
    gameCode: string,
    players: any[],
    quizQuestions: any,
    currentQues: number,
    gameStarted: boolean,
    quizTitle: string
}) => {
    const dispatch = useDispatch();
    const players: any[] = useSelector((state: RootState) => state.player.players);
    const socket = useSelector((state: RootState) => state.socket.socket)
    const [load, setLoad] = useState(false)
    const router = useRouter()

    useEffect(() => {

        if (params?.gameStarted) {
            dispatch(resetTimer(3))
            dispatch(setScreenStatus(ScreenStatus.wait))
            router.push(`/admin/game/${params.roomId}`);
        }

        dispatch(setPlayers(params.players))
    }, [dispatch, params.players, params.gameStarted, params.roomId, router])

    useEffect(() => {
        if (window !== undefined) {
            const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/?userType=admin&adminId=${params.userId}&gameCode=${params.gameCode}`);
            socket.on("connect", () => {
                console.log("Connected to socket server");
                dispatch(createConnection(socket));
            });

            socket.on("player-joined", (player: any) => {
                console.log(`Player ${player.id} Joined`);
                dispatch(addPlayer(player));
            });

            socket.on("player-removed", (player: any) => {
                console.log(`Player ${player.id} removed`);
                dispatch(removePlayer(player));
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [dispatch, params.gameCode, params.userId, players]);

    function handlePlayerRemove(player: any) {
        socket.emit("remove-player", player, params.gameCode)
        socket.on("player-removed", (player: any) => {
            console.log(`Player ${player.id} removed`);
            dispatch(removePlayer(player));
            toast.error(`You have removed ${player.name}`)
        });

    }

    function handleGameStart() {
        setLoad(true)
        socket.emit("start-game", params.gameCode)
        socket.on("game-started", (gameCode: string) => {
            console.log("Game started")
            setLoad(false)
            dispatch(resetTimer(3))
            dispatch(setScreenStatus(ScreenStatus.wait))
            router.push(`/admin/game/${params.roomId}`);
        })
    }

    return <>
        <div className="bg-white dark:bg-dark rounded-xl mx-4 py-8 px-6">
            <div className="flex gap-x-3 mb-8 items-center">
                <span className="font-extrabold text-5xl italic mr-4">{params?.quizTitle}</span>
                <span className="p-2 dark:text-white border-[#7D49F8] border h-fit bg-light-bg rounded-xl font-bold">Number of Participants: {players.length}</span>
                <span className="p-2 dark:text-white border-[#7D49F8] border bg-light-bg rounded-xl font-bold h-fit">Room Code: {params?.gameCode}</span>
                <span className="p-2 dark:text-white border-[#7D49F8] border bg-light-bg rounded-xl font-bold h-fit">Joining Link: buzzr.silive.in</span>
            </div>
            <div className="h-fit mt-2 mx-auto max-h-[60vh] flex flex-wrap overflow-y-auto gap-y-4 gap-x-3">
                {(players.length === 0) ? <div className="p-2 mx-auto w-fit ">Waiting for players to join...</div> : players.map((player: any) => {
                    return (
                        <div key={player.id} className='border flex justify-between items-center w-fit gap-2 rounded-full py-2 px-3 text-dark dark:text-white text-lg' >
                            <Image
                                src={player.profilePic as string || "/avatar-1577909_1280.webp"}
                                width={50}
                                height={50}
                                alt="Profile"
                                className="rounded-full h-10 w-10"
                            />
                            {player.name}
                            <span className="cursor-pointer font-bold text-lg" onClick={() => handlePlayerRemove(player)}><RxCross2 size={22} /></span>
                        </div>
                    )
                })
                }
            </div>
            <button className="mt-8 rounded-xl text-white dark:text-dark bg-lprimary dark:bg-dprimary px-5 py-3 hover:cursor-pointer transition-all duration-300 ease-in-out disabled:cursor-default font-bold disabled:bg-gray w-96" disabled={players.length === 0 || load} onClick={handleGameStart} >{load === true ? "Loading..." : "Start"}</button>
        </div>


    </>
}

export default Lobby

