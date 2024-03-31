"use client"
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { removePlayer } from "@/state/admin/playersSlice";
import Counter from "../Counter";

const GamePage = (params:{
        player: any,
        gameCode: string
}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        // establish a socket connection using io function
        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=player&playerId=${params.player.id}&gameCode=${params.gameCode}`);
            socket.on("connect", () => {
                console.log("Connected to socket server");
                dispatch(createConnection(socket));
            });

            return () => {
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