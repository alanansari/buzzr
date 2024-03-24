import { prisma } from "@/utils/prisma";

const createPlayer = async (formData: FormData) => {
    "use server";
    const name = formData.get('username') as string;
    const profilePic = formData.get('profile') as string;
    // id from sockets
    const id = "0";

    console.log(name, profilePic, id)
    await prisma.player.create({
        data:{
            id,
            name,
            profilePic
        }
    });

    console.log("yes")

};

export default createPlayer;