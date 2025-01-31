import { createPortal } from "react-dom";

import React from "react";
import { iPop } from "./interface";

export default function Pop(p: iPop) {
  return createPortal(
    <div style={{ top: p.top, left: p.left }} className=" absolute z-[1000] ">
      {p.children}
    </div>,
    document.body
  );
}
