import { useDispatch, useSelector } from "react-redux";
import rootHome, { NaviPage, RootHome } from "./RootRedux";
import { useEffect, useState } from "react";
import React from "react";
import { get } from "../config/req";
import PlayButtom from "../component/PlayButtom";
import { PlayList } from "../component/Playlist";

interface Genre {
  Id: string;
  Name: string;
  RightGenre: number;
  LeftGenre: number;
  idParent: string;
  Floor: number;
}
export default function IdGenre() {
  const idgenre = useSelector(
    (state: RootHome) => state.rootHome.command.param
  );
  const [playlists, SetPlayLists] = useState<PlayList[]>([]);
  const [genres, SetGernes] = useState<Genre[]>([]);
  useEffect(() => {
    get(`genre/${idgenre}`, (v: any) => {
      SetPlayLists(v.playlist);
      SetGernes(v.genre);
    });
  }, [idgenre]);

  var ls = genres.map((v, i) => {
    return <PlayListByGenre genre={v} ls={playlists} key={i} />;
  });
  return <div>{ls}</div>;
}
interface PlayListByGenre {
  genre: Genre;
  ls: PlayList[];
}
function PlayListByGenre(d: PlayListByGenre) {
  const Right = useSelector((s: RootHome) => s.rootHome.Right);
  var ls = d.ls
    .filter((v) => {
      return v.Genre_ID == d.genre.Id;
    })
    .map((v) => {
      return (
        <PlayList
          
          Type={v.Type}
          Genre_ID={v.Genre_ID}
          ImagePath={v.ImagePath}
          PlayListName={v.PlayListName}
          id={v.id}
          key={v.id}
        />
      );
    });
  return (
    <div className="overflow-auto w-full">
      {ls.length > 0 ? (
        <>
          <div className="text-[24px] font-bold sticky top-0 left-0">
            {d.genre.Name}
          </div>{" "}
          <div className="text-white overflow-x-scroll w-max sm:w-full my-3 space-y-3">
            <div
              className={`flex sm:grid gap-2 ${
                Right == "" ? "grid-cols-7" : "grid-cols-5 "
              }`}
            >
              {ls}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
