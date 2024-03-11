import AddQuesSection from "@/components/Quiz/AddQuesSection"
import QuizInfoSection from "@/components/Quiz/QuizInfoSection"

function Quiz({ params }: { params: { quizId: string } }) {

    return <>
        <div className="px-12 py-12">
            <QuizInfoSection quizId={params.quizId} />
            <AddQuesSection />
        </div>

        {/* <BasicModal btnTitle="Add Question">
            <AddQuesForm />
        </BasicModal> */}
    </>
}

export default Quiz


// server actions to add question -> get quizId ?
// fetch all questions
// styling of modal