"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import {GoogleGenerativeAI} from "@google/generative-ai";

const addQuestionsByAI = async (formData: FormData) => {
    try {
        console.log("hit");

        const description = formData.get("description") as string;
        const questions = Number(formData.get("questions"));
        const time = Number(formData.get("time"));

        const session = await getServerSession(authOptions);
        if (!session || !session.user) redirect("/api/auth/signin");

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

        const prompt = `Create a multiple choice question for the following description: ${description}.
        The question should have 4 options and the correct answer should be the first option.
        Give the response in the following format:
        Question: question-text?
        Option 1: option1-text
        Option 2: option2-text
        Option 3: option3-text
        Option 4: option4-text
        don't add any extra text other than the question and options.`;

        const questionsArray = [];
        for (let i = 0; i < questions; i++) {
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            questionsArray.push(response);
            // const responseArray = response.choices[0].text.split("\n");
            // const question = responseArray[0].split(":")[1].trim();
            // const options = responseArray.slice(1).map((option) => option.split(":")[1].trim());
            // const correctAnswer = options[0];
            // questionsArray.push({question, options, correctAnswer, time: defaultTime});
        }

        return { questions: questionsArray };
    } catch (err: any) {
        return { error: err.message };
    }
}

export default addQuestionsByAI;