"use client"

import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const Links = [
  {
    name: "Donate",
    link: "/donate",
    icon: "/donate.svg",
  },
  {
    name: "Instagram",
    link: "/instagram",
    icon: "/instagram.svg",
  },
  {
    name: "Discord",
    link: "/discord",
    icon: "/discord.svg",
  },
  {
    name: "Youtube",
    link: "/youtube",
    icon: "/youtube.svg",
  },
  {
    name: "Github",
    link: "/github",
    icon: "/github.svg",
  },
  {
    name: "Software Incubator",
    link: "/incubator",
    icon: "/incubator.svg",
  }
]

const Footer = () => {
  return (
    <div className="hidden md:flex p-2 px-4 justify-start items-center text-sm text-[#94959c] dark:text-off-white w-full">
      {Links.map((link, index) => (
        <Link href={link.link} key={index}>
          <div className="flex items-center justify-center ml-2">
            <Image 
              src={link.icon} 
              alt={link.name}
              width={18}
              height={18} 
            />
            <span className="text-xs px-1">{link.name}</span>
          </div>
        </Link>
      ))}
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Footer