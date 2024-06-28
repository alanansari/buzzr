"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

export default function SelectProfile() {

    const profiles = [
        "/player_profile/profile1.png", "/player_profile/profile2.png", "/player_profile/profile3.png", "/player_profile/profile4.png", "/player_profile/profile5.jpg", "/player_profile/profile6.png", "/player_profile/profile7.jpg", "/player_profile/profile9.jpg", "/player_profile/profile10.jpg", "/player_profile/profile11.jpg", "/player_profile/profile12.png"
    ]

    const [avatar, setAvatar] = useState({
        profile: profiles[0],
        index: 0
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
        <div className="whitespace-nowrap items-center mt-2 bg-transparent mb-6 max-h-[25vh] overflow-x-scroll overflow-y-hidden">
            {profiles.map((pr, index) => {
                return <>
                    <div className="inline-block p-3" key={index}>
                        <input name="profile" id="profile" value={avatar.profile} className="hidden"/>
                        <label htmlFor="profile" className="bg-transparent">
                            <Image key={index} alt="image" width={128} height={128} src={pr} className={` ${avatar.index === index && "border-[3px] border-lprimary ease-linear duration-150 scale-[1.2] shadow-lg"} rounded-full w-20 h-20 border-black cursor-pointer`}  onClick={() => { handleProfile(pr, index) }} />
                        </label>
                    </div>
                </>
            })}
        </div>
    </>
}