import React, { useEffect, useState } from "react";
const PlayButtom = React.lazy(() => import("@/page/component/PlayButtom"));
import { useDispatch, useSelector } from "react-redux";
import { post } from "@/page/config/req";
import { Link } from "react-router-dom";
import { NaviPage, RootHome } from "../Route/home/RootRedux";

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
  const playing = useSelector((state: RootHome) => state.rootHome.playing);
  const stopAudio = useSelector((state: RootHome) => state.audioroot.stop);
  const dispatch = useDispatch();
  return (
    <div
      onMouseEnter={() => {
        SetShow(true);
      }}
      onMouseLeave={() => {
        SetShow(false);
      }}
      className=" relative cursor-pointer bg-black hover:bg-[#1A1A1A] p-1 sm:p-2"
    >
      <div
        className={`${
          d.Type == "artist" ? "rounded-full" : " rounded-2xl"
        }`.concat(
          " cursor-pointer relative size-[150px] sm:size-[180px] overflow-hidden "
        )}
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
            className="size-full absolute top-0 left-0 z-1"
            alt=""
            srcSet=""
          />
        </Link>
      </div>
      <div className="text-[16px] mt-2 line-clamp-1 w-[150px] ">
        {d.PlayListName}
      </div>
      {show || (playing.id == d.id && playing.page == d.Type && !stopAudio) ? (
        <div className="absolute top-[130px] right-0 z-[2]">
          <PlayButtom id={d.id} page={d.Type} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
interface PlayLists {
  d: PlayList[];
  title: string;
  link?: string;
}
export default function PlayLists(p: PlayLists) {
  var children = p.d
    .filter((v, i) => {
      return i < 7;
    })
    .map((v) => {
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

  return (
    <>
      {children.length > 0 ? (
        <>
          <div className="w-full">
            <div className="w-full flex justify-between items-center p-2">
              <Link
                to={p.link || "#"}
                className="text-[24px] font-bold border-0 sm:border-2 border-black hover:border-b-white"
              >
                {p.title}
              </Link>
              {children.length >= 7 ? (
                <Link
                  className="text-[#B3B3B3] text-[14px] font-bold border-0 sm:border-2 border-black hover:border-b-[#B3B3B3]"
                  to={p.link || "#"}
                >
                  Hiện tất cả
                </Link>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full overflow-auto sm:overflow-hidden">
              <div className={`flex w-max overflow-x-scroll `}>{children}</div>
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
