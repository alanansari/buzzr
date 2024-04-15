"use server";
import { prisma } from "@/utils/prisma";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/server/upstash";
import { headers } from "next/headers";

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2,"60s"),
});

const createPlayer = async (formData: FormData) => {
  try{

    const ip = headers().get('x-forwarded-for');
    console.log(ip);

    const {remaining, limit, success} = await rateLimit.limit(ip as string);

    console.log(remaining, limit, success);

    if(!success) {
      throw new Error("Rate limit reached wait for some time and try again.");
    }

    const name = formData.get("username") as string;
    const profilePic = formData.get("profile") as string;

    const player = await prisma.player.create({
      data: {
        name,
        profilePic,
      },
    });

    return { playerId: player.id };
  } catch(err:any) {
    return {error: err.message}
  }
};

export default createPlayer;
