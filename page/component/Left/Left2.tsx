import Home from "@/page/Route/home/NaviHome/Home";
import { MobileSearchButtom } from "@/page/Route/home/NaviHome/SearchButtom";
import { RootHome } from "@/page/Route/home/RootRedux";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Libarary } from "@/page/component/libarary";
import NaviLoveSong from "@/page/Route/home/NaviHome/NaviLoveSong";
import PlaylistLike from "@/page/Route/home/NaviHome/PlaylistLike";
import { SetExtend } from "./LeftRedux";

export default function Left2() {
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );

  const dispatch = useDispatch();
  return (
    <div
      title="left"
      className={`hidden sm:block px-1 space-y-1 w-[80px] `}
    >
      <div className="h-[20%] bg-[#121212] rounded-lg p-0 sm:py-2">
        <div className="h-full  ">
          <Home />
          <MobileSearchButtom />
        </div>
      </div>
    </div>
  );
}
export function Left3() {
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const dispatch = useDispatch();
  return (
    <div
      title="left"
      className={`hidden sm:block px-1 space-y-1 w-[80px] `}
    >
      {isLogin ? (
        <div className="relative h-[80%] overflow-y-auto bg-[#121212] rounded-lg pb-2 ">
          <div onClick={() => { }} className="sticky z-20 top-0 bg-black">
            <Libarary />
          </div>
          <NaviLoveSong />
          <PlaylistLike />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
