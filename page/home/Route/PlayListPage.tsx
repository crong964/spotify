import React, { useEffect, useState } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetCurName } from "@/page/home/RootRedux";
import { get, post } from "@/page/config/req";
import { SongInPlayList, SongList } from "@/page/component/Song";
import { TimeString } from "@/page/component/Time";
import { useParams } from "react-router-dom";
import { SetAutoPlay } from "../Audio/AudioRedux";

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
  const [playlist, SetPlayList] = useState<PlayList>({
    Duration: "",
    id: "",
    ImagePath: "",
    Likes: 0,
    PlayListName: "",
    Songs: 0,
  });
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
      <div className="px-4">
        <div className="flex items-center py-0 sm:py-4 space-x-4">
          <div
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
          >
            <button className={load ? "cursor-wait" : "cursor-pointer"}>
              <PlayButtom id={id + ""} page="playlist" />
            </button>
          </div>
          <div className="cursor-pointer">
            <svg
              className="fill-[#C7C7C7] hover:fill-white size-[45px] "
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
            </svg>
          </div>
        </div>
        <div className="py-3 font-bold text-[24px]  text-white">
          Các bài hát
        </div>
        <SongList data={songs} />
        <footer className="h-5"></footer>
      </div>
    </div>
  );
}
