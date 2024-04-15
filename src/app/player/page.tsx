import { ToastContainer } from "react-toastify";
import CheckLocalPlayer from "@/components/Player/checkLocalPlayer";
import CreatePlayerForm from "@/components/Player/Setup/CreatePlayerForm";

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
                <CreatePlayerForm />
            </div>
        </div>
        <ToastContainer />
    </>
}

export default Player
