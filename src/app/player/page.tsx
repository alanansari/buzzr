"use client";
import CheckLocalPlayer from "@/components/Player/checkLocalPlayer";
import CreatePlayerForm from "@/components/Player/Setup/CreatePlayerForm";
import Image from "next/image";
import { useState } from "react";
import BackNavButton from "@/components/BackNavButton";

function Player() {

    const [data, setData] = useState({
        name: "",
        err: false
    })

    return <>
            <CheckLocalPlayer />
            <div className="p-4 flex justify-between">
                <Image
                src="/logo.svg"
                width={80}
                height={80}
                alt="Logo"
                />

            </div>
            <div className="w-full h-full flex gap-4 p-4 [&>*]:bg-white dark:[&>*]:bg-dark [&>*]:rounded-xl">
                <div className="w-fit">
                    <BackNavButton />
                    <CreatePlayerForm data={data} setData={setData} />
                </div>
                <div className="w-[40vw] hidden md:block"></div>
            </div>
    </>
}

export default Player
