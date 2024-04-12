"use client"
import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"

export const RadioField1 = () => {
    const { pending } = useFormStatus()
    const [value, setValue] = useState('');

    useEffect(() => {
        if (pending) {
            setValue('');
            const element = document.getElementById("a") as HTMLInputElement;
            element.checked = false;
        }
    }, [pending])

    return (
        <input required id="a" type="radio" className="mx-2" name="choose_option" value={value} onChange={() => setValue('a')} />
    )
}

export const RadioField2 = () => {
    const { pending } = useFormStatus()
    const [value, setValue] = useState('');

    useEffect(() => {
        if (pending) {
            setValue('');
            const element = document.getElementById("b") as HTMLInputElement;
            element.checked = false;
        }
    }, [pending])

    return (
        <input id="b" required type="radio" className="mx-2" name="choose_option" value={value} onChange={() => setValue("b")} />
    )
}

export const RadioField3 = () => {
    const { pending } = useFormStatus()
    const [value, setValue] = useState('');

    useEffect(() => {
        if (pending) {
            setValue('');
            const element = document.getElementById("c") as HTMLInputElement;
            element.checked = false;
        }
    }, [pending])

    return (
        <input id="c" required type="radio" className="mx-2" name="choose_option" value={value} onChange={() => setValue("c")} />
    )
}

export const RadioField4 = () => {
    const { pending } = useFormStatus()
    const [value, setValue] = useState('');

    useEffect(() => {
        if (pending) {
            setValue('');
            const element = document.getElementById("d") as HTMLInputElement;
            element.checked = false;
        }
    }, [pending])

    return (
        <input id="d" required type="radio" className="mx-2" name="choose_option" value={value} onChange={() => setValue("d")} />
    )
}

