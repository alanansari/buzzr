import addBuzzr from "../../../actions/AddBuzzrAction";
import SubmitButton from "../../SubmitButton";
import InputField from "../../InputField";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const CreateBuzzrForm = (params: {
  setTitle: any
}) => {
  const router = useRouter();
  async function clientAction(formData: FormData) {
    const result = await addBuzzr(formData)
    if (result?.error) {
      const errorMsg = result.error || "Something went wrong";
      toast.error(errorMsg);
    } else {
      router.push(`/admin/quiz/${result.quizId}`);
    }
  }

  return (
    <form
      action={clientAction}
      className="flex flex-col w-full md:w-4/5 mt-8"
    >
      <div className="flex flex-col">
        <label className="text-sm dark:text-white mb-0">Quiz title</label>
        <InputField
          type="text"
          name="title"
          placeholder="Enter quiz title"
          className="text-slate-900 my-2 rounded-xl mt-1 border"
          required
          autoComplete="off"
          onTitleChange={params.setTitle}
        />
      </div>
      <div className="flex flex-col my-5">
        <label className="text-sm dark:text-white mb-0">Description (Optional)</label>
        <InputField
          type="text"
          name="description"
          placeholder="Description"
          autoComplete="off"
          className="text-slate-900 mt-1 border rounded-xl "
          textarea={true}
        />
      </div>
      <SubmitButton />
    </form>
  );
};

export default CreateBuzzrForm;
