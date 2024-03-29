"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { createConnection } from "@/state/socket/socketSlice";

const Lobby = (params:{
    roomId: string,
    userId: string
}) => {
    const dispatch = useDispatch();

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // establish a socket connection using io function
        if(window !== undefined){
        const socket = io(`http://localhost:8080?userType=admin&adminId=${params.userId}`);
        socket.on("connect", () => {
            dispatch(createConnection(socket));
        });

        return () => {
            socket.disconnect();
        };
        }
    }, [dispatch, params.userId]);
    return (
        <div className="h-fit w-[100%] flex justify-center items-center">
            {(players.length === 0) ? <div className="p-2 mx-auto w-fit bg-slate-200 rounded-md text-sm">Waiting for players to join...</div>:''}
        </div>
    )
}

export default Lobby