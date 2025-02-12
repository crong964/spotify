import React, { useEffect, useState } from "react";
const PlayButtom = React.lazy(() => import("@/page/component/PlayButtom"));
import { useDispatch, useSelector } from "react-redux";
import { post } from "@/page/config/req";
import { Link } from "react-router-dom";
import { RootHome } from "@/page/Route/home/RootRedux";
import { Avatar } from "@/page/component/avatar";
import { iPlayList } from "./interface";

export default function PlayList(d: iPlayList) {
  const [show, SetShow] = useState(false);
  const playing = useSelector((state: RootHome) => state.rootHome.playing);
  const stopAudio = useSelector((state: RootHome) => state.audioroot.stop);
  const dispatch = useDispatch();
  return (
    <div
      {...d}
      onClick={() => {
        if (d.click) {
          d.click(d.id);
        }
      }}
      onMouseEnter={() => {
        SetShow(true);
      }}
      onMouseLeave={() => {
        SetShow(false);
      }}
      className="inline-block relative cursor-pointer bg-black hover:bg-[#1A1A1A] p-1 sm:p-2"
    >
      <Link
        to={`${
          d.Type == "#"
            ? ""
            : `/${d.Type == "artist" ? d.Type : "playlist"}/${d.id}`
        }`}
      >
        <Avatar
          src={d.ImagePath}
          className={`${
            d.Type == "artist" || d.Type == "#"
              ? " rounded-full"
              : " rounded-2xl"
          }`.concat(
            ` ${d.className || " cursor-pointer size-[100px] sm:size-[180px]"} `
          )}
        />
      </Link>
      <div className="text-[16px] mt-2 line-clamp-1 w-[100px] sm:w-[150px] ">
        {d.PlayListName}
      </div>
      {show || (playing.id == d.id && playing.page == d.Type && !stopAudio) ? (
        <div className="hidden sm:block absolute top-[130px] right-0 -z-2">
          <PlayButtom id={d.id} page={d.Type} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
