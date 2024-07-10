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
  style?: string,
  accept?: string,
  textarea?: boolean,
  onTitleChange?: any,
  label: string
}) => {
  const { pending } = useFormStatus()
  const [value, setValue] = useState('');

  useEffect(() => {
    if (pending)
      setValue('');
  }, [pending])

  function handleInput(e: any) {
    if (props.onTitleChange) {
      props.onTitleChange(e.target.value)
    }
    setValue(e.target.value)

  }

  return <div className="flex flex-col mb-3">
    <label className="text-sm dark:text-white mb-0">{props.label}</label>
    {props.textarea ? <textarea
      name={props.name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      required={props.required || false}
      className={`${props.className} text-slate-900 my-2 rounded-lg px-4 py-3 focus:bg-[#EEEEF0] focus:outline-none focus:dark:bg-[#27272A] max-h-40 min-h-20`}
      maxLength={20}

    />
      :
      <input
        type={props.type}
        name={props.name}
        value={value}
        onChange={handleInput}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        required={props.required || false}
        className={`${props.style === "playerName" && "w-full border-black border-2 focus:border-blue-600 rounded-lg outline-none md:w-4/5"} text-slate-900 my-2 rounded-full px-4 py-3 ${props.style === "question" ? "w-4/5" : "w-full"}  ${props.accept && "text-white"} ${props.className} focus:bg-[#EEEEF0] focus:outline-none focus:dark:bg-[#27272A]`}
        accept={props.accept}
        maxLength={40}
      />
    }
  </div>
}

export default InputField