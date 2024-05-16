import { useEffect, useState } from "react";
import PlayButtom from "./PlayButtom";
import React from "react";
import { get } from "../config/req";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "./RootRedux";
import { Artists } from "../component/Artist";

interface SetionList {
  name: string;
  type: "artist" | "album" | "normal";
}
export function SetionList(params: SetionList) {
  const [artist, SetaAtist] = useState<SetionData[]>([]);
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  useEffect(() => {
    get("/user/artist", (v: any) => {
      SetaAtist(v.ls);
    });
  }, []);
  return <Artists d={artist}></Artists>;
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
        dispatch(NaviPage({ page: "artise", param: params.id }));
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
            <PlayButtom />
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
