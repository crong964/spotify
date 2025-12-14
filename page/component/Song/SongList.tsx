import React from "react";
import { SongList } from "./interface";
import SongInPlayList from "./SongInPlayList";
import ImagePath from "@/page/config/img";

export default function SongList({ data, type }: SongList) {
  var stt = 0;
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="hidden sm:grid grid-cols-7 text-[13px] sm:text-[14px]  cursor-pointer sm:space-x-2  text-white font-bold rounded-lg items-center">
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
            {data.map((song) => {
              stt += 1;
              return (
                <SongInPlayList
                  type={type}
                  Duration={song.Duration + ""}
                  Id={song.Id}
                  Singer={song.Singer}
                  SongName={song.SongName}
                  Viewer={song.Viewer}
                  filePath={ImagePath(song.filePath)}
                  SongImage={song.SongImage}
                  liked={song.liked}
                  stt={stt}
                  user_id={song.user_id}
                  key={song.Id}
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
