import React, { useEffect, useState } from "react";
import { Song } from "./PlayList";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "./RootRedux";
import { post } from "../config/req";
import PlayLists, { PlayList } from "../component/Playlist";
import { Artists } from "../component/Artist";
import { SongList } from "../component/Song";
interface artist {
  pathImage: string;
  ChanalName: string;
  artist: string;
  id: string;
  type: string;
}
interface Artists {
  d: artist[];
}
interface SongInPlayList {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  liked: string;
  stt: number;
}
export default function Search() {
  const [songname, SetSongName] = useState<SongInPlayList[]>([]);
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const dispatch = useDispatch();
  const search = useSelector((state: RootHome) => state.rootHome.command.param);
  const [artist, SetArtis] = useState<artist[]>([]);
  const [playlists, SetPlayLists] = useState<PlayList[]>([]);
  useEffect(() => {
    post("/search", { name: search }, (v: any) => {
      SetSongName(v["ls"]);
      SetArtis(v["artise"]);
      SetSongS(v["songls"]);
      SetPlayLists(v["playlists"]);
    });
  }, [search]);
  return (
    <div className="w-full">
      <form className="flex sm:hidden w-full sticky top-0 left-0 items-center bg-white text-black rounded-2xl my-1 p-2">
        <input
          className="w-[90%] p-2 focus:outline-none "
          onChange={(v) => {
            var value = v.currentTarget.value;
            if (value.length == 2) {
              dispatch(NaviPage({ page: "genre", param: "" }));
              return;
            }
            dispatch(NaviPage({ page: "search", param: value }));
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </form>
      <SongList data={songname} />
      <Artists d={artist} />
      <SongList data={songs} />
      <PlayLists d={playlists} title="Danh sách phát nhạc" />
    </div>
  );
}
