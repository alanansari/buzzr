// import PlayerConnection from "@/components/Player/PlayerSktConnection"
import createPlayer from "@/actions/CreatePlayerAction"
import InputField from "@/components/InputField"
import SubmitButton from "@/components/SubmitButton"
import SelectProfile from "../../components/Player/selectProfile"

function Player() {

    return <>
        {/* <PlayerConnection /> */}
        <div className="flex flex-col justify-center items-center px-8 py-12 w-full h-full">
            <h1 className="mb-6 text-3xl font-semibold uppercase">Buzzr</h1>
            <form className="flex flex-col justify-center items-center px-8 py-4 min-w-80 w-full max-w-96 shadow-inner rounded bg-gradient-to-b from-gray-300 to-gray-700"
                action={createPlayer}
            >
                <label className="text-lg text-center bg-transparent ">Enter Username</label>
                <InputField
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className=" w-full border-2 border-slate-800 p-2 capitalize mb-6 focus:shadow-md"
                    required
                    autoComplete="off"
                    style="playerName"
                />

                <label className="text-lg text-center w-full bg-transparent">Select Profile Picture</label>
                <SelectProfile />
                <SubmitButton />
            </form>
        </div>
    </>
}

export default Player


// issues -> after signup redirect to admin page
