import BasicModal from "@/components/Modal"
import AddQuesForm from "@/components/Admin/Quiz/AddQuesForm"
import AllQues from "@/components/Admin/Quiz/AllQues"
import QuizInfoSection from "@/components/Admin/Quiz/QuizInfoSection"
import AddModal from "@/components/Admin/Quiz/AddModal"
import { ToastContainer } from "react-toastify"

function Quiz({ params }: { params: { quizId: string } }) {

    return <>
        <div className="px-12 py-12">
            <QuizInfoSection quizId={params.quizId} />
            <div className="py-4 relative pb-12 border-dashed border-b">
                <h2 className="text-2xl mb-3 text-blue-300">Do you Want to add more questions to the Quiz ?</h2>
                <p className="text-sm text-gray-200 mb-4">Click <b className="mx-1">+ Add Question </b> button to add question</p>
                <BasicModal btnTitle="+Add Question">
                    <AddQuesForm quizId={params.quizId} />
                </BasicModal>
                {/* <AddModal btnTitle="+Add Question" open={true}>
                    <AddQuesForm quizId={params.quizId} />
                </AddModal> */}
            </div>
            <AllQues quizId={params.quizId} />
        </div>
        <ToastContainer />
    </>
}

export default Quiz

