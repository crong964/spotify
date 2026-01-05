import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "@/page/Redux/RootRedux";
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
import PlaylistLoading from "@/page/component/loading/PlaylistLoading";
import { SetCurName, SetPlaylist } from "@/page/Redux/HomeRedux";

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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [songs, setSongS] = useState<SongInPlayList[]>([]);
  const [idU, SetIdU] = useState("");
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const playlist = useSelector((state: RootHome) => state.rootHome.playlist);
  const [like, setLike] = useState(false);
  const [tabs, SetTabs] = useState("");
  const [sh, sH] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bg, setBg] = useState("black");
  const [reset, setReset] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(420);
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
        setLike(!like);
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
        setLike(!like);
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
      }
    },
  });

  useEffect(() => {
    setReset(true);
    return () => {};
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    if (!reset) {
      setIsLoading(false);
      return;
    }
    let g = null;
    if (data && data.songs && data.playlist) {
      let time = 0;
      (data.songs as SongInPlayList[]).forEach((song) => {
        time += Number(song.Duration + "");
      });
      let playlist = { ...data.playlist };
      startTransition(() => {
        playlist.Duration = time;
        playlist.Songs = data.songs.length;
        setSongS(data.songs);
        setLike(data.like);
        SetIdU(data.idU);
        SetTabs(data.tabs);
        dispatch(SetCurName(playlist.PlayListName));
        dispatch(SetPlaylist(playlist));
      });

      g = setTimeout(() => {
        setReset(false);
        setIsLoading(false);
      }, 400);
    }
    return () => {
      if (g) {
        clearTimeout(g);
      }
    };
  }, [data, reset]);

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
  useEffect(() => {
    let f = setInterval(() => {
      setHeaderHeight(headerRef.current?.clientHeight || 420);
    }, 200);
    return () => {
      clearInterval(f);
    };
  }, []);

  if (isLoading) {
    return <PlaylistLoading />;
  }

  return (
    <div className="relative">
      <div ref={headerRef} className="w-full pb-2 px-2">
        <div
          style={style}
          className="bg-playlist rounded-t-lg w-full h-[320px] flex flex-col justify-end "
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
              <span className="font-normal text-[16px] text-white">
                playlist
              </span>
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
        <div className="sm:px-4">
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
        </div>
        <div className="hidden sm:grid grid-cols-7 text-[13px] sm:text-[14px]  cursor-pointer sm:gap-x-2  text-white font-bold rounded-lg items-center">
          <div className="col-span-3 flex items-center space-x-2">
            <div className="inline-block"># Tên nhạc</div>
          </div>
          <div className="sm:block hidden col-span-2 text-[14px] ">
            Lượt xem
          </div>
          <div className="sm:block hidden col-span-1 text-[14px] ">
            thời gian
          </div>
        </div>
      </div>
      
      <SongList data={songs} headerHeight={headerHeight} type="playlist" />

      <div className="px-4">
        {isLogin && idU == playlist.User_id && playlist.User_id != "" && (
          <RecommendedSong
            tabs={tabs}
            idPlaylist={playlist.id}
            onclick={(v) => {
              if (v != undefined) {
                setSongS([...songs, v]);
                queryClient.setQueryData([SINGLE_PLAYLIST_QUERY, id], {
                  ...data,
                  songs: [...songs, v],
                });
              }
            }}
          />
        )}
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
