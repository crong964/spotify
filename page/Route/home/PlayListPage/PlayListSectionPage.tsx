import { Playlist } from "@/page/component/Playlist";
import { iPlayList } from "@/page/component/Playlist/interface";
import { post } from "@/page/config/req";
import React, { useEffect, useState } from "react";

export default function PlayListSectionPage() {
  const [playlists, SetPlayLists] = useState<iPlayList[]>([]);
  useEffect(() => {
    post("/playlist/Nextplaylist", {}, (v: any) => {
      SetPlayLists(v.ls);
    });
  }, []);
  const children = playlists.map((v) => {
    return <Playlist {...v} key={v.id}></Playlist>;
  });
  return (
    <>
      <div className="text-3xl px-4 py-2 z-10 sticky top-0 left-0 bg-black">
        Danh sách phát nhạc
      </div>
      <div className=" grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {children}
      </div>
    </>
  );
}
