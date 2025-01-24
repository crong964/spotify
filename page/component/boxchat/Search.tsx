import { useDispatch } from "react-redux";
import { SetSearchName } from "@/page/Route/home/RootRedux";
import React from "react";

export interface search {
    set(a: boolean): void;
  }
export function Search(d: search) {
  return (
    <div className="flex items-center border-white border-2 px-3 bg-[#2A2A2A] rounded-full">
      <svg
        data-encore-id="icon"
        fill="white"
        role="img"
        aria-hidden="true"
        className="size-[16px] "
        viewBox="0 0 16 16"
      >
        <path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path>
      </svg>
      <input
        onClick={() => {
          d.set(true);
        }}
        type="text"
        placeholder="tìm kiếm"
        className="searchname p-1 text-white w-[300px] bg-[#2A2A2A] border-[#2A2A2A]  focus:outline-none border-2 rounded-full"
      />
    </div>
  );
}
export function Searching(d: search) {
  const dch = useDispatch();
  return (
    <div className="flex items-center justify-around">
      <div
        onClick={() => {
          d.set(false);
        }}
        className=" bg-black hover:bg-[#2A2A2A] p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="white"
          className="size-[20px] "
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <input
        onChange={(e) => {
          var t = e.currentTarget.value;
          if (t.length <= 0) {
            return;
          }

          dch(SetSearchName(t));
        }}
        type="text"
        placeholder="tìm kiếm"
        className="searchname p-2 text-white w-[300px] bg-[#2A2A2A] border-white  focus:outline-none border-2 rounded-full"
      />
    </div>
  );
}
