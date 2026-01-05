import { ButtonRandomPlay } from "@/page/component/Audio";
import { Loading } from "@/page/component/loading";
import PlayButtom from "@/page/component/PlayButtom";
import { SongList } from "@/page/component/Song/Index";

import { SongInPlayList } from "@/page/component/Song/interface";
import { TimeString } from "@/page/component/Time";
import { get2 } from "@/page/config/req";
import { CACHE_INFILITY, LOVE_SONG_QUERY } from "@/page/contant/quey_key";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
export default function LikedSongListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: songs } = useQuery<SongInPlayList[]>({
    queryKey: [LOVE_SONG_QUERY],
    queryFn: async () => {
      const data = await get2("/lsong/likedsongs");
      if (!data || data.err) {
        return [];
      }
      return data.ls;
    },
    staleTime: CACHE_INFILITY,
  });

  useEffect(() => {
    setIsLoading(false);
    return () => {};
  }, []);
  const time = useMemo(() => {
    if (!songs) {
      return 0;
    }
    let time = 0;
    songs.forEach((song) => {
      time += parseInt(song.Duration + "");
    });
    return time;
  }, [songs]);

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(420);
  useEffect(() => {
    let f = setInterval(() => {
      setHeaderHeight(headerRef.current?.clientHeight || 420);
    }, 200);
    return () => {
      clearInterval(f);
    };
  }, []);

  if (!songs || isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="relative">
      <div ref={headerRef}>
        <div className="bg-gradient-to-r from-green-400 to-blue-500  sm:rounded-t-lg w-full h-[320px] flex  flex-col justify-end "></div>
        <div className="opacity-25 bg-black absolute top-0 left-0 w-full h-[320px]"></div>
        <div className="flex max-sm:flex-col justify-end sm:justify-start  items-center sm:items-end  w-full space-x-3 absolute top-0 left-0 h-[320px] z-10 sm:p-4">
          <img
            src="/public/liked-songs-640.png"
            className="size-[170px] shadow-playlist sm:size-[270px] rounded-xl"
            alt=""
            srcSet=""
          />
          <div className="flex flex-col max-sm:self-start sm:gap-y-3">
            <span className="font-normal text-[16px] text-white">playlist</span>
            <h1>
              <span className="text-white font-bol text-lg sm:text-[50px] font-black">
                Danh sách yêu thích
              </span>
            </h1>
            <div className="flex space-x-1 items-center sm:space-x-4 text-[14px] sm:text-[16px] text-white">
              <span className=" font-bold ">{songs.length} bài hát</span>
              <span>Khoảng thời gian:</span>
              <TimeString d={time} />
            </div>
          </div>
        </div>
        <div className="sm:px-4">
          <div className="flex items-center py-4 gap-x-4 px-1">
            <div className="max-sm:flex-1 flex justify-end order-[99] sm:order-[-1]">
              <PlayButtom id="" page="likesong" />
            </div>
            <ButtonRandomPlay className="size-8" />
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
        </div>
      </div>

      <SongList data={songs} type="likeplaylist" headerHeight={headerHeight} />
    </div>
  );
}
