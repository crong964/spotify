import React, { useEffect, useState } from "react";
import { SongList } from "./PlayList";
import { Song } from "./PlayList";
import { useSelector } from "react-redux";
import { RootHome } from "./RootRedux";
import { post } from "../config/req";

export default function Search() {
  const [songs, SetSongS] = useState<Song[]>([]);
  const search = useSelector((state: RootHome) => state.rootHome.search);

  useEffect(() => {
    post("/search", { name: search }, (v: any) => {
        SetSongS(v["ls"])
      });
  }, [search]);
  return <SongList data={songs} />;
}
