"use client"
import Image from "next/image"

const BackNavButton = () => {
  return (
    <>
        <Image
            src="/arrow-back.svg"
            width={30}
            height={30}
            alt="Logo"
            className="m-4 hover:cursor-pointer dark:text-white"
            onClick={() => { window.history.back() }}
        />
    </>
  )
}

export default BackNavButton