"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { createConnection } from "@/state/socket/socketSlice";
import joinRoom from "@/actions/RoomJoinAction";

const Lobby = (params: {
    roomId: string,
    userId: string,
    gameCode: string
}) => {
    const dispatch = useDispatch();

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // establish a socket connection using io function
        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=admin&adminId=${params.userId}`);
            socket.on("connect", () => {
                dispatch(createConnection(socket));
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [dispatch, params.userId]);

    const socket = useSelector((state: any) => state?.socket?.socket)
    useEffect(() => {
        // join room
        if (socket) {
            console.log(socket)
            socket.emit("join room", params.gameCode)

            // track all players
            socket.on("user joined", (userid: string) => {
                console.log(`User ${userid} joined`);
            });

            return () => {
                socket.off("user joined");
            };
        }
        else {
            console.log("no")
        }

    }, [socket])

    return (
        <div className="h-fit w-[100%] flex justify-center items-center">
            {(players.length === 0) ? <div className="p-2 mx-auto w-fit bg-slate-200 rounded-md text-sm">Waiting for players to join...</div> : ''}
        </div>
    )
}

export default Lobby

// presenter -> room join
// show total players
// show player name