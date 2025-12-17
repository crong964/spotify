import { post, post2 } from "@/page/config/req";
import { useEffect, useState } from "react";

import PlayLists from "./Playlists";
import React from "react";
import { iPlayList } from "./interface";

interface iSuggestPlaylist {
  playlists: iPlayList[];
}
export default function SuggestPlaylist({ playlists }: iSuggestPlaylist) {
  return (
    <PlayLists
      className="cursor-pointer size-[160px] sm:size-[180px]"
      d={playlists}
      title="Danh sách đề cử"
      link="PlayListSectionPage"
    />
  );
}
