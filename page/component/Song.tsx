import React, { useState } from "react";
import { Duration, post } from "@/page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { PlaySong, RootHome } from "@/page/Route/home/RootRedux";
import { v4 as uuidv4 } from "uuid";
import { CheckCircleIcon, PlusCircleIcon } from "@/icon/Icon";
import { SetAutoPlay, SetSongs } from "@/page/component/Audio/AudioRedux";
import Time from "./Time";
const ArtistLink = React.lazy(() => import("@/page/component/ArtistLink"));

interface Song {
  image: string;
  name: string;
  singer: string;
  Id: string;
  user_id: string;
  onClick(): void;
}
interface SongList {
  data: SongInPlayList[];
  type: string;
}
export default function Song(d: Song) {
  const dispatch = useDispatch();
  const devicetype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  return (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (devicetype == "pc") {
          d.onClick();
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (devicetype == "mobile") {
          d.onClick();
        }
      }}
      className="flex justify-center items-center py-2 sm:px-1 sm:py-0  cursor-pointer"
    >
      {d.image != "" && d.image ? (
        <img
          src={d.image}
          alt=""
          srcSet=""
          className="size-[50px] rounded-lg"
        />
      ) : (
        <></>
      )}
      <div className="flex-1 text-white space-y-1 px-1">
        <div className="font-bold text-[13px] sm:text-[16px] line-clamp-1">
          {d.name}
        </div>
        <div className="text-[12px] sm:text-[14px] text-stone-300">
          <ArtistLink idArtist={d.user_id} nameArtist={d.singer} />
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
  type: string;
}
export function SongInPlayList(v: SongInPlayList) {
  const [liked, SetLike] = useState<string>(v.liked);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const typeDevice = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const dispatch = useDispatch();
  return (
    <div
      key={v.Id}
      className="grid grid-cols-7 text-[13px] sm:text-[14px] p-2 my-1 cursor-pointer sm:space-x-2 hover:bg-[#2D2D2D] text-white font-bold rounded-lg items-center"
    >
      <div
        className="col-span-5 grid grid-cols-5"
        onClick={() => {
          if (typeDevice == "pc") {
            return;
          }
          dispatch(SetSongs(v as any));
          dispatch(SetAutoPlay(true));
        }}
        onDoubleClick={() => {
          if (typeDevice == "mobile") {
            return;
          }
          dispatch(PlaySong(v.Id));
          dispatch(SetAutoPlay(true));
        }}
      >
        <div className="col-span-5 sm:col-span-3 flex items-center space-x-2">
          <div className="sm:inline-block hidden mx-2">{v.stt}</div>
          <img className="size-9" src={v.SongImage} alt="" srcSet="" />
          <div className="flex-col">
            <div className="block">{v.SongName}</div>
            {v.type != "artist" ? (
              <ArtistLink
                key={v.Id}
                idArtist={v.user_id}
                nameArtist={v.Singer}
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="sm:block hidden col-span-2 p-2 text-[14px] text-stone-500">
          {v.Viewer}
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 flex items-center space-x-4">
        {isLogin ? (
          <>
            <div
              className=""
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
              {liked ? (
                <CheckCircleIcon className="fill-[#1DD25E] size-4 mx-2"></CheckCircleIcon>
              ) : (
                <PlusCircleIcon className="fill-white size-4 mx-2"></PlusCircleIcon>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        <Time d={parseInt(v.Duration + "")} />
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
          <div className="hidden sm:grid grid-cols-7 text-[13px] sm:text-[14px]  cursor-pointer sm:space-x-2 hover:bg-[#2D2D2D] text-white font-bold rounded-lg items-center">
            <div className="col-span-3 flex items-center space-x-2">
              <div className="inline-block"># Tên nhạc</div>
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
                  type={d.type}
                  Duration={v.Duration + ""}
                  Id={v.Id}
                  Singer={v.Singer}
                  SongName={v.SongName}
                  Viewer={v.Viewer}
                  filePath={v.filePath}
                  SongImage={v.SongImage}
                  liked={v.liked}
                  stt={stt}
                  user_id={v.user_id}
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
