import React, { useEffect, useState } from "react";
import Song from "./Song";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, ShowRecentList } from "./RootRedux";
import Audio from "./Audio";
import { post } from "../config/req";

interface SongI {
  Id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  imagePath: string;
  filePath: string;
}
export default function PlayingBar() {
  const dispatch = useDispatch();
  const idsong = useSelector((state: RootHome) => state.rootHome.idSong);
  var temp: SongI | undefined = undefined;
  if (localStorage.getItem("song") != null) {
    temp = JSON.parse(localStorage.getItem("song") as string);
  }

  const [song, SetSong] = useState<SongI>({
    Duration: temp?.Duration ? temp.Duration : "",
    filePath: temp?.filePath ? temp.filePath : "",
    Id: temp?.Id ? temp.Id : "",
    imagePath: temp?.imagePath ? temp.imagePath : "",
    Singer: temp?.Singer ? temp.Singer : "",
    SongName: temp?.SongName ? temp.SongName : "",
  });
  useEffect(() => {
    post(
      "/song/get",
      {
        idsong: idsong,
      },
      (v: any) => {
        if (!v.err) {
          SetSong(v.song);
          localStorage.setItem("song", JSON.stringify(v.song));
        }
      }
    );
  }, [idsong]);
  return (
    <div className="w-full bg-[#121212] h-[12%] grid items-center grid-cols-4 mt-2">
      <Song
        Id={song.Id}
        image={song.imagePath}
        name={song.SongName}
        singer={song.Singer}
      />
      <Audio path={song.filePath} />
      <div className="flex space-x-2 justify-center items-center">
        <button
          onClick={() => {
            dispatch(ShowRecentList(true));
          }}
        >
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-white size-4"
          >
            <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
          </svg>
        </button>
        <button>
          <svg
            aria-label="Âm lượng trung bình"
            aria-hidden="true"
            id="volume-icon"
            viewBox="0 0 16 16"
            className="fill-white size-4"
          >
            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
          </svg>
        </button>
        <input
          type="range"
          max={1}
          step={1 / 10}
          className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-1"
        />
      </div>
    </div>
  );
}
