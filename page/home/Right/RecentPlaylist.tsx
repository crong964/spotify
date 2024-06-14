import { useEffect, useState } from "react";
import PlayButtom from "../../component/PlayButtom";
import React from "react";
import { post } from "../../config/req";
import { useDispatch } from "react-redux";
import { NaviPage } from "../RootRedux";

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
      <div
        className="flex items-center space-x-1 sm:space-x-2 p-1 mx-1 cursor-pointer bg-[#1A1A1A] "
        onClick={() => {
          dispatch(
            NaviPage({
              page: params.Type as any,
              param: params.ID,
            })
          );
        }}
      >
        <div className="size-10 sm:size-[64px]">
          {params.Type == "artist" ? (
            <img
              className="rounded-full"
              src={params.ImagePath}
              alt=""
              srcSet=""
            />
          ) : (
            <img src={params.ImagePath} alt="" srcSet="" />
          )}
        </div>
        <div className="text-white text-[16px] font-bold ">
          {params.PlayListName}
        </div>
        <div className="hidden sm:block size-6"></div>
      </div>
      {hidden ? (
        <></>
      ) : (
        <button className="absolute right-2 bottom-2 sm:block hidden">
          <PlayButtom id={params.ID} page={params.Type} />
        </button>
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 py-2">
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
