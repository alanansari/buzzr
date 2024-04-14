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
            className="flex flex-col justify-center mx-auto px-1"
        >
            <input type="text" className="hidden" name="quiz_id" value={props.quizId} />
            <FormLabel className="text-white mt-2">Question</FormLabel>
            <InputField
                type="text"
                name="title"
                placeholder="Title"
                className="text-slate-900 my-2 rounded-full p-2 outline-none"
                required
                autoComplete="off"
            />
            <FormLabel className="text-white mt-2" >Upload Image / Video / Audio</FormLabel>
            <InputField type="file" accept="image/*" className="text-white rounded-full p-2 w-full" name="file" placeholder="Select file" autoComplete="off" />
            <p className="text-xs mt-[-8px] text-gray-400">Choose any image or gif of size &lt; 10MB </p>
            <FormLabel className="text-white mt-2">Enter options</FormLabel>
            <div className="grid grid-cols-2 gap-x-2">
                <div>
                    <InputField
                        type="text"
                        name="option1"
                        placeholder="Enter option 1"
                        autoComplete="off"
                        className="text-slate-900 my-2 rounded-full p-2 outline-none w-1/2"
                        style="question"
                        required
                    />
                    <RadioField1 />
                    {/* <input required type="radio" className="mx-2" name="choose_option" value="a" /> */}
                </div>
                <div>
                    <InputField
                        type="text"
                        name="option2"
                        placeholder="Enter option 2"
                        autoComplete="off"
                        className="text-slate-900 my-2 rounded-full p-2"
                        style="question"
                        required
                    />
                    <RadioField2 />
                    {/* <input required type="radio" className="mx-2" id="two" name="choose_option" value="b" /> */}
                </div>
                <div>
                    <InputField
                        type="text"
                        name="option3"
                        placeholder="Enter option 3"
                        autoComplete="off"
                        className="text-slate-900 my-2 rounded-full p-2"
                        style="question"
                        required
                    />
                    <RadioField3 />
                    {/* <input required type="radio" className="mx-2" name="choose_option" value="c" /> */}
                </div>
                <div>
                    <InputField
                        type="text"
                        name="option4"
                        placeholder="Enter option 4"
                        autoComplete="off"
                        className="text-slate-900 my-2 rounded-full p-2"
                        style="question"
                        required
                    />
                    <RadioField4 />
                    {/* <input required type="radio" className="mx-2" name="choose_option" value="d" /> */}
                </div>
            </div>
            <FormLabel className="text-white mt-2">Question Time</FormLabel>
            <InputField
                type="number"
                name="time"
                placeholder="question time"
                className="text-slate-900 my-2 rounded-full p-2 outline-none"
                required={false}
                autoComplete="off"
            />

            <div className="text-center mt-2">
                <SubmitButton />
            </div>
        </form>
    </>
};

export default AddQuesForm;
