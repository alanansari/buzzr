// 2nd section to add quiz
"use client"

import * as React from "react"
import AddModal from "@/components/Admin/Quiz/AddModal"
import AddQuesForm from "@/components/Admin/Quiz/AddQuesForm"

export default function AddQuesSection() {
    const [open, setOpen] = React.useState(false)
    function handleOpen() {
        setOpen(true)
    }
    return <>
        <div className="py-4 relative pb-12 border-dashed border-b">
            <h2 className="text-2xl mb-3 text-blue-300">Do you Want to add more questions to the Quiz ?</h2>
            <p className="text-sm text-gray-200">Click <b className="mx-1">+ Add </b> button to add question</p>
            <button onClick={handleOpen} className="w-28 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-all rounded shadow top-6 absolute right-0 ">+ Add</button>
        </div>

        {/* <AddModal btnTitle="Add Question" open={open} setOpen={setOpen}>
            <AddQuesForm />
        </AddModal> */}
    </>
}