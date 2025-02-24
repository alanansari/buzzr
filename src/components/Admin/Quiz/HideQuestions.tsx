"use client";
import { useEffect } from "react";
import { RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { hideQuestions, setHideQuestions } from "@/state/hideQuestionsSlice";

const HideQuestions = () => {
  const dispatch = useDispatch();

  const visibility = useSelector(
    (state: RootState) => state.hideQuestions.visibility,
  );

  useEffect(()=>{
    if(visibility===hideQuestions.show){
      dispatch(setHideQuestions(hideQuestions.hide));
    }
  },[]);

  const handle = () => {
    dispatch(
      setHideQuestions(
        visibility === hideQuestions.hide
          ? hideQuestions.show
          : hideQuestions.hide,
      ),
    );
  };

  return (
    <div className="flex items-center px-4 py-2 rounded-md hover:bg-cardhover-light dark:hover:bg-cardhover-dark gap-2">
      <div className="text-nowrap">Hide Questions</div>
      <div
        className={`w-8 h-5 rounded-full ${
          visibility === hideQuestions.show ? "bg-[#abacaf]" : "bg-lprimary"
        } hideques:bg-dprimary flex items-center p-1 cursor-pointer`}
        onClick={handle}
      >
        <div
          className={`w-3 h-3 bg-white rounded-full transition-all duration-200 ease-in-out ${
            visibility === hideQuestions.hide ? "ml-[50%]" : "ml-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default HideQuestions;
