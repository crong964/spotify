import React, { useEffect, useState } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetCurName, SetPlaylist } from "@/page/Route/home/RootRedux";
import { get, post } from "@/page/config/req";
import { RecommendedSong, SongList } from "@/page/component/Song/Index";

import { TimeString } from "@/page/component/Time";
import { useParams } from "react-router-dom";

import {
  CheckCircleIcon,
  MusicNoteBeamedIcon,
  PencilIcon,
  PlusCircleIcon,
  ThreeDotsIcon,
  XIcon,
} from "@/icon/Icon";
import { SetAutoPlay } from "@/page/component/Audio/AudioRedux";
import { SongInPlayList } from "@/page/component/Song/interface";
import { Avatar } from "@/page/component/avatar";
import { Pop } from "@/page/component/pop";
import { PopEditPlaylis } from "@/page/component/Playlist";

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

interface SongList {
  data: Song[];
}
interface PlaylistForm {
  PlayListName: string;
  id: string;
  ImagePath: string;
  Discripition: string;
}
export default function MixPage() {
  const { id } = useParams();
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const playlist = useSelector((state: RootHome) => state.rootHome.playlist);
  const [time, SetTime] = useState(0);
  useEffect(() => {
    get(`/rs/getlistenAgain/${id}`, (v: any) => {
      SetSongS(v.ls);
      let time = 0;
      for (let i = 0; i < v.ls.length; i++) {
        const element = v.ls[i] as SongInPlayList;
        time += parseInt(element.Duration);
      }
      SetTime(time);
    });
  }, [id]);

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end ">
        <div className="flex items-end justify-start">
          <div className="flex z-10 p-4 justify-center items-end sm:space-x-4">
            <div className="relative">
              <Avatar
                className="size-[250px] rounded-2xl"
                src={playlist.ImagePath}
              />
            </div>

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
                  {songs.length} bài hát
                </span>
                <span className="text-[16px] font-bold text-white flex items-center space-x-3">
                  <div>Khoảng thời gian:</div>
                  <TimeString d={time} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="sm:px-4 py-2">
        <div className="flex items-center py-0 sm:py-4 space-x-5">
          <PlayButtom id={id + ""} page="mix" />
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
