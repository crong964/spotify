import React from "react";
import { iAvatar } from "./interface";
import { MusicNoteBeamedIcon } from "@/icon/Icon";
import ImagePath from "@/page/config/img";

export default function Avatar({ className, src }: iAvatar) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src == "" ? (
        <MusicNoteBeamedIcon className="size-full bg-black absolute top-0 left-0 z-0" />
      ) : (
        <img
          loading="lazy"
          src={ImagePath(src)}
          className="absolute top-0 left-0 z-0"
          alt=""
          srcSet=""
        />
      )}
    </div>
  );
}
