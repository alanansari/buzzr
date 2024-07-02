"use client"
import Image from "next/image"
import { useEffect } from "react"
import { RootState } from "@/state/store"
import { useSelector, useDispatch } from "react-redux"
import { pageTheme,setpageTheme } from "@/state/pageThemeSlice"

const ThemeToggle = () => {

    const theme = useSelector((state: RootState) => state.pageTheme.theme)
    const dispatch = useDispatch()

    useEffect(() => {
        if (theme === pageTheme.dark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

  return (
    <div className="absolute top-1 right-1">
        <Image
            src={`${theme === pageTheme.light ? "/dark-bulb.svg" : "/light-bulb.svg"}`}
            width={40}
            height={40}
            alt="theme-toggle"
            className='hover:cursor-pointer'
            onClick={() => { dispatch(setpageTheme((theme === pageTheme.light) ? pageTheme.dark : pageTheme.light))}}
        />
    </div>
  )
}

export default ThemeToggle