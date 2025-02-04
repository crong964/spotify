import React, { useEffect, useState } from "react";
const PlayButtom = React.lazy(() => import("@/page/component/PlayButtom"));
import { useDispatch, useSelector } from "react-redux";
import { post } from "@/page/config/req";
import { Link } from "react-router-dom";
import { RootHome } from "@/page/Route/home/RootRedux";
import { Avatar } from "@/page/component/avatar";

export interface iPlayList {
  id: string;
  Genre_ID: string;
  ImagePath: string;
  PlayListName: string;
  Type: string;
  className?: string;
}
interface PlayLists {
  d: iPlayList[];
  title: string;
}
export function PlayList(d: iPlayList) {
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
      className="inline-block relative cursor-pointer bg-black hover:bg-[#1A1A1A] p-1 sm:p-2"
    >
      <Link to={`/${d.Type == "artist" ? d.Type : "playlist"}/${d.id}`}>
        <Avatar
          src={d.ImagePath}
          className={`${
            d.Type == "artist" ? " rounded-full" : " rounded-2xl"
          }`.concat(
            ` ${d.className || " cursor-pointer size-[150px] sm:size-[180px]"} `
          )}
        />
      </Link>
      <div className="text-[10px] sm:text-[16px] mt-2 line-clamp-1 w-[150px] ">
        {d.PlayListName}
      </div>
      {show || (playing.id == d.id && playing.page == d.Type && !stopAudio) ? (
        <div className="absolute top-[130px] right-0 -z-2">
          <PlayButtom id={d.id} page={d.Type} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
interface PlayLists {
  d: iPlayList[];
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
              <div className={`flex w-max `}>{children}</div>
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
  const [playlists, SetPlayLists] = useState<iPlayList[]>([]);
  useEffect(() => {
    post("/playlist/Nextplaylist", {}, (v: any) => {
      SetPlayLists(v.ls);
    });
  }, []);

  return <PlayLists d={playlists} title="Danh sách đề cử" />;
}
