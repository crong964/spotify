import { post } from "@/page/config/req";
import { useEffect, useState } from "react";

import PlayLists from "./Playlists";
import React from "react";
import { iPlayList } from "./interface";
import { useQuery } from "@tanstack/react-query";
import { NEXT_PLAYLIST_QUERY } from "@/page/contant/quey_key";

export default function SuggestPlaylist() {
  const [playlists, setPlayLists] = useState<iPlayList[]>([]);
  const fetchNextplaylist = (): Promise<iPlayList[]> => {
    return new Promise((result, rej) => {
      post("/playlist/Nextplaylist", {}, (v: any) => {
        if (v && v.ls) {
          result(v.ls);
        }
        result(v || []);
      });
    });
  };
  const { data } = useQuery({
    queryKey: [NEXT_PLAYLIST_QUERY],
    queryFn: async () => {
      const data = await fetchNextplaylist();
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24 * 5,
  });
  useEffect(() => {
    if (!data) return;

    setPlayLists(data);
  }, [data]);

  return (
    <PlayLists
      className="cursor-pointer size-[160px] sm:size-[180px]"
      d={playlists}
      title="Danh sách đề cử"
      link="PlayListSectionPage"
    />
  );
}
