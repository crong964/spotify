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

export default function SongInPlayList(v: SongInPlayList) {
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