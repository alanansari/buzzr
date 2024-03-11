// Form for add question

import SubmitButton from "../SubmitButton";
import InputField from "../InputField";
import { FormLabel, Switch } from '@mui/material';
import addQues from "./AddQuesAction";

const AddQuesForm = () => {

    return (
        <form
            action={addQues}
            className="flex flex-col justify-center mx-auto px-1"
        >
            <FormLabel className="text-white mt-3">Question</FormLabel>
            <InputField
                type="text"
                name="title"
                placeholder="Title"
                className="text-slate-900 my-2 rounded-full p-2 outline-none"
                required
                autoComplete="off"
            />
            {/* <FormLabel className="text-white mt-3" >Upload Image/Video/Audio</FormLabel>
            <label htmlFor="uploadFile">
                <div className="text-gray-400 my-2 rounded-full p-2 w-full bg-white h-10" >Upload file</div>
                <input type="file" name="file" id="uploadFile" hidden />
            </label> */}
            <FormLabel className="text-white mt-3">Enter options</FormLabel>
            <div className="grid grid-cols-2 gap-x-2">
                <InputField
                    type="text"
                    name="option1"
                    placeholder="Enter option 1"
                    autoComplete="off"
                    className="text-slate-900 my-2 rounded-full p-2 outline-none"
                />
                <Switch name="check_option1" />
                <InputField
                    type="text"
                    name="option2"
                    placeholder="Enter option 2"
                    autoComplete="off"
                    className="text-slate-900 my-2 rounded-full p-2"
                />
                <Switch name="check_option2" />
                <InputField
                    type="text"
                    name="option3"
                    placeholder="Enter option 3"
                    autoComplete="off"
                    className="text-slate-900 my-2 rounded-full p-2"
                />
                <Switch name="check_option3" />
                <InputField
                    type="text"
                    name="option4"
                    placeholder="Enter option 4"
                    autoComplete="off"
                    className="text-slate-900 my-2 rounded-full p-2"
                />
                <Switch name="check_option4" />
            </div>
            <div className="text-center mt-2">
                <SubmitButton />
            </div>
        </form>
    );
};

export default AddQuesForm;
