"use client";
import createPlayer from "@/actions/CreatePlayerAction"
import SubmitButton from "@/components/SubmitButton"
import SelectProfile from "@/components/Player/selectProfile"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";

const CreatePlayerForm = () => {

    const router = useRouter();

    async function clientAction(formData: FormData) {
        const result = await createPlayer(formData)
        if (result?.error) {
            const errorMsg = result.error || "Something went wrong";
            toast.error(errorMsg);
        }else{
            router.push(`/player/joinRoom/${result.playerId}`);
        }
    }

    const [data, setData] = useState({
        name: "",
        errMsg: "",
        err: false
    })

    useEffect(() => {
        const rightName = /^[a-z,0-9,.'-]{1,20}$/i;
        if (data.name && !rightName.test(data.name))
            setData({
                ...data,
                errMsg: "Name must be alphanumeric with a max of 20 characters",
                err: true
            })
        else
            setData({
                ...data,
                errMsg: "",
                err: false
            })
    }, [data.name])

  return (
    <form className="flex flex-col justify-center items-center w-full "
        action={clientAction}
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
  )
}

export default CreatePlayerForm