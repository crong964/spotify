import React, { useState } from "react";
import { Duration, post } from "../config/req";
import { useDispatch, useSelector } from "react-redux";
import { PlaySong, RootHome } from "../home/RootRedux";

interface Song {
  image: string;
  name: string;
  singer: string;
  Id: string;
}
interface SongList {
  data: SongInPlayList[];
}
export default function Song(d: Song) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(PlaySong(d.Id));
      }}
      className="flex justify-center items-center px-1 cursor-pointer"
    >
      {d.image != "" ? (
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
    <div className="grid grid-cols-7 text-[13px] sm:text-[14px]  cursor-pointer sm:space-x-2 hover:bg-[#2D2D2D] text-white font-bold p-4 rounded-lg items-center">
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
        <div className="col-span-3 sm:col-span-2 p-2 ">
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
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="fill-[#1DD25E] size-3 mx-2"
              >
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="fill-white size-3 mx-2"
              >
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
              </svg>
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

      {d.data.length > 0 ? (
        <div className="text-white font-bold">Xem thêm</div>
      ) : (
        <></>
      )}
    </div>
  );
}