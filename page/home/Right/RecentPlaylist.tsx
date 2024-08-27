import { useEffect, useState } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import React from "react";
import { post } from "@/page/config/req";
import { useDispatch } from "react-redux";
import { NaviPage } from "@/page/home/RootRedux";
import { Link } from "react-router-dom";

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
      <Link
        to={`${params.Type}/${params.ID}`}
        className="flex items-center space-x-1 sm:space-x-2 p-2 mx-1 cursor-pointer bg-[#1A1A1A] "
        onClick={() => {
          dispatch(
            NaviPage({
              page: params.Type as any,
              param: params.ID,
            })
          );
        }}
      >
        <>
          {params.Type == "artist" ? (
            <img
              className="rounded-full size-10 lg:size-[60px] "
              src={params.ImagePath}
              alt=""
              srcSet=""
            />
          ) : (
            <img
              className=" size-10 lg:size-[60px]"
              src={params.ImagePath}
              alt=""
              srcSet=""
            />
          )}
        </>
        <div className="text-white text-base font-bold line-clamp-2">
          {params.PlayListName}
        </div>
        <div className="hidden sm:block size-6"></div>
      </Link>

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
