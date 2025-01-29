import React from "react";
import { iTab } from "./interface";

export default function Tab(p: iTab) {
  return <div {...p}>{p.nameTab}</div>;
}
