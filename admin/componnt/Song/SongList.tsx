import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { post } from "@/page/config/req";
import Time from "@/page/component/Time";
import Toggle from "../Toggle";
import { useDispatch, useSelector } from "react-redux";
import { EditSong, RootState } from "@/admin/Redux";
import { iSongList, iSong } from "./SongInterface";
import { Song } from "./Index";

export default function SongList(d: iSongList) {
  const songListAndInforArtist = useSelector(
    (state: RootState) => state.navi.songListAndInforArtist
  );
  var stt = 0;
  return (
    <>
      {d.data.length > 0 && songListAndInforArtist == "list" ? (
        <>
          <div className="text-3xl my-4">Danh sách nhạc</div>
          <div className="hidden sm:grid grid-cols-7 text-[13px] sm:text-[14px]  cursor-pointer sm:space-x-2 text-black font-bold p-2 rounded-lg items-center">
            <div className="col-span-1 flex items-center space-x-2">
              <div className="inline-block">Số thứ tự</div>
            </div>
            <div className="col-span-2 p-2 ">
              <div className="block">Tên nhạc</div>
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              Lượt xem
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              Ẩn/hiển
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              thời gian
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              Thao tác
            </div>
          </div>
          <div className="py-2">
            {d.data.map((v) => {
              stt += 1;
              return (
                <Song
                  status={v.status}
                  Duration={v.Duration + ""}
                  Id={v.Id}
                  Singer={v.Singer}
                  SongName={v.SongName}
                  Viewer={v.Viewer}
                  filePath={v.filePath}
                  SongImage={v.SongImage}
                  stt={stt}
                  user_id=""
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
