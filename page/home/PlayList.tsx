import React, { useEffect, useState } from "react";
import InforUser from "./Header/InforUser";
import PlayButtom from "../component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, PlaySong, SetCurName, SetPlaying } from "./RootRedux";
import { get, post } from "../config/req";
import { SongInPlayList, SongList } from "../component/Song";
import TypeFriend from "./friend/TypeFriend";

var g = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 6, 7];
interface artise {
  id: string | undefined;
  Vertify: string | undefined;
  Nationality: string | undefined;
  ChanalName: string | undefined;
  Account: string | undefined;
  Name: string | undefined;
  description: string | undefined;
  pathImage: string | undefined;
  Password: string | undefined;
  Banner: string | undefined;
}
export interface Song {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: number;
  Viewer: number;
  SongImage: string;
  filePath: string;
  liked: string;
}

interface PlayList {
  id: string;
  ImagePath: string;
  PlayListName: string;
  Likes: number;
  Songs: number;
  Duration: string;
}
export function ArtisePage() {
  const idpage = useSelector((state: RootHome) => state.rootHome.command.param);
  const [artise, SetaAtist] = useState<artise>();
  const [isfriend, SetIsfriend] = useState<"-1" | "0" | "1" | "2">();
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    get(`user/artisepage/${idpage}`, (v: any) => {
      SetIsfriend(v.isfriend);
      SetaAtist(v.ls);

      dispatch(SetCurName(v.ls.ChanalName));
    });
    get(`lsong/getall/${idpage}`, (v: any) => {
      SetSongS(v.ls);
    });
  }, [idpage]);

  return (
    <div className="relative ">
      <div
        className="hidden sm:block bg-no-repeat bg-cover rounded-t-lg absolute top-0 left-0 w-full h-[320px] "
        style={{ backgroundImage: `url(${artise?.Banner || ""})` }}
      ></div>
      <div
        className="block sm:hidden bg-no-repeat bg-cover rounded-t-lg absolute top-0 left-0 w-full h-[320px]"
        style={{ backgroundImage: `url(${artise?.pathImage || ""})` }}
      ></div>
      <div className="opacity-25 bg-black absolute top-0 left-0 w-full h-[320px]"></div>
      <div className="flex flex-col justify-end absolute top-0 left-0 h-[320px] z-10 p-4">
        <div className="flex items-center">
          <svg
            fill="blue"
            aria-hidden="true"
            className="fill-blue-600 size-[20px]"
            viewBox="0 0 24 24"
          >
            <path d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"></path>
          </svg>
          <span className="font-normal text-[14px] text-white">
            Nghệ sĩ được xác minh
          </span>
        </div>
        <h1>
          <span className="text-white font-bol text-[40px] sm:text-[96px] font-black">
            {artise?.ChanalName}
          </span>
        </h1>
        <span className="text-[16px] font-bold text-white">
          1.235.194 người nghe hằng tháng
        </span>
      </div>

      <div className="h-[320px]"></div>
      <div className="px-4">
        <div className="flex items-center py-4 space-x-4">
          <PlayButtom id={idpage} page="artise" />
          <div className="font-bold cursor-pointer text-[14px] border-2 border-white text-white rounded-full px-2 py-1">
            Theo dõi
          </div>
          <div className="cursor-pointer">
            <svg
              className="fill-[#C7C7C7] hover:fill-white size-[45px] "
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
            </svg>
          </div>
          <TypeFriend idFriend={artise?.id} type={isfriend} />
        </div>
        <div className="py-3 font-bold text-[24px]  text-white">
          Các bài hát
        </div>
        <SongList data={songs} />
        <footer className="h-5"></footer>
      </div>
    </div>
  );
}

interface SongList {
  data: Song[];
}

export function LikedSongListPage() {
  const dispatch = useDispatch();
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  useEffect(() => {
    get(`lsong/likedsongs`, (v: any) => {
      SetSongS(v.ls);
    });
  }, []);
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 to-blue-500  rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex  flex-col justify-end "></div>
      <div className="opacity-25 bg-black absolute top-0 left-0 w-full h-[320px]"></div>
      <div className="flex  sm:justify-start justify-center w-full space-x-3 absolute top-0 left-0 h-[320px] z-10 p-4">
        <img
          src="/public/liked-songs-640.png"
          className="size-[270px] rounded-xl"
          alt=""
          srcSet=""
        />
        <div className="sm:flex flex-col justify-end hidden">
          <div className="flex items-center">
            <span className="font-normal text-[14px] text-white">playlist</span>
          </div>
          <div>
            <span className="text-white font-bol text-[96px] font-black">
              Danh sách yêu thích
            </span>
          </div>
          <span className="text-[16px] font-bold text-white">
            {songs.length} bài hát
          </span>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="px-4">
        <div className="flex items-center py-4 space-x-4">
          <div
            onClick={() => {
              dispatch(SetPlaying({ id: "", page: "likesong" }));
            }}
          >
            <PlayButtom id="" page="likesong" />
          </div>

          <div className="cursor-pointer">
            <svg
              className="fill-[#C7C7C7] hover:fill-white size-[45px] "
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
            </svg>
          </div>
        </div>
        <div className="py-3 font-bold text-[24px]  text-white">
          Các bài hát
        </div>
        <SongList data={songs} />
        <footer className="h-5"></footer>
      </div>
    </div>
  );
}

export default function PlaylistPage() {
  const dispatch = useDispatch();
  const idPlayList = useSelector(
    (state: RootHome) => state.rootHome.command.param
  );

  const [status, SetStatus] = useState<"play" | "pause">("pause");
  const [load, SetLoad] = useState(false);

  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const [playlist, SetPlayList] = useState<PlayList>({
    Duration: "",
    id: "",
    ImagePath: "",
    Likes: 0,
    PlayListName: "",
    Songs: 0,
  });
  useEffect(() => {
    get(`/playlist/${idPlayList}`, (v: any) => {
      if (v && !v.err) {
        SetSongS(v.songs);
        var time = 0;
        var song = 0;
        for (let i = 0; i < v.songs.length; i++) {
          const element: Song = v.songs[i];
          time += element.Duration;
          song += 1;
        }
        v.playlist.Duration = time;
        v.playlist.Songs = song;
        SetPlayList(v.playlist);
        dispatch(SetCurName(v.playlist.PlayListName));
        dispatch(SetPlaying({ id: idPlayList, page: "playlist" }));
      }
    });
  }, [idPlayList]);

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end ">
        <div className="flex items-end justify-start">
          <div className="flex z-10 p-4 justify-center items-end sm:space-x-4">
            <img
              className="size-[250px] rounded-2xl"
              src={playlist.ImagePath}
              alt=""
              srcSet=""
            />
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center">
                <span className="font-normal text-[16px] text-white">
                  playlist
                </span>
              </div>
              <h1>
                <span className="text-white font-bol text-[50px] font-black">
                  {playlist.PlayListName}
                </span>
              </h1>
              <div className="flex space-x-4">
                <span className="text-[16px] font-bold text-white">
                  {playlist.Songs} bài hát
                </span>
                <span className="text-[16px] font-bold text-white">
                  Khoảng thời gian: {playlist.Duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="px-4">
        <div className="flex items-center py-0 sm:py-4 space-x-4">
          <button
            onClick={() => {
              if (load == true) {
                return;
              }
              post(
                "recentPlaylist/play",
                { id: idPlayList, type: "playlist" },
                (v: any) => {
                  SetStatus("play");
                  SetLoad(false);
                }
              );
              SetLoad(true);
            }}
          >
            <button className={load ? "cursor-wait" : "cursor-pointer"}>
              <PlayButtom id={idPlayList} page="playlist" />
            </button>
          </button>
          <div className="cursor-pointer">
            <svg
              className="fill-[#C7C7C7] hover:fill-white size-[45px] "
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
            </svg>
          </div>
        </div>
        <div className="py-3 font-bold text-[24px]  text-white">
          Các bài hát
        </div>
        <SongList data={songs} />
        <footer className="h-5"></footer>
      </div>
    </div>
  );
}
