import React, { useState } from "react";
import IndexGenres from "./GenreLs";
import { Song } from "./SongList";

import { RootState } from "./Redux";
import { useSelector } from "react-redux";
interface Song {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  stt: number;
}
export default function SongAndGenrePage() {
  const [songs, SetSongs] = useState<Song[]>([]);
  const slectGenre = useSelector((state: RootState) => state.navi.slectGenre);
  const floor = useSelector((state: RootState) => state.navi.floor);
  var stt = 0;
  return (
    <div className="w-full h-full">
      <IndexGenres />
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
              SongImage={v.SongImage}
              stt={stt}
              user_id={v.user_id}
              key={v.Id}
            />
          );
        })}
      </div>
    </div>
  );
}
