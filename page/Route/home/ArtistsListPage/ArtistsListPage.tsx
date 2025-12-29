import { post } from "@/page/config/req";
import React, { useEffect, useState } from "react";

import { iPlayList } from "@/page/component/Playlist/interface";
import PlayList from "@/page/component/Playlist/Playlist";
import { useQuery } from "@tanstack/react-query";
import {
  CACHE_5_DAY,
  NEXT_PLAYLIST_ARTIST_QUERY,
} from "@/page/contant/quey_key";
import { Loading } from "@/page/component/loading";

export default function ArtistsListPage() {
  const [playlists, setPlayLists] = useState<iPlayList[]>([]);
  const [page, SetPage] = useState(0);
  const [count, setCount] = useState(0);

  const fetchPlaylistArtist = (
    page: number
  ): Promise<{
    ls: iPlayList[];
    count: number;
  }> => {
    return new Promise((result, rej) => {
      post("/playlist/NextPlaylistArtist", { start: page }, (v: any) => {
        if (v && v.ls) {
          result({
            ls: v.ls,
            count: v.count,
          });
        }
        result(v || {});
      });
    });
  };
  const { data } = useQuery({
    queryKey: [NEXT_PLAYLIST_ARTIST_QUERY, page],
    queryFn: async () => {
      const data = await fetchPlaylistArtist(page);
      return data;
    },
    staleTime: CACHE_5_DAY,
  });
  useEffect(() => {
    if (!data || !data.ls) return;
    const ls = data.ls;
    if (playlists[playlists.length - 1]?.id === ls[ls.length - 1]?.id) {
      return;
    }
    setPlayLists([...playlists, ...ls]);
    setCount(data.count);
  }, [data, playlists]);

  let children = playlists.map((v) => {
    return (
      <PlayList
        className="cursor-pointer size-[120px] sm:size-[180px]"
        Type={v.Type}
        Genre_ID={v.Genre_ID}
        ImagePath={v.ImagePath}
        PlayListName={v.PlayListName}
        id={v.id}
        key={v.id}
      />
    );
  });
  
  if (playlists.length <= 0) {
    return <Loading />;
  }
  return (
    <div className="w-full relative">
      <h1 className="text-3xl px-4 py-2 z-10 sticky top-0 left-0 bg-black">
        Danh sách nghệ sĩ
      </h1>
      <div className=" grid gap-3 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {children}
        {playlists.length < count && (
          <div
            onClick={() => SetPage((s) => s + 1)}
            className="bg-[#B3B3B3]  cursor-pointer text-white sm:hover:text-black sm:hover:bg-[#3BE477] flex size-[120px] sm:size-[180px] rounded-full justify-center items-center"
          >
            <div>Thêm ca sĩ</div>
          </div>
        )}
      </div>
    </div>
  );
}
