import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetCurName } from "@/page/Route/home/RootRedux";
import { artist } from "../PlayListPage/PlayListPage";
import { SongList } from "@/page/component/Song/Index";
import { useParams } from "react-router-dom";
import { get, get2, post, post2 } from "@/page/config/req";
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

export default function ArtistPage() {
  const [lsartist, SetLsAtist] = useState<iPlayList[]>([]);
  const [artist, SetaAtist] = useState<artist>();
  const [isfriend, SetIsfriend] = useState<"-1" | "0" | "1" | "2">();
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const [like, SetLike] = useState(false);
  const refPage = useRef<HTMLDivElement>(null);
  const [bg, setBg] = useState("black");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isloaing, startTransition] = useTransition();
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );

  const { data: fetchArtistData } = useQuery<
    | {
        isfriend: "-1" | "0" | "1" | "2";
        songs: SongInPlayList[];
        artist: artist;
        lsplaylistartist: iPlayList[];
        like: boolean;
      }
    | undefined
  >({
    queryKey: [SINGLE_ARTISTS_QUERY, id],
    queryFn: async () => {
      let v = await get2(`/user/artistpage/${id}`);
      if (!v || v.err) {
        let f: any = {};

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
    if (!fetchArtistData || !fetchArtistData.artist) {
      return;
    }
    startTransition(() => {
      let v = fetchArtistData;
      SetIsfriend(v.isfriend);
      SetaAtist(v.artist);
      SetSongS(v.songs);
      SetLsAtist(v.lsplaylistartist);
      dispatch(SetCurName(v.artist.ChanalName || ""));
      SetLike(v.like);
      if (refPage.current) {
        refPage.current.scrollIntoView();
      }
    });
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
  if (isloaing) {
    return <></>;
  }
  return (
    <div style={style} className="relative " ref={refPage}>
      {artist?.Banner !== "" ? (
        <div
          className="hidden sm:block opacity-60 bg-no-repeat bg-cover bg-blend-color rounded-t-lg absolute top-0 left-0 w-full h-[340px] "
          style={{
            backgroundImage: `url(${ImagePath(artist?.Banner || "")})`,
          }}
        ></div>
      ) : (
        <>
          <div className="hidden sm:block bgplaylist rounded-t-lg absolute top-0 left-0 w-full h-[340px] "></div>
        </>
      )}
      <div className="sm:flex items-end max-sm:justify-center w-full p-2 bgartis">
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
        <SongList data={songs} type="artist" />
        <Playlists
          className="cursor-pointer size-[160px] sm:size-[180px]"
          d={lsartist}
          title="Nghệ sĩ xuất hiện"
        />
        <footer className="h-5"></footer>
      </div>
    </div>
  );
}
