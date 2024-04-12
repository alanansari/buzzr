// Form for add question
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "../../SubmitButton";
import InputField from "../../InputField";
import { FormLabel, Switch } from '@mui/material';

const AddQuesForm = (props: { quizId: string }) => {

    async function addQues(formData: FormData) {
        "use server";
        const title = formData.get("title") as string;
        // const filetype = formData.get("file") as string
        const option1 = formData.get("option1") as string;
        const option2 = formData.get("option2") as string;
        const option3 = formData.get("option3") as string;
        const option4 = formData.get("option4") as string;

        const check_option1 = formData.get("check_option1") as unknown as boolean;
        const check_option2 = formData.get("check_option2") as unknown as boolean;
        const check_option3 = formData.get("check_option3") as unknown as boolean;
        const check_option4 = formData.get("check_option4") as unknown as boolean;

        var options = [
            { title: option1, isCorrect: check_option1 ? true : false },
            { title: option2, isCorrect: check_option2 ? true : false },
            { title: option3, isCorrect: check_option3 ? true : false },
            { title: option4, isCorrect: check_option4 ? true : false },
        ];

        const session = await getServerSession(authOptions);
        if (!session || !session.user) redirect("/api/auth/signin");

        await prisma.question.create({
            data: {
                title,
                options: {
                    create: options,
                },
                quizId: props?.quizId,
            },
        });

        revalidatePath("/quiz/[quizId]", "page");
    }
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
