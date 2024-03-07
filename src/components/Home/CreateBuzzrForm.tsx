import addBuzzr from "./AddBuzzrAction"

const CreateBuzzrForm = () => {
    
  return (
    <form action={addBuzzr} className="flex flex-col justify-center items-center">
        <input
            type="text"
            name="title"
            placeholder="Title"
            className="text-slate-900 my-2 rounded-full p-2"
            required
            autoComplete="off"
        />
        <input
            type="text"
            name="description"
            placeholder="Description"
            autoComplete="off"
            className="text-slate-900 my-2 rounded-full p-2"
        />
        <button
            value="submit"
            className="text-slate-100 bg-blue-500 my-2 rounded-full p-2 w-[60%] hover:cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
            Submit
        </button>
        </form>
  )
}

export default CreateBuzzrForm