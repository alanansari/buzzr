import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 h-full">
      <div className="flex flex-row w-full items-center justify-center mt-8 overflow-hidden">
        <Link href={"/player"}>
          <button className="w-44 md:w-48 sm:w-44 py-4 sm:py-[14px] bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white text-lg transition-all rounded shadow-lg">Play</button>
        </Link>
      </div>
      <div className="flex flex-row w-full text-sm justify-center absolute bottom-5 left-1 sm:left-2">
        <Link href={"/admin"}>
          <button className="w-40 py-2 bg-none text-indigo-700 hover:text-indigo-800 transition-all text-sm">Create Buzzr</button>
        </Link>
      </div>
    </div>
  );
}
