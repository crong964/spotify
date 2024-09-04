import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { get, post } from "@/page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "./RootRedux";
import { Artists } from "@/page/component/Artist";
import { PlayList } from "@/page/component/Playlist";

const PlayLists = React.lazy(() => import("@/page/component/Playlist"));
const PlayButtom = React.lazy(() => import("@/page/component/PlayButtom"));

interface SetionList {
  name: string;
  type: "artist" | "album" | "normal";
  link?: string;
}
export function SetionList(params: SetionList) {
  const [artist, SetaAtist] = useState<PlayList[]>([]);
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  useEffect(() => {
    post("/playlist/NextPlaylistArtist", {}, (v: any) => {
      SetaAtist(v.ls);
    });
  }, []);
  return (
    <PlayLists
      link={params.link ? params.link : "#"}
      d={artist}
      title="Danh sách nghệ sĩ"
    />
  );
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
