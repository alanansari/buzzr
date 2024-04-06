"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
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
        // establish a socket connection using io function
        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=player&playerId=${params.player.id}&gameCode=${params.game.gameCode}`);
            socket.on("connect", () => {
                console.log("Connected to socket server");
            });

            socket.on("player-removed", () => {
                console.log("player removed")
                router.push("/player");
            })

            return () => {
                socket.disconnect();
                // socket.emit("remove-player", params.player.id, params.gameCode, (response: any) => {
                //     console.log("player disconnected")
                // })
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