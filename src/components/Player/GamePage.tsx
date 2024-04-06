"use client"
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { removePlayer } from "@/state/admin/playersSlice";
import Counter from "../Counter";
import { useRouter } from "next/navigation";

const GamePage = (params: {
    player: any,
    gameCode: string
}) => {
    const dispatch = useDispatch();
    const router = useRouter()
    useEffect(() => {

        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=player&playerId=${params.player.id}&gameCode=${params.gameCode}`);

            socket.on("connect", () => {
                console.log("Connected to socket server");
                dispatch(createConnection(socket));
            });

            socket.on("player-removed", () => {
                console.log("player removed")
                router.push("/player");
            })

            // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            //     socket.emit("remove-player", params.player, params.gameCode);
            //     socket.disconnect();
            //     // Cancel the default behavior to prompt the user before closing
            //     event.preventDefault();
            //     // Chrome requires returnValue to be set
            //     event.returnValue = '';
            // };

            // window.addEventListener("beforeunload", handleBeforeUnload);
            return () => {
                // socket.emit("remove-player", params.player, params.gameCode);
                socket.disconnect();
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