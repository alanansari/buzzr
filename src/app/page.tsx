import Counter from "@/components/Counter";
import Buzzrs from "@/components/Home/Buzzrs";
import Modal from "@/components/Modal";
import CreateBuzzrForm from "@/components/Home/CreateBuzzrForm";

export default function Home() {
  return (
    <div>
      <Buzzrs />
      <Modal btnTitle="Crate Buzzr">
        <CreateBuzzrForm />
      </Modal>
      <Counter />
    </div>
  );
}
