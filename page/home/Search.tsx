import React, { useEffect, useState } from "react";
import { SongList } from "./PlayList";
import { Song } from "./PlayList";
import { useDispatch, useSelector } from "react-redux";
import { IdPage, NaviPage, RootHome } from "./RootRedux";
import { post } from "../config/req";
import PlayButtom from "./PlayButtom";
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
export default function Search() {
  const [songname, SetSongName] = useState<Song[]>([]);
  const [songs, SetSongS] = useState<Song[]>([]);
  const search = useSelector((state: RootHome) => state.rootHome.search);
  const [artist, SetArtis] = useState<artist[]>([]);

  useEffect(() => {
    post("/search", { name: search }, (v: any) => {
      SetSongName(v["ls"]);
      SetArtis(v["artise"]);
      SetSongS(v["songls"]);
    });
  }, [search]);
  return (
    <div className="w-full">
      <SongList data={songname} />
      <Artists d={artist} />
      <SongList data={songs} />
    </div>
  );
}

function Artists(d: Artists) {
  const recentList = useSelector(
    (state: RootHome) => state.rootHome.recentList
  );
  return (
    <div className="mt-8">
      {d.d.length > 0 ? (
        <div className="text-white text-[24px] font-bold">Nghệ sĩ</div>
      ) : (
        <></>
      )}
      <div
        className={`grid gap-3 ${!recentList ? "grid-cols-6" : "grid-cols-7 "}`}
      >
        {d.d.map((v) => {
          return (
            <Artist
              ChanalName={v.ChanalName}
              artist={v.artist}
              key={v.id}
              id={v.id}
              pathImage={v.pathImage}
              type="nghệ sĩ"
            />
          );
        })}
      </div>
    </div>
  );
}

function Artist(params: artist) {
  const [hidden, SetHidden] = useState(true);

  const dispatch = useDispatch();
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        dispatch(NaviPage("playlist"));
        dispatch(IdPage(params.id));
      }}
      onMouseEnter={() => {
        SetHidden(false);
      }}
      onMouseLeave={() => {
        SetHidden(true);
      }}
    >
      <div className="relative">
        <img
          src={params.pathImage}
          className="w-full rounded-full"
          alt=""
          srcSet=""
        />
        {hidden ? (
          <></>
        ) : (
          <div className="absolute right-0 bottom-0">
            <PlayButtom />
          </div>
        )}
      </div>
      <div className="text-[16px] text-white font-bold line-clamp-1">
        {params.ChanalName}
      </div>
      <div className="text-[14px] text-[#b3b3b3] font-normal line-clamp-1">
        {params.type == "artist" ? "nghệ sĩ" : params.artist}
      </div>
    </div>
  );
}
