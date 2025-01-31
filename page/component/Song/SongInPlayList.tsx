import { useState } from "react";
import { SongInPlayList } from "./interface";
import { RootHome } from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { CheckCircleIcon, PlusCircleIcon } from "@/icon/Icon";
import Time from "@/page/component/Time";
const ArtistLink = React.lazy(() => import("@/page/component/ArtistLink"));
import { SetAutoPlay, SetSongs } from "@/page/component/Audio/AudioRedux";
import { post } from "@/page/config/req";
import { Pop } from "@/page/component/pop";

export default function SongInPlayList(v: SongInPlayList) {
  const [liked, SetLike] = useState<string>(v.liked);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const playlists = useSelector((state: RootHome) => state.rootHome.playlists);
  const typeDevice = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const dispatch = useDispatch();
  const [xy, XY] = useState({ x: 0, y: 0, s: false });
  return (
    <div
      onContextMenu={(v) => {
        XY({ x: v.pageX, y: v.pageY, s: true });
      }}
      className="grid grid-cols-7 text-[13px] sm:text-[14px] sm:p-2 py-2 cursor-pointer sm:space-x-2 hover:bg-[#2D2D2D] text-white font-bold rounded-lg items-center"
    >
      <div
        className="col-span-5 grid grid-cols-5"
        onClick={() => {
          if (typeDevice == "pc") {
            return;
          }
          post(
            "/song/get",
            {
              idsong: v.Id,
            },
            (v: any) => {
              if (v && !v.err) {
                dispatch(SetSongs([v.song]));
                localStorage.setItem("song", JSON.stringify(v.song));
              }
            }
          );
          dispatch(SetAutoPlay(true));
        }}
        onDoubleClick={() => {
          if (typeDevice == "mobile") {
            return;
          }
          post(
            "/song/get",
            {
              idsong: v.Id,
            },
            (v: any) => {
              if (v && !v.err) {
                dispatch(SetSongs([v.song]));
                localStorage.setItem("song", JSON.stringify(v.song));
              }
            }
          );
          dispatch(SetAutoPlay(true));
        }}
      >
        <div className="col-span-5 sm:col-span-3 flex items-center space-x-2">
          <div className="sm:inline-block hidden mx-2">{v.stt}</div>
          <div className="relative size-12 sm:size-9 overflow-hidden">
            <img
              className="absolute top-0 left-0"
              src={v.SongImage}
              alt=""
              srcSet=""
            />
          </div>
          <div className="flex-col">
            <div className="block">{v.SongName}</div>
            {v.type != "artist" ? (
              <ArtistLink
                key={v.Id}
                idArtist={v.user_id}
                nameArtist={v.Singer}
              />
            ) : (
              <>
                <div className="block sm:hidden text-stone-500">{v.Viewer}</div>
              </>
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
      {xy.s ? (
        <Pop left={xy.x} top={xy.y}>
          <div
            className="h-[350px] min-w-[250px] text-[14px] p-1 bg-[#282828]"
            onMouseLeave={() => {
              XY({ ...xy, s: false });
            }}
          >
            <button
              onClick={() => {
                post("/playlist/addplaylist", { idsong: v.Id }, (v: any) => {
                  alert(v.err == false);
                });
              }}
              className="flex p-3 justify-start items-center gap-2 hover:bg-black w-full"
            >
              <PlusCircleIcon className="size-[14px] fill-white" />
              <div>Tạo danh sách mới</div>
            </button>
            {playlists.map((v) => {
              return (
                <button className="p-3 flex hover:bg-black w-full">
                  {v.PlayListName}
                </button>
              );
            })}
          </div>
        </Pop>
      ) : (
        <></>
      )}
    </div>
  );
}
