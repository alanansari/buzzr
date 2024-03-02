import Counter from "@/components/Counter";
import Buzzrs from "@/components/Home/Buzzrs";
import CreateBuzzr from "@/components/Home/CreateBuzzr";

export default function Home() {
  return (
    <div>
      <Buzzrs />
      <CreateBuzzr/>
      <Counter />
    </div>
  );
}
