import React, { useEffect, useState } from "react";
import { Song } from "./PlayList";
import { useSelector } from "react-redux";
import { RootHome } from "./RootRedux";
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
      <SongList data={songname} />
      <Artists d={artist} />
      <SongList data={songs} />
      <PlayLists d={playlists} title="Danh sách phát nhạc" />
    </div>
  );
}
