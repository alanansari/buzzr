"use client";
import { useEffect, useState } from "react";
import { io} from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { addPlayer, removePlayer, setPlayers } from "@/state/admin/playersSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import { resetTimer } from "@/state/timer/timerSlice";

const Lobby = (params: {
    roomId: string,
    userId: string,
    gameCode: string,
    players: any[],
    quizQuestions: any,
    currentQues: number,
    gameStarted: boolean
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
        <div>
            <div className="h-fit w-[70vw] mx-auto max-h-[60vh] flex flex-wrap gap-2">
                {(players.length === 0) ? <div className="p-2 mx-auto w-fit bg-slate-200 rounded-md text-sm">Waiting for players to join...</div> : players.map((player: any) => {
                    return (
                        <div key={player.id} className="p-1 mx-auto w-fit bg-slate-200 rounded-md text-md flex justify-center items-center">
                            <Image className="rounded-sm" src={player.profilePic} alt="player-avtr" width={30} height={30} />
                            <div className="mx-1 font-bold">{player.name}</div>
                            <div className="text-red-600 font-bold cursor-pointer px-1" title="Remove" onClick={() => handlePlayerRemove(player)}>X</div>
                        </div>
                    )
                })
                }
            </div>
            <div className="absolute bottom-4 w-full left-[45%]">
                <div className="flex justify-between pr-4 w-[55%]">
                    <button className="w-24 py-2 shadow hover:bg-slate-200 transition-all bg-white border rounded-full disabled:bg-slate-300" disabled={players.length === 0 || load} onClick={handleGameStart} >{load === true ? "Loading..." : "Start"}</button>
                    <p className="text-white bg-black opacity-60 px-2 py-1 flex items-center rounded">Active Players : {players.length}</p>
                </div>
            </div>
        </div>
    </>
}

export default Lobby

