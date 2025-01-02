import React from "react";

import { useSelector } from "react-redux";
import { RootHome } from "@/page/Route/home/RootRedux";

import { Song } from "./interface";

const ArtistLink = React.lazy(() => import("@/page/component/ArtistLink"));

export default function Song(d: Song) {
  const devicetype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  return (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (devicetype == "pc") {
          d.onClick();
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (devicetype == "mobile") {
          d.onClick();
        }
      }}
      className="flex justify-center items-center py-2 sm:px-1 sm:py-0  cursor-pointer"
    >
      {d.image != "" && d.image ? (
        <img
          loading="lazy"
          src={d.image}
          alt=""
          srcSet=""
          className="size-[50px] rounded-lg"
        />
      ) : (
        <></>
      )}
      <div className="flex-1 text-white space-y-1 px-1">
        <div className="font-bold text-[13px] sm:text-[16px] line-clamp-1">
          {d.name}
        </div>
        <div className="text-[12px] sm:text-[14px] text-stone-300">
          <ArtistLink idArtist={d.user_id} nameArtist={d.singer} />
        </div>
      </div>
    </div>
  );
}
