import React from "react";
import { SearchButtom } from "./SearchButtom";
import { MobileMessButtom } from "./Mess";
import NaviLoveSong from "./NaviLoveSong";
import { RootHome } from "@/page/home/RootRedux";
import { useSelector } from "react-redux";
import Home from "./Home";

export function NaviHomeMobile() {
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
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
