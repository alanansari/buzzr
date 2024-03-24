import { GiPartyPopper } from "react-icons/gi";

function WelcomePage() {
    return <>
        <div className="flex flex-col justify-center items-center px-8 py-16 w-full h-full">
            <h1 className="mb-6 text-2xl font-semibold">Buzzr</h1>
            <p className="text-4xl text-slate-800 leading-normal flex items-center gap-x-3">Welcome to our Quiz
                <GiPartyPopper size={40} />
            </p>
        </div>
    </>
}

export default WelcomePage