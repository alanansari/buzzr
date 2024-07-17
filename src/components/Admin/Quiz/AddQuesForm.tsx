"use client"

import SubmitButton from "../../SubmitButton";
import InputField from "../../InputField";
import { FormLabel } from '@mui/material';
import { RadioField1, RadioField2, RadioField3, RadioField4 } from "@/components/RadioField";
import addQues from "@/actions/AddQuesAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuesForm = (props: { quizId: string }) => {

    async function clientAction(formData: FormData) {
        const result = await addQues(formData)
        if (result?.error) {
            const errorMsg = result.error || "Something went wrong";
            toast.error(errorMsg)
        }
        else {
            toast.success("Successfully added")
        }
    }
    return <>
        <form
            action={clientAction}
            className="flex flex-col justify-center mx-auto px-1 text-white"
        >
            <input type="text" className="hidden" name="quiz_id" value={props.quizId} />
            <InputField type="text"
                name="title"
                placeholder="Title"
                className="text-dark dark:text-white dark:bg-dark my-2 rounded-xl mt-1 border"
                required
                autoComplete="off"
                label="Question"
                labelClass="text-lg" />
            <InputField label="Upload Image / Video / Audio" type="file" accept="image/*" className="text-dark dark:text-white dark:bg-dark my-2 rounded-xl mt-1 border border-dark dark:border-white" name="file" placeholder="Select file" autoComplete="off" />
            <p className="text-xs mt-[-12px] text-gray-400 text-dark dark:text-white mb-2">Choose any image or gif of size &lt; 10MB </p>
            <FormLabel style={{fontSize:'14px', marginBottom:'4px'}} className="text-sm dark:text-white">Enter options</FormLabel>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-0">
                <div className="relative">
                    <InputField
                        type="text"
                        name="option1"
                        placeholder="Enter option 1"
                        autoComplete="off"
                        className="text-dark dark:text-white dark:bg-dark rounded-xl outline-none border w-full my-0 pr-4"
                        style="question"
                        required
                    />
                    <RadioField1 />
                </div>
                <div className="relative">
                    <InputField
                        type="text"
                        name="option2"
                        placeholder="Enter option 2"
                        autoComplete="off"
                        className="text-dark dark:text-white dark:bg-dark rounded-xl outline-none my-0 border w-full pr-4"
                        style="question"
                        required
                    />
                    <RadioField2 />
                </div>
                <div className="relative">
                    <InputField
                        type="text"
                        name="option3"
                        placeholder="Enter option 3"
                        autoComplete="off"
                        className="text-dark dark:text-white dark:bg-dark rounded-xl outline-none border my-0 w-full pr-4"
                        style="question"
                        required
                    />
                    <RadioField3 />
                </div>
                <div className="relative">
                    <InputField
                        type="text"
                        name="option4"
                        placeholder="Enter option 4"
                        autoComplete="off"
                        className="text-dark dark:text-white dark:bg-dark rounded-xl outline-none border my-0 w-full pr-4"
                        style="question"
                        required
                    />
                    <RadioField4 />
                </div>
            </div>
            <InputField
                type="number"
                name="time"
                placeholder="question time"
                className="text-dark dark:text-white my-2 rounded-xl border dark:bg-dark"
                required={false}
                autoComplete="off"
                label="Question Time"
            />

            <div className="text-center mt-2">
                <SubmitButton />
            </div>
        </form>
    </>
};

export default AddQuesForm;
