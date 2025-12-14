import React, { useEffect, useState } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetCurName, SetPlaylist } from "@/page/Route/home/RootRedux";
import { get, post } from "@/page/config/req";
import { RecommendedSong, SongList } from "@/page/component/Song/Index";

import { TimeString } from "@/page/component/Time";
import { useParams } from "react-router-dom";

import {
  CheckCircleIcon,
  PencilIcon,
  PlusCircleIcon,
  ThreeDotsIcon,
} from "@/icon/Icon";
import { SongInPlayList } from "@/page/component/Song/interface";
import { Avatar } from "@/page/component/avatar";
import { PopEditPlaylis } from "@/page/component/Playlist";
import { useQuery } from "@tanstack/react-query";
import { CACHE_5_DAY, SINGLE_PLAYLIST_QUERY } from "@/page/contant/quey_key";

var g = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 6, 7];
export interface artist {
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
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  liked: string;
}

interface SongList {
  data: Song[];
}
interface PlayList {
  id: string;
  ImagePath: string;
  PlayListName: string;
  Likes: number;
  Songs: number;
  Duration: string;
  User_id: string;
}
export default function PlaylistPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const [idU, SetIdU] = useState("");
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const playlist = useSelector((state: RootHome) => state.rootHome.playlist);
  const [like, SetLike] = useState(false);
  const [tabs, SetTabs] = useState("");
  const [sh, SH] = useState(false);
  const [edit, SetEdit] = useState(false);
  
  const fetchPlaylist = (): Promise<{
    songs: SongInPlayList[];
    idU: string;
    like: boolean;
    tabs: string;
    playlist: PlayList;
  }> => {
    return new Promise((result, rej) => {
      get(`/playlist/data/${id}`, (v: any) => {
        if (v && !v.err) {
          var time = 0;
          var song = 0;
          for (let i = 0; i < v.songs.length; i++) {
            const element: Song = v.songs[i];
            time += parseInt(element.Duration + "");
            song += 1;
          }
          v.playlist.Duration = time;
          v.playlist.Songs = song;

          let ls = v.songs as SongInPlayList[];
          let tab: any = {};
          for (let i = 0; i < ls.length; i++) {
            const e = ls[i];
            if (e.Genre_id) {
              tab[e.Genre_id] = !tab[e.Genre_id] ? 1 : tab[e.Genre_id] + 1;
            }
          }
          let max = 0;
          let maxtab = "";
          for (const key in tab) {
            if (Object.prototype.hasOwnProperty.call(tab, key)) {
              const e = tab[key];
              if (e > max) {
                maxtab = key;
                max = e;
              }
            }
          }
          result({
            songs: v.songs,
            like: v.like,
            idU: v.idU,
            tabs: maxtab,
            playlist: v.playlist,
          });
        }
        result(v || {});
      });
    });
  };

  const { data } = useQuery({
    queryKey: [SINGLE_PLAYLIST_QUERY, id],
    queryFn: async () => {
      const data = await fetchPlaylist();
      return data;
    },
    staleTime: CACHE_5_DAY,
  });
  useEffect(() => {
    if (data && data.songs && data.playlist) {
      SetSongS(data.songs);
      SetLike(data.like);
      SetIdU(data.idU);
      SetTabs(data.tabs);
      dispatch(SetCurName(data.playlist.PlayListName));
      dispatch(SetPlaylist(data.playlist));
    }
  }, [data]);
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end ">
        <div className="flex items-end justify-start">
          <div className="flex z-10 p-4 justify-center items-end sm:space-x-4">
            <div
              className="relative"
              onMouseEnter={() => {
                if (playlist.User_id == idU) {
                  SH(true);
                }
              }}
            >
              <Avatar
                className="size-[250px] rounded-2xl"
                src={playlist.ImagePath}
              />
              {sh ? (
                <div
                  onMouseLeave={() => {
                    SH(false);
                  }}
                  onClick={() => {
                    SetEdit(true);
                  }}
                  className="bg-black opacity-30 absolute top-0 left-0 size-[250px] flex items-center justify-center rounded-2xl"
                >
                  <PencilIcon className="size-20 fill-white"></PencilIcon>
                </div>
              ) : (
                <></>
              )}
            </div>

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
                <span className="text-[16px] font-bold text-white flex items-center space-x-3">
                  <div>Khoảng thời gian:</div>
                  <TimeString d={parseInt(playlist.Duration + "")} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="sm:px-4 py-2">
        <div className="flex items-center py-0 sm:py-4 space-x-5">
          <PlayButtom id={id + ""} page="playlist" />
          {isLogin && idU != playlist.User_id ? (
            <>
              {like ? (
                <button
                  onClick={() => {
                    post(
                      "/likePlaylist/delete",
                      { idPlaylist: id },
                      (v: any) => {
                        if (v) {
                          SetLike(!like);
                        }
                      }
                    );
                  }}
                >
                  <CheckCircleIcon className="size-[32px] fill-[#1ED760] "></CheckCircleIcon>
                </button>
              ) : (
                <button
                  onClick={() => {
                    post("/likePlaylist/add", { idPlaylist: id }, (v: any) => {
                      if (v) {
                        SetLike(!like);
                      }
                    });
                  }}
                >
                  <PlusCircleIcon className="size-[32px] fill-[#C7C7C7] "></PlusCircleIcon>
                </button>
              )}
            </>
          ) : (
            <></>
          )}

          <button className="cursor-pointer">
            <ThreeDotsIcon className="fill-[#C7C7C7] hover:fill-white size-[45px] "></ThreeDotsIcon>
          </button>
        </div>
        <div className="py-3 font-bold text-[24px]  text-white">
          Các bài hát
        </div>
        <SongList data={songs} type="playlist" />
        {isLogin && idU == playlist.User_id && playlist.User_id != "" ? (
          <RecommendedSong
            tabs={tabs}
            idPlaylist={playlist.id}
            onclick={(v) => {
              alert(v != undefined);
              if (v != undefined) {
                SetSongS([...songs, v]);
              }
            }}
          />
        ) : (
          <></>
        )}
        <footer className="h-5"></footer>
      </div>
      {edit ? (
        <PopEditPlaylis
          Discripition=""
          ImagePath={playlist.ImagePath}
          id={playlist.id}
          PlayListName={playlist.PlayListName}
          onChange={(v) => {
            dispatch(SetPlaylist({ ...playlist, ...v }));
          }}
          onShow={(v) => {
            SetEdit(v);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
