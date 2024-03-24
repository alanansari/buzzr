import InputField from "@/components/InputField"
import SubmitButton from "@/components/SubmitButton"

function JoinRoom() {
    return <>
        <div className="flex flex-col justify-center items-center px-8 py-16 w-full h-full">
            <h1 className="mb-6 text-2xl font-semibold">Buzzr</h1>
            <form className="flex flex-col justify-center items-center px-2 py-4"
            >
                <label className="text-lg text-center">Enter the Code to join the quiz</label>
                <p className="text-sm text-slate-600 mt-1 mb-2 text-center">It is on the screen in front of you</p>
                <input
                    type="text"
                    name="Room Code"
                    placeholder="enter room code to join"
                    className="w-full text-slate-900 my-2 rounded border-2 border-slate-800 p-2 capitalize mb-6 focus:shadow-md"
                    required
                    autoComplete="off"
                />
                <SubmitButton />
            </form>
        </div>
    </>
}

export default JoinRoom