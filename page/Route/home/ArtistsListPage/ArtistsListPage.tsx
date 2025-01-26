import { PlayList } from "@/page/component/Playlist";
import { get, post } from "@/page/config/req";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootHome } from "../RootRedux";

export default function ArtistsListPage() {
  const [playlists, SetPlayLists] = useState<PlayList[]>([]);
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
        className="cursor-pointer size-[100px] sm:size-[180px]"
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
      <div className=" grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {children}
      </div>
      {playlists.length < count ? (
        <div
          onClick={() => {
            post("/playlist/NextPlaylistArtist", { start: page }, (v: any) => {
              if (v && v.ls) {
                SetPlayLists([...playlists.concat(v.ls)]);
                SetPage((s) => s + 1);
                SetCount(v.count);
              }
            });
          }}
          className="flex justify-center my-4"
        >
          <button className="text-[#B3B3B3] text-[20px] font-bold border-0 sm:border-2 border-black hover:border-b-[#B3B3B3]">
            Xem nhiều hơn
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
