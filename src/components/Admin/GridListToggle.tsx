"use client"

import { setGridListToggle } from "@/state/admin/gridListSlice";
import { RootState } from "@/state/store";
import { IoGridOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function GridListToggle() {

    const view = useSelector((state: RootState) => state.gridListToggle.view)
    const dispatch = useDispatch()
    function handleToggle({ view }: { view: string }) {
        dispatch(setGridListToggle(view))
    }
    return <>
        <div className="grid grid-cols-2 bg-card-light dark:bg-[#332D40] rounded h-fit p-2 gap-x-2">
            <div className={` cursor-pointer flex gap-x-1 items-center rounded p-2 ${view === "grid" && "bg-white"}`} onClick={() => { handleToggle({ view: "grid" }) }}>
                <IoGridOutline />
                <span className="dark:text-white hidden md:inline">Grid</span>
            </div>

            <div className={` cursor-pointer flex gap-x-1 items-center p-2 rounded ${view === "list" && "bg-white"}`} onClick={() => { handleToggle({ view: "list" }) }}>
                <IoGridOutline />
                <span className="dark:text-white hidden md:inline">List</span>
            </div>

        </div>
    </>
}