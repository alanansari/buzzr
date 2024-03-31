"use client"
import { useFormStatus } from "react-dom"

const SubmitButton = (params:{
  text?: string,
  style?: string
}) => {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      value="submit"
      className={`${params.style === "game" ? "rounded w-full" : "rounded-full w-[60%]"} text-slate-100 bg-blue-500 my-2 p-2 hover:cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out`}
    >
      {(pending) ? 'Loading...' : params.text || 'Submit'}
    </button>
  )
}

export default SubmitButton