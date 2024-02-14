"use client";
import { increment, decrement } from "@/state/counter/counterSlice";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="w-fit mx-auto">
      <h1 className="text-center">{count}</h1>
      <div className="text-center">
        <button
          className="py-3 px-5 border m-2 rounded-xl text-xs"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="py-3 px-5 border m-2 rounded-xl text-xs"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
    </div>
  );
}
