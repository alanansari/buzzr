"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="p-2 flex items-center border-b">
      <Link
        className="py-1 px-2 border rounded-lg text-sm flex items-center mr-auto"
        href="/"
      >
        Home
      </Link>
      <Image
        src={session?.user?.image || ""}
        className="rounded-[100%] mr-2"
        alt="Profile Picture"
        width={40}
        height={40}
      />
      <button className="border rounded-md p-1 mx-2" onClick={() => signOut()}>
        Sign out
      </button>
    </div>
  );
}
