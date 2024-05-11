import React from "react";
import { Home, NewHome } from "./Home";
import { NewSearchButtom, SearchButtom } from "./SearchButtom";

export function NaviHomeMobile() {
  return (
    <div className="grid  grid-cols-4 p-1 static top-0 bottom-0 text-[10px] sm:hidden">
      
      <NewHome />
      <NewSearchButtom />
      
    </div>
  );
}
