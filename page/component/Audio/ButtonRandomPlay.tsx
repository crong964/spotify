import { RandomPlayIcon } from "@/icon/Icon";
import { RootHome } from "@/page/Route/home/RootRedux";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RandomSong } from "./AudioRedux";
interface iButtonRandomPlay {
  className?: string;
}
export default function ButtonRandomPlay({ className }: iButtonRandomPlay) {
  const random = useSelector((state: RootHome) => state.audioroot.random);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(RandomSong());
      }}
    >
      {!random ? (
        <RandomPlayIcon
          className={`${
            className ? className : "  size-8 sm:size-4"
          } fill-white `}
        />
      ) : (
        <RandomPlayIcon
          className={`${
            className ? className : " size-8 sm:size-4"
          } fill-[#1CCA5A]`}
        />
      )}
    </button>
  );
}
