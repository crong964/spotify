import { post } from "@/page/config/req";
import React from "react";
import { Button, BoxButton } from "./Interface";

export function ButtonChat(d: Button) {
  return (
    <div
      className="w-full flex bg-black hover:bg-[#2A2A2A] font-mono p-2 justify-around cursor-pointer"
      onClick={d.onClick}
    >
      {d.children}
      <div>{d.text}</div>
    </div>
  );
}
export function BoxButton(params: BoxButton) {
  switch (params.show) {
    case true:
      return (
        <div className="flex flex-col absolute top-1/3 min-w-[70%] right-8">
          <div className=" bg-black z-10 p-3 rounded-lg flex flex-col">
            <ButtonChat onClick={() => {}} text="Ẩn thông báo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </ButtonChat>
            <ButtonChat
              text="Xóa hộp thoại"
              onClick={() => {
                post(
                  "/box/remove",
                  {
                    idBox: params.idBox,
                  },
                  (n: any) => {
                    window.location.reload();
                    params.SetShow(false);
                  }
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </ButtonChat>
          </div>
        </div>
      );
    default:
      return <></>;
  }
}
