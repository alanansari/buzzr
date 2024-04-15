"use client"

import createPlayer from "@/actions/CreatePlayerAction"
import InputField from "@/components/InputField"
import SubmitButton from "@/components/SubmitButton"
import SelectProfile from "../../components/Player/selectProfile"
import { ToastContainer } from "react-toastify"
import CheckLocalPlayer from "@/components/Player/checkLocalPlayer"
import { useEffect, useState } from "react"

function Player() {

    const [data, setData] = useState({
        name: "",
        errMsg: "",
        err: false
    })

    const rightName = /^[a-z ,.'-]{1,10}$/i;
    useEffect(() => {
        if (data.name && !rightName.test(data.name))
            setData({
                ...data,
                errMsg: "Name must contain only alphabets with a max of 10 characters",
                err: true
            })
        else
            setData({
                ...data,
                errMsg: "",
                err: false
            })
    }, [data.name])

    return <>
        <div className="flex flex-col justify-center items-center">
            <CheckLocalPlayer />
            <h1 className="text-3xl font-semibold uppercase mt-12 text-white">Buzzr !</h1>
            <div className="flex flex-col justify-center items-center px-4 py-6 mx-2 md:mx-0 w-11/12 md:w-2/5 my-6 bg-white rounded-lg">
                <form className="flex flex-col justify-center items-center w-full "
                    action={createPlayer}
                >
                    <label className="text-lg text-center bg-transparent ">Enter Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        className="w-full border-black border-2 focus:border-blue-600 rounded-lg outline-none md:w-4/5 text-slate-900 my-2 p-2"
                        required
                        autoComplete="off"
                        value={data.name}
                        onChange={(e) => setData({
                            ...data,
                            name: e.target.value
                        })}
                    />
                    {data.err && <span className="text-center text-red-500 font-Roboto text-xs">{data.errMsg}</span>}
                    <label className="text-lg text-center mt-3 w-full bg-transparent">Select Profile Picture</label>
                    <SelectProfile />
                    <div className="w-full md:w-4/5">
                        <SubmitButton style="game" error={data.err} />
                    </div>
                </form>
            </div>
        </div>
        <ToastContainer />
    </>
}

export default Player
