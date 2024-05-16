import React, { useEffect, useState } from "react";
import PlayButtom from "./PlayButtom";
import { NaviPage, RootHome } from "../home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../config/req";

export interface PlayList {
  id: string;
  Genre_ID: string;
  ImagePath: string;
  PlayListName: string;
}
interface PlayLists {
  d: PlayList[];
  title: string;
}
export function PlayList(d: PlayList) {
  const [show, SetShow] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className=" overflow-hidden">
      <div
        className="cursor-pointer relative"
        onMouseEnter={() => {
          SetShow(true);
        }}
        onMouseLeave={() => {
          SetShow(false);
        }}
        onClick={() => {
          dispatch(
            NaviPage({
              page: "playlist",
              param: d.id,
            })
          );
        }}
      >
        <img
          src={d.ImagePath}
          className="rounded-2xl size-[150px] sm:size-full "
          alt=""
          srcSet=""
        />
        {show ? (
          <div className="absolute bottom-0 right-0">
            <PlayButtom status="pause"/>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="text-[16px] line-clamp-1 w-[150px]">{d.PlayListName}</div>
    </div>
  );
}
interface PlayLists {
  d: PlayList[];
  title: string;
}
export default function PlayLists(p: PlayLists) {
  var children = p.d.map((v) => {
    return (
      <PlayList
        Genre_ID={v.Genre_ID}
        ImagePath={v.ImagePath}
        PlayListName={v.PlayListName}
        id={v.id}
        key={v.id}
      />
    );
  });
  const Right = useSelector((s: RootHome) => s.rootHome.Right);
  return (
    <div className="w-full overflow-auto sm:overflow-hidden relative">
      {children.length > 0 ? (
        <div className="text-[24px] font-bold my-5 sticky top-0 left-0">{p.title}</div>
      ) : (
        <></>
      )}
      <div
        className={`flex w-max sm:w-full overflow-x-scroll sm:grid gap-2 ${
          Right == "" ? "grid-cols-7" : "grid-cols-5 "
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function SuggestPlaylist() {
  const [playlists, SetPlayLists] = useState<PlayList[]>([]);
  useEffect(() => {
    post("/playlist/Nextplaylist", {}, (v: any) => {
      SetPlayLists(v.ls);
    });
  }, []);

  return <PlayLists d={playlists} title="Danh sách đề cử" />;
}
