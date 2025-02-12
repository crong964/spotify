import { get, post } from "@/page/config/req";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootHome } from "../RootRedux";
import { iPlayList } from "@/page/component/Playlist/interface";
import PlayList from "@/page/component/Playlist/Playlist";

export default function ArtistsListPage() {
  const [playlists, SetPlayLists] = useState<iPlayList[]>([]);
  const [page, SetPage] = useState(0);
  const [count, SetCount] = useState(0);
  useEffect(() => {
    post("/playlist/NextPlaylistArtist", { start: page }, (v: any) => {
      if (v && v.ls) {
        SetPlayLists(v.ls);
        SetPage((s) => s + 1);
        SetCount(v.count);
      }
    });
  }, []);
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
  const Right = useSelector((s: RootHome) => s.rootHome.Right);
  return (
    <div
      className="w-full relative"
      onScroll={(ev) => {
        console.log("s");
      }}
    >
      <div className="text-3xl px-4 py-2 z-10 sticky top-0 left-0 bg-black">
        Danh sách nghệ sĩ
      </div>
      <div className=" grid gap-3 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
        {children}
        {playlists.length < count ? (
          <div
            onClick={() => {
              post(
                "/playlist/NextPlaylistArtist",
                { start: page },
                (v: any) => {
                  if (v && v.ls) {
                    SetPlayLists([...playlists.concat(v.ls)]);
                    SetPage((s) => s + 1);
                    SetCount(v.count);
                  }
                }
              );
            }}
            className="bg-[#B3B3B3]  cursor-pointer text-white sm:hover:text-black sm:hover:bg-[#3BE477] flex size-[120px] sm:size-[180px] rounded-full justify-center items-center"
          >
            <div>Thêm ca sĩ</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
