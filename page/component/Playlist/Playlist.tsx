import React, { useState } from "react";
const PlayButtom = React.lazy(() => import("@/page/component/PlayButtom"));
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootHome } from "@/page/Redux/RootRedux";
import { Avatar } from "@/page/component/avatar";
import { iPlayList } from "./interface";

export default function PlayList(d: iPlayList) {
  const [show, SetShow] = useState(false);
  const playing = useSelector((state: RootHome) => state.rootHome.playing);
  const stopAudio = useSelector((state: RootHome) => state.audioroot.stop);
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
      className="inline-block relative cursor-pointer w-min bg-black hover:bg-[#1A1A1A] rounded-sm p-1 sm:p-3 sm:p-2"
    >
      <Link to={`${d.Type == "#" ? "" : `/${d.Type}/${d.id}`}`}>
        <Avatar
          src={d.ImagePath}
          className={`${
            d.Type == "artist" || d.Type == "#"
              ? " rounded-full"
              : " rounded-2xl"
          }`.concat(
            ` ${d.className || " cursor-pointer size-[100px] sm:size-[170px]"} `
          )}
        />
      </Link>
      <div className="text-[13px]  sm:text-[16px] mt-2 line-clamp-2 w-full ">
        {d.PlayListName}
      </div>
      {show || (playing.id == d.id && playing.page == d.Type && !stopAudio) ? (
        <div className="hidden sm:block absolute top-[130px] right-3 -z-2">
          <PlayButtom id={d.id} page={d.Type} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
