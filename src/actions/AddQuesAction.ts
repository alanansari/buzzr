"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default async function addQues(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const option1 = formData.get("option1") as string;
    const option2 = formData.get("option2") as string;
    const option3 = formData.get("option3") as string;
    const option4 = formData.get("option4") as string;
    const time = formData.get("time") as string;
    const quizId = formData.get("quiz_id") as string;
    const correct_option = formData.get("choose_option") as string;
    var options = [
      { title: option1, isCorrect: correct_option === "a" ? true : false },
      { title: option2, isCorrect: correct_option === "b" ? true : false },
      { title: option3, isCorrect: correct_option === "c" ? true : false },
      { title: option4, isCorrect: correct_option === "d" ? true : false },
    ];
    var fileLink = "",
      fileType = "";
    const file = formData.get("file") as File;
    if (file.size != 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, function (error, result) {
            if (error) {
              reject(error);
            }
            fileLink = result?.secure_url || "";
            fileType = result?.resource_type || "";
            resolve(result);
          })
          .end(buffer);
      });
    }
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/api/auth/signin");
    await prisma.question.create({
      data: {
        title,
        options: {
          create: options,
        },
        quizId: quizId,
        timeOut: parseInt(time),
        media: fileLink,
        mediaType: fileType,
      },
    });
    revalidatePath("/quiz/[quizId]");
  } catch (err:any) {
    console.log("77", err);
    return {
      error: err.message,
    };
  }
}
