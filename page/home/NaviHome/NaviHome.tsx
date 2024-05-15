import React from "react";
import { Home, NewHome } from "./Home";
import {SearchButtom } from "./SearchButtom";
import { MobileMessButtom } from "./Mess";

export function NaviHomeMobile() {
  return (
    <div className="grid grid-cols-4 p-1 h-[9%] static top-0 bottom-0 text-[10px] sm:hidden">
      <NewHome />
      <SearchButtom />
      <MobileMessButtom/>
    </div>
  );
}
