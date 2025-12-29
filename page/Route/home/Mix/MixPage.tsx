import React, { useEffect, useMemo, useState, useTransition } from "react";
import PlayButtom from "@/page/component/PlayButtom";

import { get, post } from "@/page/config/req";
import { SongList } from "@/page/component/Song/Index";

import { TimeString } from "@/page/component/Time";
import { useParams } from "react-router-dom";

import { ThreeDotsIcon } from "@/icon/Icon";
import { SongInPlayList } from "@/page/component/Song/interface";
import { Avatar } from "@/page/component/avatar";
import ColorImage from "@/page/config/corlorImage";
import { ButtonRandomPlay } from "@/page/component/Audio";
import { Loading } from "@/page/component/loading";

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
  const [songs, setSongS] = useState<SongInPlayList[]>([]);
  const [time, setTime] = useState(0);
  const [bg, setBg] = useState("black");
  useEffect(() => {
    get(`/recentSong/getlistenAgain/${id}`, (v: any) => {
      if (v && v.ls) {
        let time = 0;
        for (let i = 0; i < v.ls.length; i++) {
          const element = v.ls[i] as SongInPlayList;
          time += Number(element.Duration);
        }

        setSongS(v.ls);
        setTime(time);
      }
    });
  }, [id]);
  useMemo(async () => {
    const bg = await ColorImage(
      "https://res.cloudinary.com/dkd1k6e2r/image/upload/aXZpdml2aXZpdml2aXZpdg_g89ohh.jpg"
    );
    setBg(bg);
  }, []);

  const style = useMemo(() => {
    return { "--bg": bg } as React.CSSProperties;
  }, [bg]);
  if (songs.length <= 0) {
    return <Loading></Loading>;
  }
  return (
    <div className="relative">
      <div
        style={style}
        className="bgplaylist rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end "
      >
        <div className="flex max-sm:flex-col items-center sm:items-end sm:justify-start sm:gap-4 sm:p-4">
          <div className="relative">
            <Avatar
              className="size-[170px] sm:size-[250px] rounded-2xl"
              src={
                "https://res.cloudinary.com/dkd1k6e2r/image/upload/v1739376087/aXZpdml2aXZpdml2aXZpdg_g89ohh.jpg"
              }
            />
          </div>

          <div className="flex flex-col gap-1 sm:gap-5">
            <span className="font-normal text-lg sm:text-[50px] text-white">
              Danh sách phát lại
            </span>
            <div className="flex gap-3 text-[14px]">
              {songs.length} bài hát
              <div>Khoảng thời gian:</div>
              <TimeString d={time} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="sm:px-4 py-2">
        <div className="flex items-center py-0 sm:py-4 space-x-5">
          <PlayButtom id={id + ""} page="mix" />
          <ButtonRandomPlay className="size-8" />
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
