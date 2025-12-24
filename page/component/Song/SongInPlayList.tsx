import { useState } from "react";
import { SongInPlayList } from "./interface";
import { RootHome } from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { CheckCircleIcon, PlusCircleIcon, TrashIcon } from "@/icon/Icon";
import Time from "@/page/component/Time";
import {
  SetAutoPlay,
  SetIdSelectedSong,
  SetSongs,
} from "@/page/component/Audio/AudioRedux";
import { post, post2 } from "@/page/config/req";
import { Modal, Pop } from "@/page/component/pop";
import { Avatar } from "@/page/component/avatar";
import ImagePath from "@/page/config/img";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/page/App";
import {
  LIKE_PLAYLIST_QUERY,
  LOVE_SONG_QUERY,
  SINGLE_PLAYLIST_QUERY,
} from "@/page/contant/quey_key";

const ArtistLink = React.lazy(() => import("@/page/component/ArtistLink"));

export default function SongInPlayList(song: SongInPlayList) {
  const [liked, setLike] = useState<string>(song.liked);
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const idUser = useSelector((state: RootHome) => state.rootauth.login.idUser);
  const playlists = useSelector((state: RootHome) => state.rootHome.playlists);
  const playlist = useSelector((state: RootHome) => state.rootHome.playlist);
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
  const stop = useSelector((state: RootHome) => state.audioroot.stop);
  const idSelectedSong = useSelector(
    (state: RootHome) => state.audioroot.idSelectedSong
  );
  const typeDevice = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const dispatch = useDispatch();
  const [xy, XY] = useState({ x: 0, y: 0, s: false });

  const GetSongPlay = () => {
    post(
      "/song/get",
      {
        idsong: song.Id,
      },
      (v: any) => {
        if (v && !v.err) {
          dispatch(SetSongs([v.song]));
          localStorage.setItem("song", JSON.stringify(v.song));
        }
      }
    );
    dispatch(SetAutoPlay(true));
  };

  const { mutate: createplaylist } = useMutation({
    mutationFn: async () => {
      const data = await post2("/playlist/addplaylist", { idsong: song.Id });
      if (data) {
        return data;
      } else {
        return undefined;
      }
    },
    onSuccess: (result) => {
      if (!result) {
        alert("Thất bại");
        return;
      }

      if (!result.err) {
        alert("thành công");
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
      }
    },
  });
  const { mutate: deleteSong } = useMutation({
    mutationFn: async ({
      playlist_id,
      song_id,
    }: {
      song_id: string;
      playlist_id: string;
    }) => {
      const data = await post2("/contain/deletesong", {
        Song_id: song_id,
        PlayList_id: playlist_id,
      });
      return data;
    },
    onSuccess: (data, variables) => {
      if (!data) {
        alert("xóa thất bại");
        return;
      }
      if (data.err) {
        alert("xóa thất bại");
      } else {
        alert("xóa thành công");
        queryClient.invalidateQueries({
          queryKey: [SINGLE_PLAYLIST_QUERY, variables.playlist_id],
        });
      }
    },
  });
  const { mutate: addLoveSong } = useMutation({
    mutationFn: async (idSong: string) => {
      const data = await post2("/lsong/add", {
        Id: idSong,
      });

      return data;
    },
    onSuccess: (data) => {
      if (data && !data.err) {
        setLike(data.liked);
        queryClient.invalidateQueries({
          queryKey: [LOVE_SONG_QUERY],
        });
      }
    },
  });

  const { mutate: addSongIntoPlaylist } = useMutation({
    mutationFn: async ({
      playlist_id,
      song_id,
    }: {
      song_id: string;
      playlist_id: string;
    }) => {
      const data = await post2("/contain/addsong", {
        Song_id: song_id,
        PlayList_id: playlist_id,
      });
      if (data) {
        return data;
      }

      return {};
    },
    onSuccess: (result, input) => {
      if (result && !result.err) {
        alert("thêm thành công");
        queryClient.invalidateQueries({
          queryKey: [SINGLE_PLAYLIST_QUERY, input.playlist_id],
        });
      } else {
        alert("thêm thất bại");
      }
    },
  });
  return (
    <div
      onContextMenu={(v) => {
        if (typeDevice == "mobile") {
          XY({ x: 0, y: 0, s: true });
          return;
        }
        XY({ x: v.pageX, y: v.pageY, s: true });
      }}
      className={`${
        idSelectedSong == song.Id ? "bg-song-click" : "bg-song"
      } grid grid-cols-7 text-[13px] sm:text-[14px] sm:p-2 py-2 cursor-pointer sm:space-x-2  text-white font-bold rounded-sm items-center`}
    >
      <div
        className="col-span-5 grid grid-cols-5"
        onClick={() => {
          if (idSelectedSong == song.Id) {
            GetSongPlay();
            return;
          }
          if (typeDevice == "pc") {
            dispatch(SetIdSelectedSong(song.Id));
            return;
          }
          GetSongPlay();
        }}
      >
        <div className="col-span-5 sm:col-span-3 flex items-center space-x-2">
          <div className="mx-2 sm:inline-block hidden ">
            {lsSong[mark] && lsSong[mark].Id == song.Id && !stop ? (
              <img
                className="size-3"
                src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
              ></img>
            ) : (
              <span>{song.stt}</span>
            )}
          </div>
          <Avatar
            className="size-12 sm:size-9"
            src={ImagePath(song.SongImage)}
          />
          <div className="flex-col">
            <div className="block">{song.SongName}</div>
            {song.type != "artist" ? (
              <ArtistLink
                key={song.Id}
                idArtist={song.user_id}
                nameArtist={song.Singer}
              />
            ) : (
              <div className="block sm:hidden text-stone-500">
                {song.Viewer}
              </div>
            )}
          </div>
        </div>

        <div className="sm:block hidden col-span-2 p-2 text-[14px] text-stone-500">
          {song.Viewer}
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 flex items-center space-x-4">
        {isLogin && (
          <div
            className=""
            onClick={() => {
              addLoveSong(song.Id);
            }}
          >
            {liked ? (
              <CheckCircleIcon className="fill-[#1DD25E] size-4 mx-2"></CheckCircleIcon>
            ) : (
              <PlusCircleIcon className="fill-white size-4 mx-2"></PlusCircleIcon>
            )}
          </div>
        )}
        <Time d={parseInt(song.Duration + "")} />
      </div>
      {xy.s && (
        <Modal
          left={xy.x}
          top={xy.y}
          show={(v) => {
            XY({ ...xy, s: v });
          }}
        >
          <div className="text-[20px] sm:text-[15px] relative">
            <div className="block absolute top-0 left-0 sm:hidden h-screen w-screen bg-black opacity-30"></div>
            <div
              onClick={() => {
                XY({ ...xy, s: false });
              }}
              className="absolute top-0 left-0 flex sm:block items-end h-screen w-screen sm:h-auto sm:w-min"
            >
              <div
                className=" bg-[#282828] h-[350px] w-full sm:min-w-[250px] text-[14px] p-1 "
                onClick={(e) => {
                  e.stopPropagation();
                  XY({ ...xy, s: true });
                }}
              >
                <div className="flex sm:hidden py-6 px-2">
                  <Avatar className="size-12" src={ImagePath(song.SongImage)} />
                  <div className="flex flex-col pl-3">
                    <div className="w-full text-[20px] font-bold">
                      {song.SongName}
                    </div>
                    <div className="w-full text-[15px] flex space-x-2">
                      <ArtistLink
                        idArtist={song.user_id}
                        nameArtist={song.Singer}
                      />
                      <div className="px-0.5">•</div>
                      <div>{song.SongName}</div>
                    </div>
                  </div>
                </div>
                {idUser == playlist.User_id && (
                  <button
                    onClick={() => {
                      deleteSong({
                        playlist_id: playlist.id,
                        song_id: song.Id,
                      });
                    }}
                    className="flex p-3 justify-start items-center gap-2 hover:bg-black w-full"
                  >
                    <TrashIcon className="size-[12px] fill-white" />
                    <div>Xóa danh nhạc khỏi danh sách</div>
                  </button>
                )}
                <button
                  onClick={() => {
                    createplaylist();
                  }}
                  className="flex p-3 justify-start items-center gap-2 hover:bg-black w-full"
                >
                  <PlusCircleIcon className="size-[14px] fill-white" />
                  <div>Tạo danh sách mới</div>
                </button>
                {playlists.map((vp) => {
                  return (
                    <button
                      onClick={() => {
                        addSongIntoPlaylist({
                          playlist_id: vp.idplaylist,
                          song_id: song.Id,
                        });
                      }}
                      className="p-3 flex hover:bg-black w-full"
                    >
                      {vp.PlayListName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
