"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import {GoogleGenerativeAI} from "@google/generative-ai";

function shuffleArray(array:any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function parseQuestions(content: string) {
    const questions:any = [];
    const questionBlocks = content.split('\n\n').filter(block => block.trim() !== '');

    questionBlocks.forEach(block => {
        const lines = block.split('\n').filter(line => line.trim() !== '');
        let question = '';
        const options:any = [];

        lines.forEach(line => {
            if (line.startsWith('Question:')) {
                question = line.replace('Question: ', '').trim();
            } else if (line.startsWith('Option')) {
                const option = line.split(': ').slice(1).join(': ').trim();
                options.push({ title: option, isCorrect: false });
            }
        });

        if (question && options.length > 0) {
            options[0].isCorrect = true;
            shuffleArray(options);
            questions.push({ question, options });
        }
    });

    return questions;
}

const addQuestionsByAI = async (quizId: string,formData: FormData) => {
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
        don't add any extra text other than the question and options.
        Generate a total of ${questions} questions only`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        const questionsArray = parseQuestions(response);

        questionsArray.forEach(async (question: any) => {
            await prisma.question.create({
                data: {
                    title: question.question,
                    options: {
                        create: question.options,
                    },
                    quizId: quizId,
                    timeOut: time,
                },
            });
        });

        return { msg: "Questions added successfully", questionsArray };
    } catch (err: any) {
        return { error: err.message };
    }
}

export default addQuestionsByAI;