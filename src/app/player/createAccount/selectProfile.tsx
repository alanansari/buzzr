"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

export default function SelectProfile() {

    const profiles = [
        "/player_profile/profile1.png", "/player_profile/profile2.png", "/player_profile/profile3.png", "/player_profile/profile4.png", "/player_profile/profile5.jpg", "/player_profile/profile6.png", "/player_profile/profile7.jpg", "/player_profile/profile9.jpg", "/player_profile/profile10.jpg", "/player_profile/profile11.jpg"
    ]

    const [avatar, setAvatar] = useState({
        profile: "",
        index: -1
    })
    function handleProfile(src: string, index: number) {
        setAvatar({ index, profile: src })
    }
    const { pending } = useFormStatus()

    useEffect(() => {
        if (pending) {
            setAvatar({
                profile: "", index: -1
            })
        }

    }, [pending])


    return <>
        <div className="flex flex-row flex-wrap w-full gap-4 items-center justify-center mt-2 bg-transparent">
            {profiles.map((pr, index) => {
                return <>
                    <input name="profile" id="profile" value={avatar.profile} className="hidden" />
                    <label htmlFor="profile" className="bg-transparent">
                        <Image key={index} alt="image" width={32} height={32} src={pr} className={` ${avatar.index === index && "border-4 border-blue-500 ease-linear duration-150 scale-95 shadow-lg"} rounded-full w-20 h-20 border-black border-[1.4px] cursor-pointer`} onClick={() => { handleProfile(pr, index) }} />
                    </label>
                </>
            })}
        </div>
    </>
}