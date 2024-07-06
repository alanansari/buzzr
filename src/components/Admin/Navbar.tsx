"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import ClientImage from "../ClientImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { navToggle, setNavToggle } from "@/state/admin/navtoggleSlice";

const NavLinks = [
  { href: "/admin", label: "Quizzes" },
  { href: "/admin/library", label: "Settings" }
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const toggle = useSelector((state: RootState) => state.navToggle.toggle);
  const dispatch = useDispatch();

  return (
    <div 
      className={`p-6 px-8 md:flex bg-light-bg md:flex-col h-[100vh] ${(toggle===navToggle.collapse)?"hidden":"absolute md:relative w-[80vw] md:w-[25%] left-0"}`}
    >
      <div className="flex flex-col">
        <div className="flex justify-center pb-8">
          <ClientImage
            props={{
              src: "/logo.svg",
              darksrc: "/logo-dark.svg",
              alt: "Logo",
              width: 80,
              height: 80
            }}
          />
        </div>
        <div className="p-2">
        {NavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`my-1 py-2 px-4 rounded-lg flex items-center ${(pathname != link.href)
              ? "hover:bg-card-light hover:dark:bg-card-dark dark:text-white transition-colors duration-200 ease-in-out"
              : "bg-lprimary text-white dark:bg-dprimary dark:text-dark dark:font-extrabold"
              }`}
            onClick={() => {(toggle===navToggle.collapse)?dispatch(setNavToggle(navToggle.expand)):dispatch(setNavToggle(navToggle.collapse))}}
          >
            {link.label}
          </Link>
        ))}
        </div>
      </div>
      <div className="mt-auto mb-2 pt-6 border-t border-t-gray">
        <div className="flex items-center p-2 px-4 hover:cursor-pointer hover:bg-card-light dark:hover:bg-card-dark rounded-md">
          <Image
            src={session?.user?.image || "/avatar-1577909_1280.webp"}
            className="rounded-full mr-2"
            alt="Profile Picture"
            width={40}
            height={40}
          />
          <span className="text-dark text-md dark:text-white">{session?.user?.name}</span>
        </div>
        <div className="p-2 px-4">
          <button
            className="text-sm text-white dark:text-dark dark:font-bold rounded-lg py-2 px-4 my-2 bg-red-light dark:bg-red-dark w-full"
            onClick={() => signOut()}
          >
            Sign out
          </button>
          <div className="text-xs text-off-dark dark:text-off-white mt-2">Licenced under &copy; Software Incubator
            <br />
            <Link href="#" className="underline underline-offset-1">Donate Us</Link>
            <br/><br />
            Buzzr v2
          </div>
        </div>
      </div>
    </div>
  );
}
