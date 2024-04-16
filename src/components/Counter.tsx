"use client";
import { useState } from "react";


export default function Counter() {

  const [count, setCount] = useState(0);

  return (
    <div className="w-fit mx-auto p-4 border-[1.5px] rounded-2xl">
      <h1 className="text-center text-slate-200">{count}</h1>
      <div className="text-center">
      <button
          className="py-3 px-5 border-[1.5px] m-2 rounded-full text-xs text-slate-200"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <button
          className="py-3 px-5 border-[1.5px] m-2 rounded-full text-xs text-slate-200"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
