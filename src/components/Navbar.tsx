"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const NavLinks = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/reports", label: "Reports" },
  { href: "/discovery", label: "Disccovery" },
];

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="p-2 flex items-center border-b">
      <div className="flex mr-auto">
        {NavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="py-2 px-4 border-[1.5px] border-white rounded-full text-sm flex items-center mr-5 hover:bg-white hover:text-slate-950 transition-colors duration-200 ease-in-out"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Image
        src={session?.user?.image || ""}
        className="rounded-full mr-2"
        alt="Profile Picture"
        width={40}
        height={40}
      />
      <button
        className="border-[1.5px] text-sm rounded-full py-2 px-4 mx-2 hover:bg-white hover:text-slate-950 transition-colors duration-200 ease-in-out"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
