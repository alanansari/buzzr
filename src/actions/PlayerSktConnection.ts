import { createConnection } from "@/state/socket/socketSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

function socketConnection() {
  const dispatch = useDispatch();
  useEffect(() => {

    // establish a socket connection using io function
    const socket = io(`${process.env.SOCKET_ENDPOINT}`);
    dispatch(createConnection(socket));

    return () => {
      socket.disconnect();
    };
  }, []);
}

export default socketConnection
