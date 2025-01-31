import React from "react";
import { iAvatar } from "./interface";
import { MusicNoteBeamedIcon } from "@/icon/Icon";

export default function Avatar(p: iAvatar) {
  return (
    <div className={`relative overflow-hidden ${p.className}`}>
      {p.src == "" ? (
        <MusicNoteBeamedIcon className="size-full bg-black absolute top-0 left-0 z-0" />
      ) : (
        <img
          src={p.src}
          className="absolute top-0 left-0 z-0"
          alt=""
          srcSet=""
        />
      )}
    </div>
  );
}
