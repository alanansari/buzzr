import Counter from "@/components/Counter";
import Buzzrs from "@/components/Admin/Home/Buzzrs";
import Modal from "@/components/Modal";
import CreateBuzzrForm from "@/components/Admin/Home/CreateBuzzrForm";

export default function Home() {
  return (
    <div>
      <Buzzrs />
      <Modal btnTitle="Create Buzzr">
        <CreateBuzzrForm />
      </Modal>
      <Counter />
    </div>
  );
}
