import Buzzrs from "@/components/Admin/Home/Buzzrs";
// import Modal from "@/components/Modal";
// import CreateBuzzrForm from "@/components/Admin/Home/CreateBuzzrForm";
import NavbarToggle from "@/components/Admin/NavbarToggle";

export default function Home() {
  return (
    <div className="p-6 w-full md:w-[75%]">
      <div className="flex">
        <span className="md:hidden inline">
          <NavbarToggle />
        </span>
        <span className="ml-2">
          <p className="dark:text-white text-xs md:text-base">Hey There 👋!</p>
          <h1 className="text-md md:text-3xl font-black md:py-2 dark:text-white">Welcome Back To Your Quiz Hub!</h1>
        </span>
      </div>
      <Buzzrs />
      {/* <Modal btnTitle="Create Buzzr">
        <CreateBuzzrForm />
      </Modal> */}
    </div>
  );
}
