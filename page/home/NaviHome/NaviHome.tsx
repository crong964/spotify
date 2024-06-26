import React from "react";
import { SearchButtom } from "./SearchButtom";
import { MobileMessButtom } from "./Mess";
import NaviLoveSong from "./NaviLoveSong";
import { RootHome } from "../RootRedux";
import { useSelector } from "react-redux";
import Home from "./Home";

export function NaviHomeMobile() {
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  return (
    <div
      className={
        `${isLogin ? "grid grid-cols-4 p-1 h-[9%] " : "grid grid-cols-2"} ` +
        "sticky top-0 bottom-0 text-[10px] sm:hidden"
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
