import { createPortal } from "react-dom";
import { PiPWindowProps } from "./Type";
import React from "react";

export default function PiPWindow({ pipWindow, children }: PiPWindowProps) {
  if (pipWindow == null) {
    return <></>;
  }
  return createPortal(children, pipWindow.document.body);
}
