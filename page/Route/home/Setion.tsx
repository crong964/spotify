import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { post } from "@/page/config/req";
import { useDispatch } from "react-redux";
import { NaviPage } from "./RootRedux";

import { iPlayList } from "@/page/component/Playlist/interface";
import { Playlists } from "@/page/component/Playlist";

const PlayButtom = React.lazy(() => import("@/page/component/PlayButtom"));

interface SetionList {
  name: string;
  type: "artist" | "album" | "normal";
  link?: string;
}
export function SetionList(params: SetionList) {
  const [artist, SetaAtist] = useState<iPlayList[]>([]);
  useEffect(() => {
    post("/playlist/NextPlaylistArtist", {}, (v: any) => {
      SetaAtist(v.ls);
    });
  }, []);
  return (
    <div>
      <Playlists
        link={params.link ? params.link : "#"}
        d={artist}
        title="Danh sách nghệ sĩ"
      />
    </div>
  );
}
interface SetionData {
  pathImage: string;
  ChanalName: string;
  artist: string;
  id: string;
  type: string;
  click(url: string): void;
}
export default function SetionData(params: SetionData) {
  const [hidden, SetHidden] = useState(true);

  const dispatch = useDispatch();
  return (
    <div
      className="w-[200px] sm:w-full cursor-pointer relative"
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
      <Link to={`/artist/${params.id}`}>
        <div className="">
          <img
            src={params.pathImage}
            className="w-full rounded-full"
            alt=""
            srcSet=""
          />
        </div>
        <div className="text-[16px] text-white font-bold line-clamp-1">
          {params.ChanalName}
        </div>
        <div className="text-[14px] text-[#b3b3b3] font-normal line-clamp-1">
          {params.type == "artist" ? "nghệ sĩ" : params.artist}
        </div>
      </Link>

      {hidden ? (
        <></>
      ) : (
        <>
          <PlayButtom id={params.id} page="artist" />
        </>
      )}
    </div>
  );
}

export function SetionDataMobile() {}
