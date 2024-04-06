"use client"
import { optionColors } from "@/utils/optionColors";
import { useEffect } from "react";

const Question = (params:{
    question: any
}) => {
    const options = params.question.options;
    const colors = optionColors;

    useEffect(() => {
        setTimeout(() => {
            console.log("time up")
        }, params.question.timeOut * 1000);
    }, [params.question.timeOut])

    const submitAnswer = (optionId: string) => {
        console.log(optionId)
        // Socket submit Answer
    }

    return (
        <>
        <div className="bg-slate-200 p-4 rounded-md font-semibold text-xl">{params.question.title}</div>
        <div className="mt-6 w-full">
            {options.map((option: any, index: number) => {
                return (
                    <div key={option.id} className={`${colors[index]} p-4 rounded-md font-semibold text-xl mt-1`} onClick={()=>{submitAnswer(option.id)}}>{option.title}</div>
                )
            })}
        </div>
        </>
    )
}

export default Question