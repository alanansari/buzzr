import Buzzrs from "@/components/Admin/Home/Buzzrs";
import Modal from "@/components/Modal";
import CreateBuzzrForm from "@/components/Admin/Home/CreateBuzzrForm";

export default function Home() {
  return (
    <div className="text-slate-200">
      <Buzzrs />
      <Modal btnTitle="Create Buzzr">
        <CreateBuzzrForm />
      </Modal>
    </div>
  );
}
