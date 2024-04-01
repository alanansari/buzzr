"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { addPlayer, removePlayer, setPlayers } from "@/state/admin/playersSlice";
import Image from "next/image";

const Lobby = (params: {
    roomId: string,
    userId: string,
    gameCode: string,
    players: any[]
}) => {
    const dispatch = useDispatch();
    const players: any[] = useSelector((state: RootState) => state.player.players);
    const socket = useSelector((state: RootState) => state.socket.socket)

    useEffect(() => {
        // fetch all players
        dispatch(setPlayers(params.players))
    }, [])

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
    }, [params.gameCode, params.userId, players]);

    function handlePlayerRemove(player: any) {
        socket.emit("remove-player", player.id, params.gameCode)
        socket.on("player-removed", (playerId: string) => {
            console.log(`Player ${playerId} removed`);
            dispatch(removePlayer(player));
        });
        console.log("player deleted")
    }

    console.log(players)

    return <>
        <div className="h-fit w-[100%] flex justify-center items-center">
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
                <button className="w-24 py-2 shadow hover:bg-slate-200 transition-all bg-white border rounded-full disabled:bg-slate-300" disabled={players.length === 0} >Start</button>
                <p className="text-white bg-black opacity-60 px-2 py-1 flex items-center rounded">Active Players : {players.length}</p>
            </div>
        </div>
    </>
}

export default Lobby


// real time issue