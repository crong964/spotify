import { RandomPlayIcon } from "@/icon/Icon";
import { RootHome } from "@/page/home/RootRedux";
import React from "react";
import { useSelector } from "react-redux";

export default function ButtonRandomPlay() {
  const random = useSelector((state: RootHome) => state.audioroot.random);
  if (!random) {
    return <RandomPlayIcon className="size-4 fill-white"></RandomPlayIcon>;
  }
  return <RandomPlayIcon className="size-4 fill-[#1CCA5A]"></RandomPlayIcon>;
}
