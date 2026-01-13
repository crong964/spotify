import { useSelector } from "react-redux";
import { RootHome } from "@/page/Redux/RootRedux";
import { useEffect, useState } from "react";
import React from "react";
import { post } from "@/page/config/req";

import { useParams } from "react-router-dom";
import { iPlayList } from "@/page/component/Playlist/interface";
import PlayList from "@/page/component/Playlist/Playlist";

interface Genre {
  Id: string;
  Name: string;
  RightGenre: number;
  LeftGenre: number;
  idParent: string;
  Floor: number;
}
export default function IdGenre() {
  const { id } = useParams();

  const [playlists, SetPlayLists] = useState<iPlayList[]>([]);
  const [genres, SetGernes] = useState<Genre[]>([]);
  useEffect(() => {
    post(`/genre/${id}`, {}, (v: any) => {
      if (!v || v.err) {
        return;
      }
      SetPlayLists(v.playlist);
      SetGernes(v.genre);
    });
  }, [id]);

  const playListByGenre = genres.map((genre) => {
    return <PlayListByGenre genre={genre} ls={playlists} key={genre.Id} />;
  });
  return <div>{playListByGenre}</div>;
}
interface PlayListByGenre {
  genre: Genre;
  ls: iPlayList[];
}
function PlayListByGenre({ genre, ls }: PlayListByGenre) {
  const Right = useSelector((s: RootHome) => s.rootHome.Right);
  const playLists = ls
    .filter(({ Genre_ID }) => {
      return Genre_ID == genre.Id;
    })
    .map(({ ImagePath, PlayListName, Type, id, Genre_ID }) => {
      return (
        <PlayList
          Type={Type}
          Genre_ID={Genre_ID}
          ImagePath={ImagePath}
          PlayListName={PlayListName}
          id={id}
          key={id}
        />
      );
    });
  return (
    <div className="overflow-auto w-full">
      {playLists.length > 0 && (
        <>
          <div className="text-[24px] font-bold sticky top-0 left-0">
            {genre.Name}
          </div>{" "}
          <div className="text-white overflow-x-scroll w-max sm:w-full my-3 space-y-3">
            <div
              className={`flex sm:grid gap-2 ${
                Right == "" ? "grid-cols-7" : "grid-cols-5 "
              }`}
            >
              {playLists}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
