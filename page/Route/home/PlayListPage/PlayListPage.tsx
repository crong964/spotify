import React, { useEffect, useMemo, useState, useTransition } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetCurName, SetPlaylist } from "@/page/Route/home/RootRedux";
import { get2, post, post2 } from "@/page/config/req";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CACHE_5_DAY,
  LIKE_PLAYLIST_QUERY,
  SINGLE_PLAYLIST_QUERY,
} from "@/page/contant/quey_key";
import { ButtonRandomPlay } from "@/page/component/Audio";
import ColorImage from "@/page/config/corlorImage";
import ImagePath from "@/page/config/img";
import { queryClient } from "@/page/App";
import { Loading } from "@/page/component/loading";

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
  const [isPending, startTransition] = useTransition();
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
  const [sh, sH] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bg, setBg] = useState("black");
  const { data } = useQuery({
    queryKey: [SINGLE_PLAYLIST_QUERY, id],
    queryFn: async () => {
      const v = await get2(`/playlist/data/${id}`);
      if (v && !v.err) {
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
        return {
          songs: v.songs,
          like: v.like,
          idU: v.idU,
          tabs: maxtab,
          playlist: v.playlist,
        };
      }
      return v;
    },
    staleTime: CACHE_5_DAY,
  });

  const { mutate: addLikePlaylist } = useMutation({
    mutationFn: async () => {
      const data = await post2("/likePlaylist/add", { idPlaylist: id });
      return data;
    },
    onSuccess: (result) => {
      if (result) {
        SetLike(!like);
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
      }
    },
  });

  const { mutate: deleteLikePlaylist } = useMutation({
    mutationFn: async () => {
      const data = await post2("/likePlaylist/delete", { idPlaylist: id });
      return data;
    },
    onSuccess: (result) => {
      if (result) {
        SetLike(!like);
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
      }
    },
  });

  useEffect(() => {
    if (data && data.songs && data.playlist) {
      let time = 0;
      (data.songs as SongInPlayList[]).forEach((song) => {
        time += Number(song.Duration + "");
      });
      let playlist = { ...data.playlist };

      startTransition(() => {
        playlist.Duration = time;
        playlist.Songs = data.songs.length;
        SetSongS(data.songs);
        SetLike(data.like);
        SetIdU(data.idU);
        SetTabs(data.tabs);
        dispatch(SetCurName(playlist.PlayListName));
        dispatch(SetPlaylist(playlist));
      });
    }
  }, [data]);

  useMemo(async () => {
    if (playlist.ImagePath == undefined) {
      return "black";
    }
    const bg = await ColorImage(ImagePath(playlist.ImagePath));
    return bg;
  }, [playlist.ImagePath]);

  const style = useMemo(() => {
    return { "--bg": bg } as React.CSSProperties;
  }, [bg]);

  if (songs.length <= 0 || isPending) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <div
        style={style}
        className="bgplaylist rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end "
      >
        <div className="flex flex-col sm:flex-row z-10 p-4   sm:space-x-4 justify-center sm:justify-start items-center sm:items-end">
          <div
            className="relative"
            onMouseEnter={() => {
              if (playlist.User_id == idU) {
                sH(true);
              }
            }}
          >
            <Avatar
              className="size-40 shadowPlaylist sm:size-[250px] rounded-2xl"
              src={playlist.ImagePath}
            />
            {sh && (
              <div
                onMouseLeave={() => {
                  sH(false);
                }}
                onClick={() => {
                  setEdit(true);
                }}
                className="bg-black opacity-30 absolute top-0 left-0 size-[160px] sm:size-[250px] flex items-center justify-center rounded-2xl"
              >
                <PencilIcon className="size-20 fill-white"></PencilIcon>
              </div>
            )}
          </div>

          <div className="flex flex-col max-sm:self-start gap-1 sm:gap-y-3">
            <span className="font-normal text-[16px] text-white">playlist</span>
            <h1>
              <span className="text-white font-bol text-lg sm:text-[50px] font-black">
                {playlist.PlayListName}
              </span>
            </h1>
            <div className="flex space-x-1 sm:space-x-4 text-[14px]  text-white">
              <span className=" font-bold ">{playlist.Songs} bài hát</span>
              <div>Khoảng thời gian:</div>
              <TimeString d={parseInt(playlist.Duration + "")} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="sm:px-4 py-2">
        <div className="flex items-center py-0 sm:py-4 gap-5 max-sm:px-1">
          <div className="max-sm:flex-1 flex justify-end order-[99] sm:order-[-1]">
            <PlayButtom id={id + ""} page="playlist" />
          </div>
          <ButtonRandomPlay className="size-8" />
          {isLogin && idU != playlist.User_id ? (
            <>
              {like ? (
                <button
                  onClick={() => {
                    deleteLikePlaylist();
                  }}
                >
                  <CheckCircleIcon className="size-[32px] fill-[#1ED760] "></CheckCircleIcon>
                </button>
              ) : (
                <button
                  onClick={() => {
                    addLikePlaylist();
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
        {isLogin && idU == playlist.User_id && playlist.User_id != "" && (
          <RecommendedSong
            tabs={tabs}
            idPlaylist={playlist.id}
            onclick={(v) => {
              if (v != undefined) {
                SetSongS([...songs, v]);
              }
            }}
          />
        )}
        <footer className="h-5"></footer>
      </div>
      {edit && (
        <PopEditPlaylis
          Discripition=""
          ImagePath={playlist.ImagePath}
          id={playlist.id}
          PlayListName={playlist.PlayListName}
          onChange={(v) => {
            dispatch(SetPlaylist({ ...playlist, ...v }));
          }}
          onShow={(v) => {
            setEdit(v);
          }}
        />
      )}
    </div>
  );
}
