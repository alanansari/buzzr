"use client"
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { ScreenStatus,setScreenStatus } from "@/state/player/screenSlice";
import { RootState } from "@/state/store";
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
    const [socketState, setSocketState] = useState<Socket>({} as Socket);

    const screen = useSelector((state: RootState) => state.screen.screenStatus);
    const dispatch = useDispatch();

    const router = useRouter()
    useEffect(() => {

        if (window !== undefined) {
            const socket = io(`http://localhost:8080?userType=player&playerId=${params.player.id}&gameCode=${params.game.gameCode}`);

            socket.on("connect", () => {
                console.log("Connected to socket server");
                setSocketState(socket);
            });

            socket.on("player-removed", () => {
                console.log("player removed")
                router.push("/player");
            })

            socket.on("game-start", () => {
                console.log("Game started");
                dispatch(setScreenStatus(ScreenStatus.wait));
            });

            socket.on("get-question-index", (index: number) => {
                console.log("Question index", index);
                setQuestion(game.quiz.questions[index]);
                dispatch(setScreenStatus(ScreenStatus.question));
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [dispatch, params.game.gameCode, params.player, game.quiz.questions, router]);
    return (
        <div className="flex flex-col justify-center items-center h-full w-fit p-4 mx-auto my-4">
            {/* Screens */}
            {
                (screen === ScreenStatus.lobby) ? <WaitGameStart />
                : (screen === ScreenStatus.question) ? <Question question={question} gameCode={params.game.gameCode} playerId={params.player.id} socket={socketState} />
                : (screen === ScreenStatus.result) ? <Result result={result} />
                : <Loader />
            }
        </div>
    )
}

export default GamePage