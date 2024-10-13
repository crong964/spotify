import { RandomPlayIcon } from "@/icon/Icon";
import { RootHome } from "@/page/Route/home/RootRedux";

import React from "react";
import { useSelector } from "react-redux";

export default function ButtonRandomPlay() {
  const random = useSelector((state: RootHome) => state.audioroot.random);

  if (!random) {
    return (
      <RandomPlayIcon className="fill-white size-8 sm:size-4"></RandomPlayIcon>
    );
  }
  return (
    <RandomPlayIcon className="fill-[#1CCA5A] size-8 sm:size-4"></RandomPlayIcon>
  );
}
