import { useEffect, useState } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import React from "react";
import { post } from "@/page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "@/page/Route/home/RootRedux";
import { Link } from "react-router-dom";
import { Avatar } from "@/page/component/avatar";

interface RecentPlaylist {
  User_ID: string;
  ID: string;
  CreateTime: string;
  PlayListName: string;
  Type: string;
  ImagePath: string;
}
interface List {
  children: React.JSX.Element[];
}
export function RecentPlaylist(params: RecentPlaylist) {
  const dispatch = useDispatch();
  const playing = useSelector((state: RootHome) => state.rootHome.playing);
  const stopAudio = useSelector((state: RootHome) => state.audioroot.stop);
  const [hidden, SetHidden] = useState(true);
  return (
    <div
      className="relative"
      onMouseLeave={() => {
        SetHidden(true);
      }}
      onMouseEnter={() => {
        SetHidden(false);
      }}
    >
      <Link
        to={`${params.Type == "artist" ? "artist" : "playlist"}/${params.ID}`}
        className="flex items-center space-x-1 sm:space-x-2 cursor-pointer bg-[#1A1A1A] rounded-xl "
        onClick={() => {}}
      >
        <Avatar className="size-[60px] rounded-xl" src={params.ImagePath} />
        <div className="text-white text-sm sm:text-base font-bold line-clamp-2">
          {params.PlayListName}
        </div>
        <div className="hidden sm:block size-6"></div>
      </Link>

      {!hidden ||
      (playing.id == params.ID && playing.page == params.Type && !stopAudio) ? (
        <button className="absolute right-2 bottom-2 sm:block hidden">
          <PlayButtom id={params.ID} page={params.Type} />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
export default function RecentList() {
  const [recentList, SetRecentList] = useState<RecentPlaylist[]>([]);
  useEffect(() => {
    post("recentPlaylist/getAll", {}, (v: any) => {
      if (v && !v.err) {
        SetRecentList(v.ls);
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-4 sm:px-3">
      {recentList.map((v, i) => {
        return (
          <RecentPlaylist
            CreateTime=""
            User_ID=""
            ID={v.ID}
            key={v.ID + i}
            ImagePath={v.ImagePath}
            PlayListName={v.PlayListName}
            Type={v.Type}
          />
        );
      })}
    </div>
  );
}
