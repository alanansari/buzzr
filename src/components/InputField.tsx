"use client"
import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"

const InputField = (props: {
  type: string,
  name: string,
  placeholder: string,
  autoComplete: string,
  className: string,
  required?: boolean,
  style?: string
}) => {
  const { pending } = useFormStatus()
  const [value, setValue] = useState('');

  useEffect(() => {
    if (pending)
      setValue('');
  }, [pending])

  return (
    <input
      type={props.type}
      name={props.name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      required={props.required || false}
      className={`${props.style === "playerName" && "w-full"} text-slate-900 my-2 rounded-full p-2`}
    />
  )
}

export default InputField