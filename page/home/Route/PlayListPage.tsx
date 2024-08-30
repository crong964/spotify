import React, { useEffect, useState } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetCurName } from "@/page/home/RootRedux";
import { get, post } from "@/page/config/req";
import { SongInPlayList, SongList } from "@/page/component/Song";
import { TimeString } from "@/page/component/Time";
import { useParams } from "react-router-dom";
import { SetAutoPlay } from "../Audio/AudioRedux";
import { CheckCircleIcon, PlusCircleIcon, ThreeDotsIcon } from "@/icon/Icon";

var g = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 6, 7];
export interface artist {
  id: string | undefined;
  Vertify: string | undefined;
  Nationality: string | undefined;
  ChanalName: string | undefined;
  Account: string | undefined;
  Name: string | undefined;
  description: string | undefined;
  pathImage: string | undefined;
  Password: string | undefined;
  Banner: string | undefined;
}
export interface Song {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  liked: string;
}

interface PlayList {
  id: string;
  ImagePath: string;
  PlayListName: string;
  Likes: number;
  Songs: number;
  Duration: string;
}
interface SongList {
  data: Song[];
}
export default function PlaylistPage() {
  const dispatch = useDispatch();
  const idPlayList = useSelector(
    (state: RootHome) => state.rootHome.command.param
  );
  const { id } = useParams();
  const [status, SetStatus] = useState<"play" | "pause">("pause");
  const [load, SetLoad] = useState(false);
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const [playlist, SetPlayList] = useState<PlayList>({
    Duration: "",
    id: "",
    ImagePath: "",
    Likes: 0,
    PlayListName: "",
    Songs: 0,
  });
  const [like, SetLike] = useState(false);
  useEffect(() => {
    get(`/playlist/data/${id}`, (v: any) => {
      if (v && !v.err) {
        SetSongS(v.songs);
        var time = 0;
        var song = 0;
        for (let i = 0; i < v.songs.length; i++) {
          const element: Song = v.songs[i];
          time += parseInt(element.Duration + "");
          song += 1;
        }
        v.playlist.Duration = time;
        v.playlist.Songs = song;
        SetPlayList(v.playlist);
        SetLike(v.like);
        dispatch(SetCurName(v.playlist.PlayListName));
      }
    });
  }, [id]);

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end ">
        <div className="flex items-end justify-start">
          <div className="flex z-10 p-4 justify-center items-end sm:space-x-4">
            <img
              className="size-[250px] rounded-2xl"
              src={playlist.ImagePath}
              alt=""
              srcSet=""
            />
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center">
                <span className="font-normal text-[16px] text-white">
                  playlist
                </span>
              </div>
              <h1>
                <span className="text-white font-bol text-[50px] font-black">
                  {playlist.PlayListName}
                </span>
              </h1>
              <div className="flex space-x-4">
                <span className="text-[16px] font-bold text-white">
                  {playlist.Songs} bài hát
                </span>
                <span className="text-[16px] font-bold text-white flex items-center space-x-3">
                  <div>Khoảng thời gian:</div>
                  <TimeString d={parseInt(playlist.Duration + "")} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="px-4 py-2">
        <div className="flex items-center py-0 sm:py-4 space-x-5">
          <button
            onClick={() => {
              if (load == true) {
                return;
              }
              post(
                "/recentPlaylist/play",
                { id: id, type: "playlist" },
                (v: any) => {
                  dispatch(SetAutoPlay(true));
                  SetLoad(false);
                }
              );
              SetLoad(true);
            }}
            className={load ? "cursor-wait" : "cursor-pointer"}
          >
            <PlayButtom id={id + ""} page="playlist" />
          </button>

          {isLogin ? (
            <>
              {like ? (
                <button
                  onClick={() => {
                    post(
                      "/likePlaylist/delete",
                      { idPlaylist: id },
                      (v: any) => {
                        if (v) {
                          SetLike(!like);
                        }
                      }
                    );
                  }}
                >
                  <CheckCircleIcon className="size-[32px] fill-[#1ED760] "></CheckCircleIcon>
                </button>
              ) : (
                <button
                  onClick={() => {
                    post("/likePlaylist/add", { idPlaylist: id }, (v: any) => {
                      if (v) {
                        SetLike(!like);
                      }
                    });
                  }}
                >
                  <PlusCircleIcon className="size-[32px] fill-[#C7C7C7] "></PlusCircleIcon>
                </button>
              )}
            </>
          ) : (
            <></>
          )}

          <button className="cursor-pointer">
            <ThreeDotsIcon className="fill-[#C7C7C7] hover:fill-white size-[45px] "></ThreeDotsIcon>
          </button>
        </div>
        <div className="py-3 font-bold text-[24px]  text-white">
          Các bài hát
        </div>
        <SongList data={songs} type="playlist" />
        <footer className="h-5"></footer>
      </div>
    </div>
  );
}
