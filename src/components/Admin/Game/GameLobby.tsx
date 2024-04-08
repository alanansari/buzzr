"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { addPlayer, removePlayer, setPlayers } from "@/state/admin/playersSlice";
import { ScreenStatus, setScreenStatus } from "@/state/admin/screenSlice";
import WaitScreen from "./WaitScreen";
import QuestionScreen from "./QuestionScreen";
import { resetTimer } from "@/state/timer/timerSlice";
import QuesResult from "./QuesResult";

const GameLobby = (params: {
    roomId: string,
    userId: string,
    gameCode: string,
    players: any[],
    quizQuestions: any,
    currentQues: number
}) => {
    const dispatch = useDispatch();
    const players: any[] = useSelector((state: RootState) => state.player.players);
    const socket = useSelector((state: RootState) => state.socket.socket)
    const screen = useSelector((state: RootState) => state.adminscreen.screenStatus);
    const time = useSelector((state: RootState) => state.timer.value)

    useEffect(() => {
        // fetch all players
        dispatch(setPlayers(params.players))
    }, [dispatch, params.players])

    useEffect(() => {
        // establish a socket connection using io function
        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=admin&adminId=${params.userId}&gameCode=${params.gameCode}`);
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

            // start timer
            socket.on("timer-starts", () => {
                console.log("Timer started");
                dispatch(setScreenStatus(ScreenStatus.wait))

                setTimeout(() => {
                    dispatch(setScreenStatus(ScreenStatus.question))
                    socket.emit("set-question-index", params.gameCode, params.currentQues);
                }, 4000);
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [dispatch, params.gameCode, params.userId, params.currentQues, players]);

    return <>
        <div className="flex flex-col justify-center items-center h-full w-full p-4 mx-auto my-4">
            {
                (screen === ScreenStatus.wait) ? <WaitScreen socket={socket} />
                    : (screen === ScreenStatus.question) ? <QuestionScreen {...params} socket={socket} />
                        : (screen === ScreenStatus.result) ? <QuesResult {...params} />
                            : null
            }
            {/* <button onClick={() => handleSocket()}>click me</button> */}
        </div>
    </>
}

export default GameLobby
