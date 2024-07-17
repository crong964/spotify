import { useDispatch, useSelector } from "react-redux";
import { Page } from "./RootAuth";
import React, { useState } from "react";
import { post } from "@/page/config/req";
import { RootHome } from "@/page/home/RootRedux";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootHome) => state.rootauth.page);
  const [code, SetCode] = useState("");
  const [Password, SetPassword] = useState("");
  const [Password2, SetPassword2] = useState("");
  return (
    <div className="bg-[#2A2A2A] flex  justify-center h-full items-center">
      <div className="bg-black w-[60%] h-[90%] p-20 rounded-3xl">
        <div className="text-[48px] text-center my-3 text-white font-bold">
          Đặt lại mật khẩu
        </div>
        <div className="w-[60%] mx-auto space-y-2">
          <div className="text-[14px] font-bold text-white">Nhập code</div>
          <div>
            <input
              type="text"
              onChange={(v) => {
                SetCode(v.currentTarget.value);
              }}
              placeholder="123456"
              className="border-2 text-white  bg-black border-white p-3 w-full"
            />
          </div>
          <div className="text-[14px] font-bold text-white">Mật khẩu</div>
          <div>
            <input
              type="text"
              onChange={(v) => {
                SetPassword(v.currentTarget.value);
              }}
              placeholder="name@domain.com"
              className="border-2 text-white  bg-black border-white p-3 w-full"
            />
          </div>

          <div className="text-[14px] font-bold text-white">
            Mật khẩu xác nhận
          </div>
          <div>
            <input
              type="text"
              onChange={(v) => {
                SetPassword2(v.currentTarget.value);
              }}
              placeholder="name@domain.com"
              className="border-2 text-white  bg-black border-white p-3 w-full"
            />
          </div>

          <div
            onClick={() => {
              post(
                "auth/vertifycode",
                {
                  Password: Password,
                  code: code,
                },
                (v: any) => {
                  if (!v.err) {
                    dispatch(Page("signin"));
                  } else {
                    alert(v.mess);
                  }
                }
              );
            }}
            className="cursor-pointer bg-[#54f68f] hover:bg-[#1FDF64] mt-5 p-3 font-bold text-center rounded-full"
          >
            Thay đổi mật khẩu
          </div>
        </div>
      </div>
    </div>
  );
}
