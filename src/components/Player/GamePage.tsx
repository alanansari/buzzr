"use client"
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import { removePlayer } from "@/state/admin/playersSlice";
import Counter from "../Counter";
import { useRouter } from "next/navigation";
import { GameSession } from "@prisma/client";
import { WaitGameStart, Question, Loader, Result } from "./GameScreens";

const GamePage = (params: {
    player: any,
    game: GameSession,
}) => {
    const game = params.game as any;
    const [question, setQuestion] = useState(game.quiz.questions[game.currentQuestion]);
    const [result,setResult] = useState('timeout');
    const router = useRouter()
    useEffect(() => {

        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=player&playerId=${params.player.id}&gameCode=${params.game.gameCode}`);

            socket.on("connect", () => {
                console.log("Connected to socket server");
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
    }, [params.game.gameCode, params.player, router]);
    return (
        <div className="flex flex-col justify-center items-center h-full w-fit p-4 mx-auto my-4">
            {/* Screens */}
            <WaitGameStart />
            {/* <Question question={question} /> */}
            {/* <Loader /> */}
            {/* <Result result={result} /> */}
        </div>
    )
}

export default GamePage