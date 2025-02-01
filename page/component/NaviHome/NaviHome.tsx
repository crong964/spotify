import React from "react";
import { SearchButtom } from "./SearchButtom";
import { MobileMessButtom } from "./Mess";
import NaviLoveSong from "./NaviLoveSong";
import { RootHome } from "@/page/Route/home/RootRedux";
import { useSelector } from "react-redux";
import Home from "./Home";
import { NavLink } from "react-router-dom";
import { MessIcon } from "@/icon/Icon";

export function NaviHomeMobile() {
  const isLogin = useSelector((state: RootHome) => state.rootauth.login.IsLogin);
  return (
    <div
      className={
        `${isLogin ? "grid grid-cols-4 " : "grid grid-cols-2"} ` +
        "text-[10px] sm:hidden "
      }
    >
      <Home />
      <SearchButtom />

      {isLogin ? (
        <>
          <MobileMessButtom />
          <NaviLoveSong />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export function NaviHomeMobile2() {
  const isLogin = useSelector((state: RootHome) => state.rootauth.login.IsLogin);
  return (
    <div
      className={
        `${isLogin ? "grid grid-cols-4 " : "grid grid-cols-2"} ` +
        "text-[10px] sm:hidden "
      }
    >
      <Home />
      <SearchButtom />

      {isLogin ? (
        <>
          <NavLink to="/mobile/chatbox">
            {({ isActive }) => (
              <span className="w-full h-full grid place-items-center grid-cols-1 sm:h-[60px] sm:flex sm:justify-center sm:items-center">
                {isActive ? (
                  <MessIcon className="fill-green-600 size-[32px] sm:size-[20px]"></MessIcon>
                ) : (
                  <MessIcon className="fill-white size-[32px] sm:size-[20px]"></MessIcon>
                )}
                Tin nhắn
              </span>
            )}
          </NavLink>
          <NaviLoveSong />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
