import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { post } from "@/page/config/req";
import { RootHome } from "@/page/Route/home/RootRedux";
import { Page } from "./RootAuth";
export default function CreateAccount() {
  const dispatch = useDispatch();
  const [Password, SetPassword] = useState("");

  const page = useSelector((state: RootHome) => state.rootauth.page);
  const int = useSelector((state: RootHome) => state.rootauth);
  const [Name, SetName] = useState(int.Name);
  return (
    <div className="bg-[#2A2A2A] flex  justify-center h-full items-center">
      <div className="bg-black w-[60%] h-[90%] p-20 rounded-3xl">
        <div className="text-[48px] text-center my-3 text-white font-bold">
          Điền thông tin
        </div>
        <div className="w-[60%] mx-auto space-y-2">
          <img
            src={int.pathImage}
            className="size-8 rounded-lg"
            alt=""
            srcSet=""
          />
          <div className="text-[14px] font-bold text-white">Tên người dùng</div>
          <input
            type="text"
            onChange={(e) => {
              SetName(e.currentTarget.value);
            }}
            value={Name}
            className="border-2 text-white  bg-black border-white p-3 w-full"
          />
          <div className="text-[14px] font-bold text-white">
            Email hoặc tên người dùng
          </div>
          <input
            disabled
            type="text"
            value={int.Account}
            className="border-2 text-white  bg-black border-white p-3 w-full"
          />
          <div className="text-[14px] font-bold text-white">Mật khẩu</div>
          <input
            type="text"
            value={Password}
            onChange={(e) => {
              SetPassword(e.currentTarget.value);
            }}
            className="border-2 text-white  bg-black border-white p-3 w-full"
          />

          <div
            onClick={() => {
              if (Password.length < 6) {
                alert("Mật khẩu phải lớn hơn 6");
                return;
              }
              post(
                "/auth/create",
                {
                  Name: Name,
                  pathImage: int.pathImage,
                  Account: int.Account,
                  Password: Password,
                  sign: int.Sign,
                },
                (v: any) => {
                  if (!v.err) {
                    dispatch(Page("signin"));
                  } else {
                    alert("lỗi");
                  }
                }
              );
            }}
            className="cursor-pointer bg-[#54f68f] hover:bg-[#1FDF64] mt-5 p-3 font-bold text-center rounded-full"
          >
            Đăng ký
          </div>
        </div>

        <div className="text-[16px] text-white font-normal text-center space-x-2">
          <span className="text-[#A7A7A7]"> Bạn đã có tài khoản?</span>
          <span
            onClick={() => {
              dispatch(Page("signin"));
            }}
            className=" hover:text-[#1CD159] cursor-pointer"
          >
            Đăng nhập tại đây.
          </span>
        </div>
      </div>
    </div>
  );
}
