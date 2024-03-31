"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";

const Lobby = (params: {
    roomId: string,
    userId: string,
    gameCode: string
}) => {
    const dispatch = useDispatch();
    const [players, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        // establish a socket connection using io function
        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=admin&adminId=${params.userId}&gameCode=${params.gameCode}`);
            socket.on("connect", () => {
                console.log("Connected to socket server");
                dispatch(createConnection(socket));
            });

            socket.on("player joined", (playerId: string) => {
                console.log(`Player ${playerId} Joined`);
                setPlayers([...players, playerId]);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [dispatch, params.gameCode, params.userId, players]);

    return (
        <div className="h-fit w-[100%] flex justify-center items-center">
            {(players.length === 0) ? <div className="p-2 mx-auto w-fit bg-slate-200 rounded-md text-sm">Waiting for players to join...</div> : players.map((player, index) => {
                return (
                    <div key={index} className="p-2 mx-auto w-fit bg-slate-200 rounded-md text-sm">{player}</div>
                )})
            }
        </div>
    )
}

export default Lobby