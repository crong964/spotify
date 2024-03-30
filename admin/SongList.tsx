import React, { useEffect, useState } from "react";
import { Duration, post } from "../page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { RootState, SelectSong } from "./Redux";
interface Song {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  imagePath: string;
  filePath: string;
  stt: number;
}
export default function SongList() {
  const [songs, SetSongs] = useState<Song[]>([]);
  const slectGenre = useSelector((state: RootState) => state.navi.slectGenre);
  const floor = useSelector((state: RootState) => state.navi.floor);
  useEffect(() => {
    post("/song/GetSongByGenre", { idGenre: slectGenre[floor] }, (v: any) => {
      SetSongs(v.ls);
    });
  }, [slectGenre[floor]]);
  var stt = 0;
  return (
    <div className="w-full h-[400px] overflow-y-scroll">
      {songs.map((v) => {
        stt += 1;
        return (
          <Song
            Duration={v.Duration}
            Id={v.Id}
            Singer={v.Singer}
            SongName={v.SongName}
            Viewer={v.Viewer}
            filePath={v.filePath}
            imagePath={v.imagePath}
            stt={stt}
            user_id={v.user_id}
            key={v.Id}
          />
        );
      })}
    </div>
  );
}

export function Song(d: Song) {
  const SelectList = useSelector((state: RootState) => state.navi.SelectList);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(
          SelectSong({ Id: d.Id, imagePath: d.imagePath, SongName: d.SongName })
        );
      }}
      className="grid grid-cols-6 cursor-pointer space-x-2 font-bold p-4 rounded-lg items-center"
    >
      <div className="col-span-3 flex items-center space-x-2">
        <div className="">{d.stt}</div>
        <img className="size-9" src={d.imagePath} alt="" srcSet="" />
      </div>
      <div className="col-span-2">{d.SongName}</div>
      <div className="col-span-1 flex items-center space-x-4">
        {SelectList[d.Id] != undefined ? (
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-[#1DD25E] size-8 mx-2"
          >
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-white size-3 mx-2"
          >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
            <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
          </svg>
        )}
      </div>
      
    </div>
  );
}
