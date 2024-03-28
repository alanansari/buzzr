import Link from "next/link";

export default function Home() {
  return (
    <div className="py-12 px-8 h-full ">
      <h1>Choose One of the following</h1>
      <div className="flex flex-row w-full items-center justify-center gap-x-12">
        <Link href={"/admin"}>
          <button className="w-28 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-all rounded shadow ">Presenter</button>
        </Link>
        <Link href={"/player"}>
          <button className="w-28 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-all rounded shadow ">Player</button>
        </Link>
      </div>
    </div>
  );
}
