"use client";
import joinRoom from '@/actions/JoinRoomAction';
import SubmitButton from '@/components/SubmitButton';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const JoinRoomForm = (params:{
    playerId: string
}) => {
    const router = useRouter();
    async function clientAction(formData: FormData) {
        const result = await joinRoom(formData)
        if (result?.error) {
            const errorMsg = result.error || "Something went wrong";
            toast.error(errorMsg);
        }else{
            router.push(`/player/play/${result.playerId}`);
        }
    }
  return (
    <form className="flex flex-col justify-center items-center px-2 py-4 w-full md:w-4/5"
        action={clientAction}
    >
        <label className="text-lg text-center ">Enter the Code to join the quiz</label>
        <p className="text-sm text-slate-600 mt-2 mb-3 text-center">It is on the screen in front of you</p>
        <input
            type="hidden"
            name="playerId"
            value={params.playerId}
        />
        <input
            type="text"
            name="gameCode"
            placeholder="enter room code to join"
            className="w-full border-black border-2 focus:border-blue-600 outline-none text-slate-900 my-2 rounded p-2 capitalize mb-6 focus:shadow-md"
            autoComplete="off"
            required
        />
        <SubmitButton style='game' />
    </form>
  )
}

export default JoinRoomForm