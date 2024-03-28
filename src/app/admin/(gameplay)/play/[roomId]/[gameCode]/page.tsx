"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { createConnection } from "@/state/socket/socketSlice";
import { useSession } from "next-auth/react";


function Play ({ params }: { params: { roomId: string, gameCode: string } }) {

  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [roomState, setRoomState] = useState({
    isPlaying: false,
    players: [],
    questions: [],
    currentQuestion: 0,
  });

  useEffect(() => {
    // establish a socket connection using io function
    if(window !== undefined && session?.user?.email!=undefined){
      const socket = io(`http://localhost:8080?userType=admin&adminEmail=${session?.user?.email}`);
      socket.on("connect", () => {
        dispatch(createConnection(socket));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [dispatch, session?.user?.email]);

  return (
    <>
      <div className="mx-auto my-4 bg-slate-200 p-2 border rounded-md w-fit flex flex-row">
        <div className="border-r-2 border-slate-400 p-2 text-sm">Join at <br/> buzzr.silive.in</div>
          <div className="p-2 flex flex-col justify-center items-center">Game PIN:<br/>
          <span className="text-3xl">{params.gameCode}</span>
        </div>
      </div>
      {(roomState.players.length === 0) ? <div className="p-2 mx-auto w-fit bg-slate-200 rounded-md text-sm">Waiting for players to join...</div>:''}
    </>
  )
}

export default Play