import React, { useEffect } from "react";
import { useState } from "react";
import { SignInGitHubButtom, SignInGoogleButtom } from "./SignButtom";
import { useDispatch, useSelector } from "react-redux";

import { post } from "@/page/config/req";
import { Page } from "./RootAuth";
import { Eye, EyeSlashIcon, LogoIcon } from "@/icon/Icon";
import { Link } from "react-router-dom";
import { RootHome } from "@/page/Route/home/RootRedux";
export default function SignIn() {
  const [account, SetAccount] = useState("");
  const [password, SetPassword] = useState("");
  const [on, SetOn] = useState(false);
  const [eye, SetEye] = useState(false);
  const dispatch = useDispatch();
  const page = useSelector((state: RootHome) => state.rootauth.page);
  const submit = (e: any) => {
    e.preventDefault();
    if (account.length <= 0 || password.length <= 0) {
      alert("chưa điền đủ");
      return;
    }
    post(
      "/auth/signin",
      {
        account: account,
        password: password,
      },
      (v: any) => {
        if (v.err) {
          alert(v.mess);
        } else {
          window.location.replace("/");
        }
      }
    );
  };
  useEffect(() => {
    if (window.location.href.indexOf("?dk=yes") >= 0) {
      dispatch(Page("signup"));
    }
  }, []);
  return (
    <div className="bg-[#2A2A2A] flex font-normal justify-center h-full items-center">
      <div className="bg-black w-[90%] sm:w-[60%] h-min-[90%] p-3 sm:p-20 rounded-3xl">
        <div className="text-[30px] sm:text-[48px] text-center my-3 text-white font-bold">
          Đăng nhập vào Spotify
        </div>
        <form
          method="post"
          onSubmit={submit}
          className="w-[90%] sm:w-[50%] mx-auto space-y-2"
        >
          <div className="text-[14px] font-bold text-white">
            Email hoặc tên người dùng
          </div>
          <input
            type="text"
            name="account"
            value={account}
            onChange={(v) => {
              SetAccount(v.currentTarget.value);
            }}
            placeholder="name@domain.com"
            className="border-2 text-white rounded-2xl bg-black border-white p-3 w-full"
          />
          <div className="text-[14px] font-bold text-white">Mật khẩu</div>
          <div className="border-2 rounded-2xl text-white flex cursor-pointer  border-white p-3 w-full">
            <input
              type={eye ? "text" : "password"}
              onChange={(v) => {
                SetPassword(v.currentTarget.value);
              }}
              className="focus:outline-none bg-black flex-1"
            />
            <div
              onClick={() => {
                SetEye(!eye);
              }}
            >
              {eye ? (
                <Eye className="size-6 "></Eye>
              ) : (
                <EyeSlashIcon className="size-6 "></EyeSlashIcon>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="cursor-pointer ">
              <div
                onClick={() => {
                  SetOn(!on);
                }}
                className={`w-[44px] h-[18px] flex  items-center rounded-full p-2  ${
                  on ? "justify-start bg-[#727272]" : "justify-end bg-[#1ED760]"
                }`}
              >
                <div className="size-[14px]  bg-black rounded-full"></div>
              </div>
            </div>
            <div className="text-white text-[14px]">nhớ mật khẩu</div>
          </div>

          <button className="cursor-pointer w-full bg-[#1FDF64] mt-5 p-3 font-bold text-center rounded-full">
            Đăng nhập
          </button>

          <Link to={"/auth/Forgot"}>
            <div
              onClick={() => {
                dispatch(Page("fotgot"));
              }}
              className="text-white hover:text-[#1FDF64] text-center cursor-pointer"
            >
              Quên mật khẩu của bạn?
            </div>
          </Link>
        </form>
        <div className="border border-white opacity-30 my-5 "></div>
        <SignInGoogleButtom />
        <SignInGitHubButtom />
        <div className="border border-white opacity-30 my-5 "></div>
        <div className="text-[16px] text-white font-normal text-center space-x-2">
          <span className="text-[#A7A7A7]">Bạn chưa có tài khoản?</span>
          <Link to="/auth/Signup">
            <span className=" hover:text-[#1CD159] cursor-pointer">
              Đăng ký
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
