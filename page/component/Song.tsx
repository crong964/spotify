import React, { useState } from "react";
import { Duration, post } from "@/page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { PlaySong, RootHome } from "@/page/home/RootRedux";

import { CheckCircleIcon, PlusCircleIcon } from "@/icon/Icon";

interface Song {
  image: string;
  name: string;
  singer: string;
  Id: string;
  onClick(): void;
}
interface SongList {
  data: SongInPlayList[];
}
export default function Song(d: Song) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={d.onClick}
      className="flex justify-center items-center px-1 cursor-pointer"
    >
      {d.image != "" && d.image ? (
        <img
          src={d.image}
          alt=""
          srcSet=""
          className="size-[32px] sm:size-[50px] rounded-lg"
        />
      ) : (
        <></>
      )}
      <div className="flex-1 text-white space-y-1 px-1">
        <div className="font-bold text-[13px] sm:text-[16px] line-clamp-1">
          {d.name}
        </div>
        <div className="text-[12px] sm:text-[14px] text-stone-300">
          {d.singer}
        </div>
      </div>
    </div>
  );
}
export interface SongInPlayList {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  liked: string;
  stt: number;
}
export function SongInPlayList(v: SongInPlayList) {
  const [liked, SetLike] = useState<string>(v.liked);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-7 text-[13px] sm:text-[14px]  cursor-pointer sm:space-x-2 hover:bg-[#2D2D2D] text-white font-bold sm:p-4 rounded-lg items-center">
      <div
        className="col-span-5 grid grid-cols-5"
        onClick={() => {
          dispatch(PlaySong(v.Id));
        }}
      >
        <div className="col-span-1 flex items-center space-x-2">
          <div className="sm:inline-block hidden">{v.stt}</div>
          <img className="size-9" src={v.SongImage} alt="" srcSet="" />
        </div>
        <div className="col-span-4 sm:col-span-2 p-2 ">
          <div className="block">{v.SongName}</div>
          <div className="block sm:hidden text-stone-500">{v.Viewer}</div>
        </div>

        <div className="sm:block hidden col-span-2 text-[14px] text-stone-500">
          {v.Viewer}
        </div>
      </div>

      <div
        className="col-span-2 sm:col-span-1 flex items-center space-x-4"
        onClick={() => {
          post(
            "/lsong/add",
            {
              Id: v.Id,
            },
            (v: any) => {
              if (v.err) {
                alert("có lỗi");
              } else {
                SetLike(v.liked);
              }
            }
          );
        }}
      >
        {isLogin ? (
          <>
            {liked ? (
              <PlusCircleIcon className="fill-[#1DD25E] size-4 mx-2"></PlusCircleIcon>
            ) : (
              <CheckCircleIcon className="fill-white size-4 mx-2"></CheckCircleIcon>
            )}
          </>
        ) : (
          <></>
        )}

        <Duration Duration={v.Duration} />
      </div>
    </div>
  );
}
export function SongList(d: SongList) {
  var stt = 0;
  return (
    <>
      {d.data.length > 0 ? (
        <>
          <div className="hidden sm:grid grid-cols-7 text-[13px] sm:text-[14px]  cursor-pointer sm:space-x-2 hover:bg-[#2D2D2D] text-white font-bold p-2 rounded-lg items-center">
            <div className="col-span-1 flex items-center space-x-2">
              <div className="inline-block">Số thứ tự</div>
            </div>
            <div className="col-span-2 p-2 ">
              <div className="block">Tên nhạc</div>
            </div>
            <div className="sm:block hidden col-span-2 text-[14px] ">
              Lượt xem
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              thời gian
            </div>
          </div>
          <div className="py-2">
            {d.data.map((v) => {
              stt += 1;
              return (
                <SongInPlayList
                  Duration={v.Duration + ""}
                  Id={v.Id}
                  Singer={v.Singer}
                  SongName={v.SongName}
                  Viewer={v.Viewer}
                  filePath={v.filePath}
                  SongImage={v.SongImage}
                  liked={v.liked}
                  stt={stt}
                  user_id=""
                  key={v.Id}
                />
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
