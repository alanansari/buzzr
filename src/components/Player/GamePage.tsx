"use client"
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { removePlayer } from "@/state/admin/playersSlice";
import Counter from "../Counter";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const GamePage = (params: {
    player: any,
    gameCode: string
}) => {
    const dispatch = useDispatch();
    const router = useRouter()
    useEffect(() => {
        // establish a socket connection using io function
        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=player&playerId=${params.player.id}&gameCode=${params.gameCode}`);
            socket.on("connect", () => {
                console.log("Connected to socket server");
                dispatch(createConnection(socket));
            });

            socket.on("player-removed", () => {
                console.log("player removed")
                // window.history.pushState(null, "", "/player");
                router.push("/player");
            })

            return () => {
                socket.disconnect();
                // socket.emit("remove-player", params.player.id, params.gameCode, (response: any) => {
                //     console.log("player disconnected")
                // })
            };
        }
    }, [dispatch, params.gameCode, params.player]);
    return (
        <div className="flex flex-col justify-center items-center h-full rounded-md w-fit p-4 mx-auto my-4">
            <h1 className="text-lg font-semibold my-4">Wait for the Host to Start the game...</h1>
            <Counter />
        </div>
    )
}

export default GamePage