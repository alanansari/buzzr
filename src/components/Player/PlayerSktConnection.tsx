"use client"

import { createConnection } from "@/state/socket/socketSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { redirect } from "next/navigation";
import Link from "next/link";
import "../../app/player/styles.css"

function PlayerConnection() {
  const dispatch = useDispatch();
  useEffect(() => {
    // establish a socket connection using io function
    const socket = io("http://localhost:8080");
    socket.on("connect", () => {
      dispatch(createConnection(socket));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const socket = useSelector((state: any) => state.socket.socket)
  console.log("30", socket)

  // useEffect(() => {
  //   {/* if user exists -> join room else create account */ }
  // }, [])

  return <>

    <Link href={"/player/createAccount"}>
      <button className="w-28 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-all rounded shadow ">Player</button>
    </Link>

  </>
}

export default PlayerConnection
