"use client"

import Image from "next/image"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const Links = [
  {
    name: "Donate",
    link: "#",
    icon: "/donate.svg",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/_buzzr/",
    icon: "/instagram.svg",
  },
  {
    name: "Discord",
    link: "#",
    icon: "/discord.svg",
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/@BuzznoldBuzzenegger",
    icon: "/youtube.svg",
  },
  {
    name: "Github",
    link: "https://github.com/alanansari/buzzr",
    icon: "/github.svg",
  },
  {
    name: "Software Incubator",
    link: "https://silive.in/",
    icon: "/incubator.svg",
  }
]

const Footer = () => {
  return (
    <div className="flex p-2 px-8 justify-start z-50 items-center text-sm text-[#94959c] dark:text-off-white w-full absolute bottom-0">
      {Links.map((link, index) => (
        <Link href={link.link} key={index} target="_blank">
          <div className="hidden md:flex items-center justify-center mr-2">
            <Image 
              src={link.icon} 
              alt={link.name}
              width={18}
              height={18} 
            />
            <span className="text-xs px-1 hidden md:inline">{link.name}</span>
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