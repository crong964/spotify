import { RandomPlayIcon } from "@/icon/Icon";
import { RootHome } from "@/page/home/RootRedux";
import React from "react";
import { useSelector } from "react-redux";

export default function ButtonRandomPlay() {
  const random = useSelector((state: RootHome) => state.audioroot.random);
  const devicetype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  if (!random) {
    return (
      <RandomPlayIcon
        className={`${
          devicetype == "pc" ? "fill-white size-4" : "fill-white size-8"
        }`}
      ></RandomPlayIcon>
    );
  }
  return (
    <RandomPlayIcon
      className={`${
        devicetype == "pc" ? "fill-[#1CCA5A] size-4" : "fill-[#1CCA5A] size-8"
      }`}
    ></RandomPlayIcon>
  );
}
