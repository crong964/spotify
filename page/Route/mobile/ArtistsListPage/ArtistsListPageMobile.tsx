import { HumanIcon } from "@/icon/Icon";
import { iPlayList } from "@/page/component/Playlist/interface";
import PlayList from "@/page/component/Playlist/Playlist";
import { post } from "@/page/config/req";
import React from "react";
import { useEffect, useState } from "react";

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
        className="cursor-pointer size-[100px] sm:size-[180px]"
        Type={"#"}
        Genre_ID={v.Genre_ID}
        ImagePath={v.ImagePath}
        PlayListName={v.PlayListName}
        id={v.id}
        key={v.id}
        click={(id) => {
          post("/likePlaylist/add", { idPlaylist: id }, (v: any) => {
            if (!v.err) {
              SetPlayLists([
                ...playlists.filter((val) => {
                  return val.id != id;
                }),
              ]);
            }
          });
        }}
      />
    );
  });
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
            className="bg-[#B3B3B3] flex size-[100px] sm:size-[180px] rounded-full justify-center items-center"
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
