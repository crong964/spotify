import { post } from "@/page/config/req";
import { useEffect, useState } from "react";
import { iPlayList } from "./Playlist";
import PlayLists from "./Playlists";
import React from "react";

export default function SuggestPlaylist() {
  const [playlists, SetPlayLists] = useState<iPlayList[]>([]);
  useEffect(() => {
    post("/playlist/Nextplaylist", {}, (v: any) => {
      SetPlayLists(v.ls);
    });
  }, []);

  return <PlayLists d={playlists} title="Danh sách đề cử" />;
}
