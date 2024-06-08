import { useEffect, useState } from "react";
import PlayButtom from "../component/PlayButtom";
import React from "react";
import { get, post } from "../config/req";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "./RootRedux";
import { Artists } from "../component/Artist";
import PlayLists, { PlayList } from "../component/Playlist";

interface SetionList {
  name: string;
  type: "artist" | "album" | "normal";
}
export function SetionList(params: SetionList) {
  const [artist, SetaAtist] = useState<PlayList[]>([]);
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  useEffect(() => {
    post("/playlist/NextPlaylistArtist", {}, (v: any) => {
      SetaAtist(v.ls);
    });
  }, []);
  return <PlayLists d={artist} title="Danh sách nghệ sĩ"></PlayLists>;
}
interface SetionData {
  pathImage: string;
  ChanalName: string;
  artist: string;
  id: string;
  type: string;
}
export default function SetionData(params: SetionData) {
  const [hidden, SetHidden] = useState(true);

  const dispatch = useDispatch();
  return (
    <div
      className="w-[200px] sm:w-full cursor-pointer"
      onClick={() => {
        dispatch(NaviPage({ page: "artist", param: params.id }));
      }}
      onMouseEnter={() => {
        SetHidden(false);
      }}
      onMouseLeave={() => {
        SetHidden(true);
      }}
    >
      <div className="relative">
        <img
          src={params.pathImage}
          className="w-full rounded-full"
          alt=""
          srcSet=""
        />
        {hidden ? (
          <></>
        ) : (
          <div className="absolute right-0 bottom-0">
            <PlayButtom id={params.id} page="artist" />
          </div>
        )}
      </div>
      <div className="text-[16px] text-white font-bold line-clamp-1">
        {params.ChanalName}
      </div>
      <div className="text-[14px] text-[#b3b3b3] font-normal line-clamp-1">
        {params.type == "artist" ? "nghệ sĩ" : params.artist}
      </div>
    </div>
  );
}
