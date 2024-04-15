"use client";
import createPlayer from "@/actions/CreatePlayerAction"
import InputField from "@/components/InputField"
import SubmitButton from "@/components/SubmitButton"
import SelectProfile from "@/components/Player/selectProfile"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

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

  return (
    <form className="flex flex-col justify-center items-center w-full "
        action={clientAction}
    >
        <label className="text-lg text-center bg-transparent ">Enter Username</label>
        <InputField
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full border-2 border-slate-800 p-2 capitalize mb-6 focus:shadow-md"
            required
            autoComplete="off"
            style="playerName"
        />

        <label className="text-lg text-center mt-3 w-full bg-transparent">Select Profile Picture</label>
        <SelectProfile />
        <div className="w-full md:w-4/5">
            <SubmitButton style="game" />
        </div>
    </form>
  )
}

export default CreatePlayerForm