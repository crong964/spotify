import React from "react";
import { Pop } from ".";
import { iModal } from "./interface";


export default function Modal(p: iModal) {
  return (
    <Pop top={0} left={0}>
      <div
        onClick={() => {
          p.show(false);
        }}
        onContextMenu={()=>{
          p.show(false);
        }}
        className="h-screen w-screen relative"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ top: p.top, left: p.left,bottom:p.bottom }}
          className="absolute "
        >
          {p.children}
        </div>
      </div>
    </Pop>
  );
}
