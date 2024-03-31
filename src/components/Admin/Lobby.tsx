"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { addPlayer } from "@/state/admin/playersSlice";
import Image from "next/image";

const Lobby = (params: {
    roomId: string,
    userId: string,
    gameCode: string
}) => {
    const dispatch = useDispatch();
    // const [players, setPlayers] = useState<any>([]);
    const players = useSelector((state: RootState) => state.player.players);


    useEffect(() => {
        // establish a socket connection using io function
        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=admin&adminId=${params.userId}&gameCode=${params.gameCode}`);
            socket.on("connect", () => {
                console.log("Connected to socket server");
                dispatch(createConnection(socket));
            });

            // const updatePlayerState = (newPlayer: any) => {
            //     const existingPlayer = players.find((player: any) => player.id === newPlayer.id);
            //     if (existingPlayer) {
            //         return;
            //     }
            //     setPlayers([...players, newPlayer]);
            // }

            socket.on("player-joined", (player: any) => {
                console.log(`Player ${player.id} Joined`);
                dispatch(addPlayer(player));
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [dispatch, params.gameCode, params.userId, players]);

    return (
        <div className="h-fit w-[100%] flex justify-center items-center">
            {(players.length === 0) ? <div className="p-2 mx-auto w-fit bg-slate-200 rounded-md text-sm">Waiting for players to join...</div> : players.map((player: any) => {
                return (
                    <div key={player.id} className="p-1 mx-auto w-fit bg-slate-200 rounded-md text-md flex justify-center items-center">
                        <Image className="rounded-sm" src={player.profilePic} alt="player-avtr" width={30} height={30} />
                        <div className="mx-1 font-bold">{player.name}</div>
                    </div>
                )})
            }
        </div>
    )
}

export default Lobby