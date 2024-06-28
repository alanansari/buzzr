"use client"
import Image from "next/image"
import { useState,useEffect } from "react"

const ThemeToggle = () => {

    const [theme, setTheme] = useState("light")

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

  return (
    <div className="absolute top-1 right-1">
        <Image
            src={`${theme === "light" ? "/dark-bulb.svg" : "/light-bulb.svg"}`}
            width={40}
            height={40}
            alt="theme-toggle"
            className='hover:cursor-pointer'
            onClick={() => {setTheme(theme === "light" ? "dark" : "light")}}
        />
    </div>
  )
}

export default ThemeToggle