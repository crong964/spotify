import React, { useEffect, useMemo, useState } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "@/page/Route/home/RootRedux";
import { get, post } from "@/page/config/req";
import { SongList } from "@/page/component/Song/Index";

import { TimeString } from "@/page/component/Time";
import { useParams } from "react-router-dom";

import { ThreeDotsIcon } from "@/icon/Icon";
import { SongInPlayList } from "@/page/component/Song/interface";
import { Avatar } from "@/page/component/avatar";
import ColorImage from "@/page/config/corlorImage";
import ImagePath from "@/page/config/img";

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
  const [bg, setBg] = useState("black");
  useEffect(() => {
    get(`/recentSong/getlistenAgain/${id}`, (v: any) => {
      if (v && v.ls) {
        SetSongS(v.ls);
        let time = 0;
        for (let i = 0; i < v.ls.length; i++) {
          const element = v.ls[i] as SongInPlayList;
          time += parseInt(element.Duration);
        }
        SetTime(time);
      }
    });
  }, [id]);
  useMemo(async () => {
    const bg = await ColorImage(
      "https://res.cloudinary.com/dkd1k6e2r/image/upload/v1739376087/aXZpdml2aXZpdml2aXZpdg_g89ohh.jpg"
    );
    setBg(bg);
  }, []);

  const style = useMemo(() => {
    return { "--bg": bg } as React.CSSProperties;
  }, [bg]);
  return (
    <div className="relative">
      <div
        style={style}
        className="bgplaylist rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end "
      >
        <div className="flex items-end justify-start">
          <div className="flex z-10 p-4 justify-center items-end sm:space-x-4">
            <div className="relative">
              <Avatar
                className="size-[250px] rounded-2xl"
                src={
                  "https://res.cloudinary.com/dkd1k6e2r/image/upload/v1739376087/aXZpdml2aXZpdml2aXZpdg_g89ohh.jpg"
                }
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
