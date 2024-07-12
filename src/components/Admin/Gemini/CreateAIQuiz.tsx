"use client"

import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import { Box, Modal } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import style from "@/utils/modalStyle"

export default function CreateAIQuiz(props: { children?: React.ReactNode }) {

    const [open, setOpen] = useState(false)
    return <>
        <div
            className="p-2 border border-[#c2b4fe] dark:border-transparent h-[50vh] w-full md:h-44 md:w-40 text-dark dark:text-white rounded flex flex-col justify-center items-center bg-gradient-to-b from-[#8D6DDD] to-[#AD56D6] cursor-pointer"
            onClick={() => setOpen(true)}
        >
            <div className="h-full w-full flex justify-center items-center">
                <Image
                    src="/AIQuiz.svg"
                    alt="AI Quiz"
                    width={45}
                    height={45} />
            </div>
            <div className="text-xs font-bold w-full text-white">Create a quiz with AI</div>
            <div className="text-xs w-full text-white">Let&apos;s get your quiz ready</div>
        </div>

        <Modal
            open={open}
            onClose={() => { setOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="dark:bg-[#27272A] rounded-xl w-4/5 md:w-1/2">
                <div className="p-6">
                    <p className="text-xl font-bold mb-2">Hey there! I&apos;m your AI quiz buddy.</p>
                    <p className="text-[#4E4E56] mb-4">Ready to get started? Just jot down your requirements below to begin the quiz!</p>
                    <form>
                        <InputField type="text"
                            name="quiz"
                            placeholder="Example: “My 20th Bday Quiz”"
                            className="text-slate-900 my-2 rounded-xl mt-1 border"
                            required
                            autoComplete="off"
                            label="Name your quiz" />
                        <InputField
                            type="text"
                            name="description"
                            placeholder="Description"
                            autoComplete="off"
                            className="text-slate-900 mt-1 border rounded-xl "
                            textarea={true}
                            label="Quiz questions description"
                        />

                        <div className="grid grid-cols-2 gap-x-3">
                            <InputField type="text"
                                name="quiz"
                                placeholder="Example: 15"
                                className="text-slate-900 my-2 rounded-xl mt-1 border"
                                required
                                autoComplete="off"
                                label="Write number of quiz questions." />
                            <InputField type="text"
                                name="quiz"
                                placeholder="Example: 15"
                                className="text-slate-900 my-2 rounded-xl mt-1 border"
                                required
                                autoComplete="off"
                                label="Write down default question time (in seconds)" />
                        </div>

                        <SubmitButton />
                    </form>
                </div>
                {/* {props.children} */}
            </Box>
        </Modal>
    </>
}