import addBuzzr from "../../../actions/AddBuzzrAction";
import SubmitButton from "../../SubmitButton";
import InputField from "../../InputField";

const CreateBuzzrForm = () => {

  return (
    <form
      action={addBuzzr}
      className="flex flex-col justify-center items-center"
    >
      <InputField
        type="text"
        name="title"
        placeholder="Title"
        className="text-slate-900 my-2 rounded-full p-2"
        required
        autoComplete="off"
      />
      <InputField
        type="text"
        name="description"
        placeholder="Description"
        autoComplete="off"
        className="text-slate-900 my-2 rounded-full p-2"
      />
        <SubmitButton />
    </form>
  );
};

export default CreateBuzzrForm;
