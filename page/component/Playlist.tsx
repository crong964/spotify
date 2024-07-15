import React, { useEffect, useState } from "react";
import PlayButtom from "./PlayButtom";
import { NaviPage, RootHome } from "@/page/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { post } from "@/page/config/req";
import { Link } from "react-router-dom";

export interface PlayList {
  id: string;
  Genre_ID: string;
  ImagePath: string;
  PlayListName: string;
  Type: string;
}
interface PlayLists {
  d: PlayList[];
  title: string;
}
export function PlayList(d: PlayList) {
  const [show, SetShow] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className=" overflow-hidden bg-black hover:bg-[#1A1A1A] p-3 rounded-lg">
      <div
        className="cursor-pointer relative"
        onMouseEnter={() => {
          SetShow(true);
        }}
        onMouseLeave={() => {
          SetShow(false);
        }}
      >
        <Link to={`/${d.Type}/${d.id}`}>
          <img
            onClick={() => {
              dispatch(
                NaviPage({
                  page: d.Type as any,
                  param: d.id,
                })
              );
            }}
            src={d.ImagePath}
            className={`${
              d.Type == "artist" ? "rounded-full" : " rounded-2xl"
            }`.concat(" size-[150px] sm:size-full")}
            alt=""
            srcSet=""
          />
        </Link>
        {show ? (
          <div className="absolute bottom-0 right-0">
            <PlayButtom id={d.id} page={d.Type} />
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
        Type={v.Type}
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
    <>
      {children.length > 0 ? (
        <>
          <div className="w-full overflow-auto sm:overflow-hidden relative ">
            <div className="text-[24px] font-bold my-5 sticky top-0 left-0">
              {p.title}
            </div>
            <div
              className={`flex w-max sm:w-full overflow-x-scroll sm:grid gap-2 grid-cols-7`}
            >
              {children}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
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
