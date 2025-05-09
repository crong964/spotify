import React, { useEffect, useState } from "react";
import { Song } from "../PlayListPage/PlayListPage";
import { useDispatch, useSelector } from "react-redux";

import { post } from "@/page/config/req";
import { Artists } from "@/page/component/Artist";
import { SongList } from "@/page/component/Song/Index";
import { useParams } from "react-router-dom";
import { NaviPage } from "../RootRedux";
import { SongInPlayList } from "@/page/component/Song/interface";

import { Playlists } from "@/page/component/Playlist";
import { iPlayList } from "@/page/component/Playlist/interface";

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

export default function SearchPage() {
  const [songname, SetSongName] = useState<SongInPlayList[]>([]);
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const dispatch = useDispatch();
  const { s } = useParams();
  const [artist, SetArtis] = useState<artist[]>([]);
  const [playlists, SetPlayLists] = useState<iPlayList[]>([]);
  const [name, SetName] = useState("");

  const FetchSearch = () => {
    post("/search", { name: s }, (v: any) => {
      if (!v || v.err) {
        return;
      }
      SetSongName(v["ls"] || []);
      SetArtis(v["artist"] || []);
      SetSongS(v["songls"] || []);
      SetPlayLists(v["playlists"] || []);
    });
  };
  useEffect(() => {
    if (s == undefined || s.length <= 0) {
      return;
    }
    let f = setTimeout(() => {
      FetchSearch();
    }, 300);
    return () => {
      clearTimeout(f);
    };
  }, [s]);
  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(NaviPage({ page: "search", param: name }));
        }}
        className="flex sm:hidden w-full sticky top-0 left-0 z-[100] items-center bg-white text-black rounded-2xl my-1 p-2"
      >
        <input
          className="w-[90%] p-2 focus:outline-none "
          onChange={(v) => {
            SetName(v.currentTarget.value);
          }}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
      {s == undefined || s.length <= 0 ? (
        <div className="text-center font-bold h-full">Bài hát bạn tìm</div>
      ) : (
        <>
          <SongList data={songname} type="" />
          <Artists d={artist} />
          <SongList data={songs} type="" />
          <Playlists d={playlists} title="Danh sách phát nhạc" />
        </>
      )}
    </div>
  );
}
