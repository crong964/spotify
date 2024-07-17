import React, { useEffect } from "react";
import { useState } from "react";
import { SignUpGitHubButtom, SignUpGoogleButtom } from "./SignButtom";
import { post } from "@/page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { Infor, Page } from "./RootAuth";
import { Eye, EyeSlashIcon, LogoIcon } from "@/icon/Icon";
import { Link } from "react-router-dom";
import { RootHome } from "../home/RootRedux";
type User = {
  Password: string;
  Account: string;
  Name: string;
  token: string;
  code: string;
};
export default function Signup() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootHome) => state.rootauth.page);
  const [user, SetUser] = useState<User>({
    Account: "",
    Name: "",
    Password: "",
    token: "",
    code: "",
  });
  const [eye, SetEye] = useState(false);
  const [infor, SetInfor] = useState(false);

  const SubmitCodeVertifyEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post("/auth/sendCodeVertifyEmail", { account: user.Account }, (v: any) => {
      if (!v.err) {
        SetInfor(!v.err);
        SetUser({
          ...user,
          token: v.token,
        });
      } else {
        alert("taì khoản đã tồn tại");
      }
    });
  };
  const SubmitCreateACC = (e: any) => {
    e.preventDefault();
    post("/auth/createACC", user, (v: any) => {
      if (v.err) {
        alert("Không đăng ký được hãy thử lại");
      } else {
        alert("đăng ký thành công");
      }
    });
  };
  useEffect(() => {
    post("/auth/getdata", {}, (v: any) => {
      if (!v.err) {
        dispatch(Page("createAccount"));
        dispatch(Infor(v));
        console.log(v);
      }
    });
  }, []);
  return (
    <div className="bg-[#2A2A2A] flex  justify-center h-max items-center">
      <div className="bg-black w-[80] h-full p-2 sm:p-20 rounded-3xl">
        <div className="text-[48px] text-center sm:my-3 text-white font-bold">
          Đăng ký vào Spotify
        </div>
        <div className="w-[90%] sm:w-[70%] mx-auto space-y-2">
          <>
            {!infor ? (
              <form onSubmit={SubmitCodeVertifyEmail}>
                <div className="text-[14px] font-bold text-white">
                  Email hoặc tên người dùng
                </div>
                <input
                  type="text"
                  name="account"
                  value={user.Account}
                  onChange={(v) => {
                    var f = v.currentTarget.value;
                    SetUser({
                      ...user,
                      Account: f,
                    });
                  }}
                  placeholder="name@domain.com"
                  className="border-2 text-white  bg-black border-white rounded-lg p-3 w-full"
                />
                <button className="cursor-pointer w-full bg-[#54f68f] hover:bg-[#1FDF64] mt-5 p-3 font-bold text-center rounded-full">
                  Tiếp theo
                </button>
              </form>
            ) : (
              <form onSubmit={SubmitCreateACC}>
                <div className="text-[14px] font-bold text-white">
                  Email hoặc tên người dùng
                </div>
                <input
                  type="text"
                  readOnly
                  value={user.Account}
                  onChange={(v) => {
                    var f = v.currentTarget.value;
                    SetUser({
                      ...user,
                      Account: f,
                    });
                  }}
                  placeholder="name@domain.com"
                  className="border-2 text-white  bg-black border-white rounded-lg p-3 w-full"
                />
                <div className="text-[14px] font-bold text-white">
                  Mật khẩu người dùng
                </div>
                <div className="border-2 rounded-2xl text-white flex cursor-pointer  border-white p-3 w-full">
                  <input
                    type={eye ? "text" : "password"}
                    className="focus:outline-none bg-black flex-1"
                    value={user.Password}
                    onChange={(v) => {
                      var f = v.currentTarget.value;
                      SetUser({
                        ...user,
                        Password: f,
                      });
                    }}
                    placeholder="***********"
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

                <div className="text-[14px] font-bold text-white">
                  Tên Người Dùng
                </div>
                <input
                  type="text"
                  value={user.Name}
                  onChange={(v) => {
                    var f = v.currentTarget.value;
                    SetUser({
                      ...user,
                      Name: f,
                    });
                  }}
                  placeholder=""
                  className="border-2 text-white rounded-2xl bg-black border-white p-3 w-full"
                />
                <div className="text-[14px] font-bold text-white">
                  Mã xác thực
                </div>
                <input
                  type="text"
                  value={user.code}
                  onChange={(v) => {
                    var f = v.currentTarget.value;
                    SetUser({
                      ...user,
                      code: f,
                    });
                  }}
                  placeholder=""
                  className="border-2 text-white rounded-2xl bg-black border-white p-3 w-full"
                />
                <button className="cursor-pointer w-full bg-[#54f68f] hover:bg-[#1FDF64] mt-5 p-3 font-bold text-center rounded-full">
                  Đăng ký
                </button>
              </form>
            )}
          </>
        </div>

        <div className="border border-white opacity-30 my-5 "></div>
        <SignUpGoogleButtom />
        <SignUpGitHubButtom />
        <div className="border border-white opacity-30 my-5 "></div>
        <div className="text-[16px] text-white font-normal text-center space-x-2">
          <span className="text-[#A7A7A7]"> Bạn đã có tài khoản?</span>
          <Link to="/auth">
            <span
              onClick={() => {
                dispatch(Page("signin"));
              }}
              className=" hover:text-[#1CD159] cursor-pointer"
            >
              Đăng nhập tại đây.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
