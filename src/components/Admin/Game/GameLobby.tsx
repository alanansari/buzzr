"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { createConnection } from "@/state/socket/socketSlice";
import {
  addPlayer,
  removePlayer,
  setPlayers,
} from "@/state/admin/playersSlice";
import { ScreenStatus } from "@/state/admin/screenSlice";
import WaitScreen from "./WaitScreen";
import QuestionScreen from "./QuestionScreen";
import QuesResult from "./QuesResult";
import LeaderBoard from "./Leaderboard";

const GameLobby = (params: {
  roomId: string;
  userId: string;
  gameCode: string;
  players: any[];
  quizQuestions: any;
  currentQues: number;
}) => {
  const dispatch = useDispatch();
  const players: any[] = useSelector(
    (state: RootState) => state.player.players,
  );
  const socket = useSelector((state: RootState) => state.socket.socket);
  const screen = useSelector(
    (state: RootState) => state.adminscreen.screenStatus,
  );
  const currIndex = useSelector(
    (state: RootState) => state.player.currentIndex,
  );

  useEffect(() => {
    dispatch(setPlayers(params.players));
  }, [dispatch, params.players]);

  useEffect(() => {
    if (window !== undefined) {
      const socket = io(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/?userType=admin&adminId=${params.userId}&gameCode=${params.gameCode}`,
      );
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

      return () => {
        socket.disconnect();
      };
    }
  }, [
    dispatch,
    params.gameCode,
    params.userId,
    params.currentQues,
    players,
    currIndex,
  ]);

  return (
    <>
      <>
        {screen === ScreenStatus.wait ? (
          <WaitScreen
            currentQues={params.currentQues}
            socket={socket}
            gameCode={params.gameCode}
          />
        ) : screen === ScreenStatus.question ? (
          <QuestionScreen {...params} socket={socket} />
        ) : screen === ScreenStatus.result ? (
          <QuesResult {...params} socket={socket} />
        ) : (
          screen === ScreenStatus.leaderboard && (
            <LeaderBoard {...params} socket={socket} />
          )
        )}
      </>
    </>
  );
};

export default GameLobby;
