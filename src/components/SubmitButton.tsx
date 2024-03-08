"use client"
import { useFormStatus } from "react-dom"

const SubmitButton = () => {
    const {pending} = useFormStatus()
  return (
    <button
        disabled={pending}
        value="submit"
        className="text-slate-100 bg-blue-500 my-2 rounded-full p-2 w-[60%] hover:cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out"
      >
        {(pending)?'Loading...':'Submit'}
    </button>
  )
}

export default SubmitButton