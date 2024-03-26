"use client"
import { useFormStatus } from "react-dom"

const SubmitButton = ({ style }: { style?: string }) => {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      value="submit"
      className={`${style === "game" ? "rounded w-full" : "rounded-full w-[60%]"} text-slate-100 bg-blue-500 my-2 p-2 hover:cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out`}
    >
      {(pending) ? 'Loading...' : 'Submit'}
    </button>
  )
}

export default SubmitButton