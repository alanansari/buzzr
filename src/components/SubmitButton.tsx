"use client"
import { setCurrIndex, setLeaderboard, setPlayers, setResult } from "@/state/admin/playersSlice"
import { useFormStatus } from "react-dom"
import { useDispatch } from "react-redux"

const SubmitButton = (params: {
  text?: string,
  style?: string,
  isQuiz?: boolean
}) => {
  const { pending } = useFormStatus()
  const dispatch = useDispatch()

  function handleRedux() {
    if (params.isQuiz) {
      dispatch(setPlayers([]))
      dispatch(setLeaderboard([]))
      dispatch(setResult([]))
      dispatch(setCurrIndex(0))
    }
  }
  return (
    <button
      disabled={pending}
      value="submit"
      className={`${params.style === "game" ? "rounded w-full" : "rounded-full w-[60%]"} text-slate-100 bg-blue-500 my-2 p-2 hover:cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out`}
      onClick={handleRedux}
    >
      {(pending) ? 'Loading...' : params.text || 'Submit'}
    </button>
  )
}

export default SubmitButton