import PlayButtom from "@/page/component/PlayButtom";
import { SongList } from "@/page/component/Song/Index";

import { SongInPlayList } from "@/page/component/Song/interface";
import { get } from "@/page/config/req";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function LikedSongListPage() {
  const dispatch = useDispatch();
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  useEffect(() => {
    get(`/lsong/likedsongs`, (v: any) => {
      if (!v || v.err) {
        return;
      }
      SetSongS(v.ls); 
    });
  }, []);
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 to-blue-500  rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex  flex-col justify-end "></div>
      <div className="opacity-25 bg-black absolute top-0 left-0 w-full h-[320px]"></div>
      <div className="flex  sm:justify-start justify-center w-full space-x-3 absolute top-0 left-0 h-[320px] z-10 p-4">
        <img
          src="/public/liked-songs-640.png"
          className="size-[270px] rounded-xl"
          alt=""
          srcSet=""
        />
        <div className="sm:flex flex-col justify-end hidden">
          <div className="flex items-center">
            <span className="font-normal text-[14px] text-white">playlist</span>
          </div>
          <div>
            <span className="text-white font-bol text-[96px] font-black">
              Danh sách yêu thích
            </span>
          </div>
          <span className="text-[16px] font-bold text-white">
            {songs.length} bài hát
          </span>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="sm:px-4">
        <div className="flex items-center py-4 space-x-4">
          <div>
            <PlayButtom id="" page="likesong" />
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
        <SongList data={songs} type="likeplaylist"/>
        <footer className="h-5"></footer>
      </div>
    </div>
  );
}
