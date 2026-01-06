import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "@/page/Redux/RootRedux";
import { artist } from "../PlayListPage/PlayListPage";
import { SongList } from "@/page/component/Song/Index";
import { useParams } from "react-router-dom";
import { get2, post2 } from "@/page/config/req";
import React from "react";
import PlayButtom from "@/page/component/PlayButtom";
import TypeFriend from "@/page/component/friend/TypeFriend";
import { SongInPlayList } from "@/page/component/Song/interface";
import { Avatar } from "@/page/component/avatar";
import { iPlayList } from "@/page/component/Playlist/interface";
import { Playlists } from "@/page/component/Playlist";
import ImagePath from "@/page/config/img";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CACHE_5_DAY,
  LIKE_PLAYLIST_QUERY,
  SINGLE_ARTISTS_QUERY,
} from "@/page/contant/quey_key";
import { ButtonRandomPlay } from "@/page/component/Audio";
import ColorImage from "@/page/config/corlorImage";
import { queryClient } from "@/page/App";
import PlaylistLoading from "@/page/component/loading/PlaylistLoading";
import { SetCurName } from "@/page/Redux/HomeRedux";

export default function ArtistPage() {
  const [lsartist, setLsAtist] = useState<iPlayList[]>([]);
  const [artist, setaAtist] = useState<artist>();
  const [isfriend, setIsfriend] = useState<"-1" | "0" | "1" | "2">();
  const [songs, setSongs] = useState<SongInPlayList[]>([]);
  const [like, setLike] = useState(false);
  const [reset, setReset] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(420);
  const [bg, setBg] = useState("black");
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );

  const { data: fetchArtistData } = useQuery<{
    isfriend: "-1" | "0" | "1" | "2";
    songs: SongInPlayList[];
    artist: artist;
    lsplaylistartist: iPlayList[];
    like: boolean;
  }>({
    queryKey: [SINGLE_ARTISTS_QUERY, id],
    queryFn: async () => {
      let v = await get2(`/user/artistpage/${id}`);
      if (!v || v.err) {
        return v || {};
      }
      return {
        isfriend: v.isfriend,
        songs: v.lsong,
        artist: v.atist,
        lsplaylistartist: v.lsplaylistartist,
        like: v.like,
      };
    },
    staleTime: CACHE_5_DAY,
  });

  useEffect(() => {
    setReset(true);
    return () => {};
  }, [id]);

  useEffect(() => {
    let g;
    if (!fetchArtistData || !fetchArtistData.artist) {
      return;
    }
    let v = fetchArtistData;

    g = setTimeout(() => {
      setIsfriend(v.isfriend);
      setaAtist(v.artist);
      setSongs(v.songs);
      setLsAtist(v.lsplaylistartist);
      dispatch(SetCurName(v.artist.ChanalName || ""));
      setLike(v.like);
    }, 300);

    return () => clearTimeout(g);
  }, [fetchArtistData]);

  useMemo(async () => {
    if (artist?.pathImage == undefined) {
      return "black";
    }
    const bg = await ColorImage(ImagePath(artist.pathImage));

    setBg(bg);
  }, [artist?.pathImage]);

  const style = useMemo(() => {
    return { "--bg": bg } as React.CSSProperties;
  }, [bg]);

  const { mutate: addLikePlaylist } = useMutation({
    mutationFn: async () => {
      const data = await post2("/likePlaylist/add", { idPlaylist: id });
      return data;
    },
    onSuccess: (result) => {
      if (result) {
        setLike(true);
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
        queryClient.setQueryData([SINGLE_ARTISTS_QUERY, id], {
          ...fetchArtistData,
          like: true,
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
        setLike(false);
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
        queryClient.setQueryData([SINGLE_ARTISTS_QUERY, id], {
          ...fetchArtistData,
          like: false,
        });
      }
    },
  });

  useEffect(() => {
    let f = setInterval(() => {
      setHeaderHeight(headerRef.current?.clientHeight || 420);
    }, 200);
    return () => {
      clearInterval(f);
    };
  }, []);

  if (songs.length <= 0) {
    return <PlaylistLoading></PlaylistLoading>;
  }

  return (
    <div style={style} className="relative ">
      <div ref={headerRef}>
        {artist?.Banner !== "" ? (
          <div
            className="hidden sm:block opacity-60 bg-no-repeat bg-cover bg-blend-color rounded-t-lg absolute top-0 left-0 w-full h-[340px] "
            style={{
              backgroundImage: `url(${ImagePath(artist?.Banner || "")})`,
            }}
          ></div>
        ) : (
          <>
            <div className="hidden sm:block bg-playlist rounded-t-lg absolute top-0 left-0 w-full h-[340px] "></div>
          </>
        )}
        <div className="sm:flex items-end max-sm:justify-center w-full p-2 bg-artis">
          {artist?.Banner == "" && (
            <Avatar
              className="size-[250px] shadowPlaylist hidden sm:block  rounded-full"
              src={artist?.pathImage || ""}
            />
          )}
          <div className="flex flex-col max-sm:gap-y-1 max-sm:items-center justify-end h-[320px]  z-10 sm:p-4">
            <Avatar
              className="size-[170px] shadowPlaylist block sm:hidden  rounded-full"
              src={artist?.pathImage || ""}
            />
            <div className="flex items-center self-start">
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
            <h1 className="self-start">
              <span className="text-white ChanalName hidden sm:block font-bol text-[40px] lg:text-[70px] xl:text-[80px] overflow-hidden line-clamp-1  font-black">
                {artist?.ChanalName}
              </span>
              <span className="text-white ChanalName block sm:hidden font-bol text-[18px] line-clamp-1  font-black">
                {artist?.ChanalName}
              </span>
            </h1>
            <span className="text-[16px] self-start font-bold text-white">
              1.235.194 người nghe hằng tháng
            </span>
          </div>
        </div>
        <div className="sm:px-4">
          <div className="flex items-center py-4 gap-x-4">
            <div className="max-sm:flex-1 flex justify-end order-[99] sm:order-[-1]">
              <PlayButtom id={id + ""} page="artist" />
            </div>
            {isLogin && (
              <>
                {like ? (
                  <button
                    className="font-bold cursor-pointer text-[14px] border-2 border-white text-white rounded-full px-2 py-1"
                    onClick={() => {
                      deleteLikePlaylist();
                    }}
                  >
                    Đang Theo dõi
                  </button>
                ) : (
                  <button
                    className="font-bold cursor-pointer text-[14px] border-2 border-white text-white rounded-full px-2 py-1"
                    onClick={() => {
                      addLikePlaylist();
                    }}
                  >
                    Theo dõi
                  </button>
                )}
              </>
            )}
            <ButtonRandomPlay className="size-8" />
            <div className="cursor-pointer">
              <svg
                className="fill-[#C7C7C7] hover:fill-white size-[45px] "
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
              </svg>
            </div>
            <TypeFriend idFriend={artist?.id} type={isfriend} />
          </div>
          <div className="py-3 font-bold text-[24px]  text-white">
            Các bài hát
          </div>
        </div>
      </div>

      <SongList data={songs} type="artist" headerHeight={headerHeight} />

      <Playlists
        className="cursor-pointer size-[160px] sm:size-[180px]"
        d={lsartist}
        title="Nghệ sĩ xuất hiện"
      />
    </div>
  );
}
