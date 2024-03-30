import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IsLogin, NaviPage, RootHome, Search } from "./RootRedux";
import { get, post } from "../config/req";

interface Infor {
  pathImage: string;
  Name: string;
  Vertify: string;
}
export default function Header() {
  const [show, SetShow] = useState(false);
  const [name, SetName] = useState("");
  const page = useSelector((state: RootHome) => state.rootHome.page);
  const dispatch = useDispatch();
  const [infor, SetInfor] = useState<Infor>({
    Name: "",
    pathImage: "",
    Vertify: "",
  });
  useEffect(() => {
    get("/user", (v: any) => {
      dispatch(IsLogin(v.err));
      if (!v.err) {
        SetInfor(v.u);
      }
    });
  }, []);
  return (
    <div className="sticky top-0 left-0 px-5 py-4 bg-[#121212] space-y-2">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex space-x-3 bg-[#121212] items-center">
          <button className="bg-[#121212] rounded-full size-[28px] flex justify-center items-center">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              className="fill-white size-4"
              viewBox="0 0 16 16"
            >
              <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
            </svg>
          </button>
          <button className="bg-[#121212] rounded-full size-[28px] flex justify-center items-center">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              className="fill-white size-4"
              viewBox="0 0 16 16"
            >
              <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
            </svg>
          </button>
          <div
            onClick={() => {
              dispatch(NaviPage("genre"));
            }}
            className="flex items-center border-white border-2 px-3 bg-[#2A2A2A] rounded-full"
          >
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
              onChange={(v) => {
                var value = v.currentTarget.value;
                if (value.length < 2) {
                  dispatch(NaviPage("genre"));
                  return;
                }
                dispatch(NaviPage("search"));
                dispatch(Search(value));
              }}
              type="text"
              className="searchname p-3 text-white w-[300px] bg-[#2A2A2A] border-[#2A2A2A]  focus:outline-none border-2 rounded-full"
            />
          </div>
        </div>

        <div className="flex bg-[#121212] items-center">
          <div className="text-sm font-bold bg-white text-black rounded-3xl px-2 py-1">
            Khám phá Premium
          </div>
          <div className="text-sm font-bold bg-black text-white rounded-3xl px-2 py-1">
            Cài đặt ứng dụng
          </div>
          <div className="relative">
            <div
              onClick={() => {
                SetShow(!show);
              }}
              className="text-[14px]"
            >
              <img
                className="size-[40px] rounded-full cursor-pointer"
                src={infor.pathImage}
                alt=""
                srcSet=""
              />
            </div>
            {show ? (
              <div className="bg-[#000000] z-[1000] p-1 rounded-lg min-w-[200px] text-[16px] absolute top-full right-0">
                <div className="text-white  cursor-pointer hover:bg-[#3E3E3E]">
                  <div className="p-2">Tài khoản </div>
                </div>
                <div
                  onClick={() => {
                    post("/auth/logout", {}, (e: any) => {
                      window.location.replace("/auth");
                    });
                  }}
                  className="text-white cursor-pointer hover:bg-[#3E3E3E]"
                >
                  <div className="p-2">Đăng xuất </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {page != "playlist" ? (
        <div className="w-full bg-[#121212]  flex items-center space-x-2">
          <div className="bg-white text-[14px]  rounded-full px-2 py-1 w-max font-bold">
            Tất cả
          </div>
          <div className="bg-[#121212] text-[14px] rounded-full  text-white p-2 w-max font-bold">
            Nhạc
          </div>
          <div className="bg-[#121212] text-[14px] rounded-full text-white p-2 w-max font-bold">
            Podcasts
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
