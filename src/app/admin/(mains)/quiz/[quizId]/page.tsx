import BasicModal from "@/components/Modal"
import AddQuesForm from "@/components/Admin/Quiz/AddQuesForm"
import AllQues from "@/components/Admin/Quiz/AllQues"
import QuizInfoSection from "@/components/Admin/Quiz/QuizInfoSection"
import { ToastContainer } from "react-toastify"
import ClientImage from "@/components/ClientImage"

function Quiz({ params }: { params: { quizId: string } }) {

    return (
    <div className="w-full bg-off-white dark:bg-dark h-full">
        <div className="p-2 px-4">
            <ClientImage
                props={{
                    src: "/logo.svg",
                    darksrc: "/logo-dark.svg",
                    alt: "Buzzr Logo",
                    width: 80,
                    height: 80
                }}
            />
        </div>
        <div className="text-dark dark:text-white w-full h-full flex">
            <QuizInfoSection quizId={params.quizId} />
            <div className="bg-white dark:bg-off-dark w-full p-2">
                {/* <BasicModal btnTitle="+Add Question">
                    <AddQuesForm quizId={params.quizId} />
                </BasicModal> */}
                <AllQues quizId={params.quizId} />
            </div>
        </div>
        <ToastContainer />
    </div>
    )
}

export default Quiz

