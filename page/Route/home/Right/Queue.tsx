import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PlaySong, RemoveRight, RootHome } from "@/page/Route/home/RootRedux";
import { get } from "@/page/config/req";
import {
  JumpingSong,
  SetAutoPlay,
  SetSongs,
} from "@/page/component/Audio/AudioRedux";
import { Song } from "@/page/component/Song/Index";
interface RecentSong {
  Id: string;
  user_id: string;
  Genre_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  description: string;
  SongImage: string;
  status: number;
  publicDate: string;
  filePath: string;
}
interface MenberQueue {
  type: string;
  cur: string;
}
export default function Queue() {
  const dispatch = useDispatch();
  const [navi, SetNaVi] = useState("1");
  function Han(params: string) {
    SetNaVi(params);
  }
  return (
    <div className="w-full p-0 sm:p-1 h-full relative text-[16px] overflow-y-scroll bg-[#121212] rounded-lg  ">
      <div className="bg-[#121212] sticky z-40 top-0 left-0 flex space-x-3 h-min w-full justify-between px-3 rounded-lg py-4 ">
        <div className="flex space-x-4">
          <div
            onClick={() => {
              Han("1");
            }}
            className={
              `${navi == "1" ? "border-b-4 border-green-800" : ""}` +
              " cursor-pointer  font-bold w-max text-white"
            }
          >
            Danh sách chờ
          </div>
          <div
            onClick={() => {
              Han("2");
            }}
            className={
              `${navi == "2" ? "border-b-4 border-green-800" : ""}` +
              " cursor-pointer font-bold w-max  text-white "
            }
          >
            Danh sách gần đây
          </div>
        </div>
        <div
          onClick={() => {
            dispatch(RemoveRight());
          }}
          className=" cursor-pointer font-bold w-max text-white flex justify-end text-[14px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            className="size-7"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      </div>

      <RecentPlaySongs cur={navi} key={"RecentPlaySongs"} type="2" />
      <SongQueueInplayList cur={navi} key={"SongQueueInplayList"} type="1" />
    </div>
  );
}
function RecentPlaySongs(p: MenberQueue) {
  const [recentSongs, SetRecentSongs] = useState<RecentSong[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    get("/rs/", (v: any) => {
      SetRecentSongs(v.ls);
    });
  }, []);
  return (
    <>
      {p.cur == p.type ? (
        <>
          <div className="px-2">Đang phát</div>
          {recentSongs.map((v) => {
            return (
              <Song
                onClick={() => {
                  dispatch(SetSongs(v as any));
                  dispatch(SetAutoPlay(true));
                }}
                user_id={v.user_id}
                image={v.SongImage}
                name={v.SongName}
                singer={v.Singer}
                Id={v.Id}
                key={v.Id + parseInt("" + Math.random() * 10000)}
              />
            );
          })}
          
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export function SongQueueInplayList(p: MenberQueue) {
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
  const dispatch = useDispatch();
  useEffect(() => {
    // get("/rs/", (v: any) => {
    //   SetRecentSongs(v.ls);
    // });
  }, []);
  return (
    <>
      {p.cur == p.type ? (
        <>
          <div className="">
            Đang phát
            <span className="text-xs text-[#818181] mx-1">
              {mark + 1}/{lsSong.length}
            </span>
          </div>
          {lsSong[mark] == undefined ? (
            <></>
          ) : (
            <Song
              onClick={() => {
                dispatch(JumpingSong(lsSong[mark].Id));
              }}
              user_id={lsSong[mark].user_id}
              image={lsSong[mark].SongImage}
              name={lsSong[mark].SongName}
              singer={lsSong[mark].Singer}
              Id={lsSong[mark].Id}
              key={lsSong[mark].Id}
            />
          )}
          <div className="">Tiếp theo</div>
          {lsSong
            .filter((v, i) => {
              return mark < i;
            })
            .map((v) => {
              return (
                <Song
                  onClick={() => {
                    dispatch(JumpingSong(v.Id));
                  }}
                  user_id={v.user_id}
                  image={v.SongImage}
                  name={v.SongName}
                  singer={v.Singer}
                  Id={v.Id}
                  key={v.Id}
                />
              );
            })}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
