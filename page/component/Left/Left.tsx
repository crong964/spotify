import Home from "@/page/Route/home/NaviHome/Home";
import { MobileSearchButtom } from "@/page/Route/home/NaviHome/SearchButtom";
import { RootHome } from "@/page/Route/home/RootRedux";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Libarary } from "@/page/component/libarary";
import NaviLoveSong from "@/page/Route/home/NaviHome/NaviLoveSong";
import PlaylistLike from "@/page/Route/home/NaviHome/PlaylistLike";
import { SetExtend } from "./LeftRedux";

export default function Left() {
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const extend = useSelector((state: RootHome) => state.leftRedux.extend);
  const dispatch = useDispatch();
  return (
    <nav
      title="left"
      className={`hidden sm:block px-1 space-y-1 ${
        extend ? " w-[280px] " : " w-[80px] "
      }`}
    >
      <div className="h-[20%] bg-[#121212] rounded-lg p-0 sm:py-2">
        <div className="h-full  ">
          <Home />
          <MobileSearchButtom />
        </div>
      </div>
      {isLogin ? (
        <div className="relative h-[80%] overflow-y-auto bg-[#121212] rounded-lg pb-2 ">
          <div
            onClick={() => {
              
            }}
            className="sticky z-20 top-0 bg-black"
          >
            <Libarary />
          </div>
          <NaviLoveSong />
          <PlaylistLike />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
