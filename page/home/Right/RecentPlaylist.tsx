import { useEffect, useState } from "react";
import PlayButtom from "../../component/PlayButtom";
import React from "react";
import { post } from "../../config/req";
import { useDispatch } from "react-redux";
import { NaviPage } from "../RootRedux";

interface RecentPlaylist {
  ID: string;
  name: string;
  type: "artise" | "playlist";
  image: string;
}
interface List {
  children: React.JSX.Element[];
}
export function RecentPlaylist(params: RecentPlaylist) {
  const dispatch = useDispatch();
  const [hidden, SetHidden] = useState(true);
  return (
    <div
      className="flex items-center space-x-1 sm:space-x-2 p-1 mx-1 cursor-pointer bg-[#414854] relative"
      onMouseEnter={() => {
        SetHidden(false);
      }}
      onMouseLeave={() => {
        SetHidden(true);
      }}
      onClick={() => {
        dispatch(NaviPage({ page: params.type, param: params.ID }));
      }}
    >
      <div className="size-10 sm:size-[64px]">
        {params.type == "artise" ? (
          <img className="rounded-full" src={params.image} alt="" srcSet="" />
        ) : (
          <img src={params.image} alt="" srcSet="" />
        )}
      </div>
      <div className="text-white text-[16px] font-bold ">{params.name}</div>
      <div className="hidden sm:block size-6"></div>
      {hidden ? (
        <></>
      ) : (
        <div className="absolute right-0 bottom-0 sm:block hidden">
          <PlayButtom status="pause" />
        </div>
      )}
    </div>
  );
}
export default function RecentList() {
  const [recentList, SetRecentList] = useState<RecentPlaylist[]>([]);
  useEffect(() => {
    post("recentPlaylist/getAll", {}, (v: any) => {
      if (!v.err) {
        SetRecentList(v.ls);
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 py-2">
      {recentList.map((v) => {
        return (
          <RecentPlaylist
            ID={v.ID}
            key={v.ID}
            image={v.image}
            name={v.name}
            type={v.type}
          />
        );
      })}
    </div>
  );
}
