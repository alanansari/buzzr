import createPlayer from "@/actions/CreatePlayerAction"
import InputField from "@/components/InputField"
import SubmitButton from "@/components/SubmitButton"
import SelectProfile from "../../components/Player/selectProfile"
import { ToastContainer } from "react-toastify"

function Player() {
    return <>
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold uppercase mt-12 text-white">Buzzr !</h1>
            <div className="flex flex-col justify-center items-center px-4 py-6 mx-2 md:mx-0 w-11/12 md:w-2/5 my-6 bg-white rounded-lg">
                <form className="flex flex-col justify-center items-center w-full "
                    action={createPlayer}
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
            </div>
        </div>
        <ToastContainer />
    </>
}

export default Player
