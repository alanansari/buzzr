import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 h-full">
      <div className="flex justify-center items-center w-full">
        <div className="text">
          BUZZR
        </div>
      </div>

      <div className="flex flex-row w-full justify-end absolute top-10 right-1 sm:right-2">
        <Link href={"/admin"}>
          <button className="w-20 sm:w-24 py-2 bg-none text-indigo-600 hover:text-indigo-800 transition-all text-sm">Create</button>
        </Link>
      </div>
      <div className="flex flex-row w-full items-center justify-center mt-8 overflow-hidden">
        <Link href={"/player"}>
          <button className="w-32 md:w-48 sm:w-40 py-2 sm:py-[14px] bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white text-lg transition-all rounded shadow-lg">Play</button>
        </Link>
      </div>
    </div>
  );
}
