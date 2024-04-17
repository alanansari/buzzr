import { ToastContainer } from "react-toastify";
import CheckLocalPlayer from "@/components/Player/checkLocalPlayer";
import CreatePlayerForm from "@/components/Player/Setup/CreatePlayerForm";

function Player() {

    return <>
        <div className="flex flex-col justify-center items-center max-h-full">
            <CheckLocalPlayer />
            <h1 className="text-3xl font-semibold uppercase mt-12 text-white">Buzzr !</h1>
            <div className="flex flex-col justify-center items-center px-4 py-6 mx-2 md:mx-0 w-11/12 md:w-2/5 my-6 bg-white rounded-lg">
                <CreatePlayerForm />
            </div>
        </div>
        <ToastContainer />
    </>
}

export default Player
