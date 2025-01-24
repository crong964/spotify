import { post } from "@/page/config/req";
import { SetMess } from "@/page/Route/home/RootRedux";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SendMessData } from "./interface";


export function SendMess(data: SendMessData) {
  const dispatch = useDispatch();
  const [text, SetText] = useState("");
  const SubmitSendMess = (e: any) => {
    e.preventDefault();
    if (text.length <= 0) {
      return;
    }
    //         idBox: string;
    // idUser: string;
    // content: string;

    post(
      "/mess/send",
      {
        idBox: data.idbox,
        content: text,
      },
      (v: any) => {
        SetText("");
      }
    );
  };
  return (
    <div className="chat h-[10%] sm:h-auto bg-black">
      <form onSubmit={SubmitSendMess} className="flex p-2 ">
        <input
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              SetMess({
                content: "",
                idBox: data.idbox,
                idMess: "",
                idUser: "",
                ngay: "",
                type: "",
              })
            );
          }}
          type="text"
          placeholder="Aa"
          className="focus:outline-none  mess w-11/12 bg-black rounded-lg border-0 "
          value={text}
          onChange={(inputData) => {
            SetText(inputData.currentTarget.value);
          }}
        />
        <button className="bg-white rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-black hover:fill-blue-600"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
