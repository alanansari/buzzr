"use client";

import { createConnection } from "@/state/socket/socketSlice";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

export function connectSocket(id: string) {
  const dispatch = useDispatch();

  const socket = io(`http://localhost:8080?userType=player&playerId=${id}`);
  socket.on("connect", () => {
    dispatch(createConnection(socket));
  });

  const socketRedux = useSelector((state: any) => state.socket.socket);
  // console.log("30", socketRedux);
}
