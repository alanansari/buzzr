import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const addBuzzr = async (formData: FormData) => {
    "use server";
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) redirect("/api/auth/signin");

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        },
    });

    await prisma.quiz.create({
        data: {
            title,
            description,
            userId: user?.id as string,
        },
    });

    revalidatePath("/","page");
};

export default addBuzzr;