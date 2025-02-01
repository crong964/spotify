import React from "react";
import { SongList } from "./interface";
import SongInPlayList from "./SongInPlayList";

export default function SongList(d: SongList) {
  var stt = 0;
  return (
    <>
      {d.data.length > 0 ? (
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
            {d.data.map((v) => {
              stt += 1;
              return (
                <SongInPlayList
                  type={d.type}
                  Duration={v.Duration + ""}
                  Id={v.Id}
                  Singer={v.Singer}
                  SongName={v.SongName}
                  Viewer={v.Viewer}
                  filePath={v.filePath}
                  SongImage={v.SongImage}
                  liked={v.liked}
                  stt={stt}
                  user_id={v.user_id}
                  key={v.Id}
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
