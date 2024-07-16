import { useDispatch, useSelector } from "react-redux";
import { Page, RootAuth } from "./RootAuth";
import React, { useState } from "react";
import { post } from "@/page/config/req";
import { Link } from "react-router-dom";
export default function Forgot() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootAuth) => state.rootauth.page);
  const [account, SetAccount] = useState("");
  return (
    <div className="bg-[#2A2A2A] flex justify-center h-full sm:items-center">
      <div className="bg-black w-full sm:w-[60%] h-[70%] sm:h-[90%] p-20 rounded-3xl">
        <div className="w-full sm:w-[60%] mx-auto ">
          <div className="text-[32px]  text-center my-3 text-white font-bold">
            Quên mật khẩu
          </div>
          <div className="text-[16px] text-center sm:my-3 text-white font-bold">
            Nhập địa chỉ email hoặc tên người dùng của bạn, sau đó, chúng tôi sẽ
            gửi cho bạn một đường liên kết để lấy lại quyền truy cập vào tài
            khoản.
          </div>
          <div className="text-[14px] font-bold text-white">Email</div>
          <div>
            <input
              type="text"
              onChange={(e) => {
                SetAccount(e.currentTarget.value);
              }}
              placeholder="name@domain.com"
              className="border-2 text-white  bg-black border-white p-3 w-full"
            />
          </div>

          <div
            onClick={() => {
              post("auth/sendcode", { account: account }, (v: any) => {
                if (!v.err) {
                  dispatch(Page("changePassword"));
                } else {
                  alert(v.mess);
                }
              });
            }}
            className="cursor-pointer bg-[#54f68f] hover:bg-[#1FDF64] mt-[20px] p-3 font-bold text-center rounded-full"
          >
            Xác nhận
          </div>
          <Link to="/auth"> 
            <div
              className="text-white hover:text-[#1FDF64] cursor-pointer"
              onClick={() => {
                dispatch(Page("signin"));
              }}
            >
              Đăng nhập
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
