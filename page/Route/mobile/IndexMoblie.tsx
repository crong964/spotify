import PlayingBar from "@/page/component/Audio/PlayingBar";
import { NaviHomeMobile, NaviHomeMobile2 } from "@/page/component/NaviHome/NaviHome";
import React from "react";
import { Outlet } from "react-router-dom";

export default function IndexMoblie() {
  return (
    <div className="h-[100hv] w-[100hv] self-stretch">
      <Outlet></Outlet>
      <div className="absolute  sm:block z-40 left-0 bottom-0 w-full py-0 sm:py-2 px-2">
        <div className="hidden"> <PlayingBar /></div>
        <NaviHomeMobile2 />
      </div>
    </div>
  );
}
