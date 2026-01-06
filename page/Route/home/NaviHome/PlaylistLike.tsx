import React, { useEffect, useState } from "react";
import { post2 } from "@/page/config/req";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pop } from "@/page/component/pop";
import { MusicNoteBeamedIcon, PlusIcon, TrashIcon, XIcon } from "@/icon/Icon";
import { iPlayList } from "@/page/component/Playlist/interface";

import Modal from "@/page/component/pop/Modal";
import { Avatar } from "@/page/component/avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CACHE_INFILITY,
  LIKE_PLAYLIST_QUERY,
  SINGLE_ARTISTS_QUERY,
  SINGLE_PLAYLIST_QUERY,
} from "@/page/contant/quey_key";
import { queryClient } from "@/page/App";
import { SetPlaylistRedux } from "@/page/Redux/HomeRedux";
import { RootHome } from "@/page/Redux/RootRedux";

export default function PlaylistLike() {
  const [playLists, setPlayLists] = useState<iPlaylistLikeItem[]>([]);
  const iduser = useSelector((state: RootHome) => state.rootauth.login.idUser);
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: [LIKE_PLAYLIST_QUERY],
    queryFn: async () => {
      const data = await post2("/likePlaylist/getall", {});
      if (data) {
        return {
          playlists: data.ls,
          idU: data.idU,
        };
      }
      return {};
    },
    staleTime: CACHE_INFILITY,
  });

  useEffect(() => {
    if (data && data.idU && data.playlists) {
      const idU = data.idU;
      const playlists = data.playlists;
      setPlayLists(playlists);
      let ls = [];
      for (let i = 0; i < playlists.length; i++) {
        const element: iPlaylistLikeItem = playlists[i];
        if (element.User_id == idU) {
          ls.push({
            idplaylist: element.id,
            PlayListName: element.PlayListName,
          });
        }
      }
      dispatch(SetPlaylistRedux(ls as any));
    }
  }, [data]);

  return (
    <div className="min-h-[300px]">
      <Link
        to={"/likedsongs"}
        className="my-3 space-x-3 flex items-center sm:hidden"
      >
        <div className=" basis-14">
          <img
            loading="lazy"
            src="/public/liked-songs-640.png"
            className="absolute size-14 top-0 left-0 z-0"
            alt=""
            srcSet=""
          />
        </div>
        <div className=" sm:hidden flex-1  flex-col text-[14px]">
          <div className="text-left">Danh sách yêu thích</div>
          <div className="text-left">Danh sách phát</div>
        </div>
      </Link>
      {playLists.map((playlist) => {
        return (
          <PlaylistLikeItem {...playlist} key={playlist.id} idU={iduser} />
        );
      })}

      <Link
        to={"/mobile/ArtistsListPage"}
        className="grid grid-cols-7 gap-16 my-4 sm:hidden"
      >
        <div className="col-span-1 ">
          <PlusIcon className="bg-[#1A1A1A] rounded-full size-[60px]"></PlusIcon>
        </div>
        <div className="col-span-6 flex items-center">Thêm nghệ sĩ</div>
      </Link>
    </div>
  );
}
interface iPlaylistLikeItem extends iPlayList {
  idU: string;
  User_id: string;
}
function PlaylistLikeItem({
  ImagePath,
  PlayListName,
  Type,
  User_id,
  id,
  idU,
}: iPlaylistLikeItem) {
  const [pop, setPop] = useState(false);
  const mobiletype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const [de, setDe] = useState(false);
  const [sh, SetSh] = useState(false);
  const [xy, XY] = useState({ x: 0, y: 0 });
  const [top, SetTop] = useState(0);

  const { mutate: deletePlaylist } = useMutation({
    mutationFn: async () => {
      const data = await post2("/playlist/delete", { idplaylist: id });
      return data;
    },
    onSuccess: (result) => {
      if (result && !result.err) {
        alert("xóa thành công");
        setDe(true);
        queryClient.setQueryData([SINGLE_PLAYLIST_QUERY, id], (data: any) => {
          return { ...data, like: false };
        });
      }
    },
  });
  const { mutate: cancelFollow } = useMutation({
    mutationFn: async () => {
      const data = await post2("/likePlaylist/delete", { idPlaylist: id });
      return data;
    },
    onSuccess: (result) => {
      if (result && !result.err) {
        alert("hủy thành công");
        setDe(true);
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
        if (Type == "artist") {
          queryClient.setQueryData([SINGLE_ARTISTS_QUERY, id], (data: any) => {
            return { ...data, like: false };
          });
        } else {
          queryClient.setQueryData([SINGLE_PLAYLIST_QUERY, id], (data: any) => {
            return { ...data, like: false };
          });
        }
      }
    },
  });
  return (
    !de && (
      <div
        onContextMenu={(ev) => {
          if (sh) {
            SetSh(false);
            return;
          }
          XY({ x: ev.pageX, y: ev.pageY });
          SetSh(true);
          setPop(false);
        }}
        key={id}
        onMouseMove={(ev) => {
          if (sh) {
            setPop(false);
            return;
          }

          setPop(true);
          let top = ev.currentTarget.getBoundingClientRect().top;
          SetTop(Math.floor(top));
        }}
        onMouseLeave={(ev) => {
          setPop(false);
        }}
        className={`play${id}` + " w-full  "}
      >
        <Link
          to={`/${Type == "artist" ? Type : "playlist"}/${id}`}
          className="py-3 sm:py-2 space-x-3 sm:space-x-0  h-min-[60px] flex sm:justify-center items-center"
        >
          {ImagePath != "" ? (
            <div className="basis-14 sm:basis-12">
              <Avatar
                src={ImagePath}
                className={`${
                  Type == "artist" ? " rounded-full" : " rounded-lg"
                }`.concat(" size-14 sm:size-12 ")}
              />
            </div>
          ) : (
            <MusicNoteBeamedIcon className="size-10" />
          )}
          <div className=" sm:hidden flex-1 flex-col text-[14px]">
            <div className="text-left">{PlayListName}</div>
            <div className="text-left">
              {Type == "artist" ? "Nghệ sĩ" : "Danh sách phát"}
            </div>
          </div>
        </Link>

        <>
          {pop && mobiletype == "pc" ? (
            <Pop top={top} left={80} key={id}>
              <div className="absolute  bg-[#434242] p-2 rounded-lg min-w-max">
                <div className="text-base text-white ">{PlayListName}</div>
                <div className="text-sm text-gray-400">
                  {Type == "artist" ? "Nghệ sĩ" : "Danh sách phát"}
                  {idU == User_id ? "_Danh sách của bạn" : ""}
                </div>
              </div>
            </Pop>
          ) : (
            <></>
          )}
          {sh && (
            <Modal
              show={() => {
                SetSh(false);
              }}
              top={mobiletype == "mobile" ? 0 : xy.y}
              left={mobiletype == "mobile" ? 0 : xy.x}
              key={id}
            >
              <div
                onClick={() => {
                  if (mobiletype == "pc") {
                    return;
                  }
                  SetSh(false);
                }}
                className="flex items-end sm:block h-screen sm:h-auto"
              >
                <div className=" bg-[#434242] p-1  sm:text-[14px] w-screen sm:w-auto min-h-[300px]  sm:min-h-0 rounded-md">
                  <div className="grid grid-cols-7 space-x-3 sm:hidden  border-b-[#1A1A1A] border-b-2 py-2">
                    {ImagePath != "" ? (
                      <div className="col-span-1">
                        <Avatar
                          src={ImagePath}
                          className={`${
                            Type == "artist" ? " rounded-full" : " rounded-lg"
                          }`.concat(" size-14 sm:size-12 ")}
                        ></Avatar>
                      </div>
                    ) : (
                      <MusicNoteBeamedIcon className="size-10" />
                    )}
                    <div className=" sm:hidden col-span-6  flex-col text-[14px] ">
                      <div className="text-left">{PlayListName}</div>
                      <div className="text-left">
                        {Type == "artist" ? "Nghệ sĩ" : "Danh sách phát"}
                      </div>
                    </div>
                  </div>
                  {idU != User_id ? (
                    <>
                      <button
                        onClick={() => {
                          cancelFollow();
                        }}
                        className="flex p-3 justify-start sm:justify-center items-center w-full sm:w-auto sm:items-start gap-2"
                      >
                        <XIcon className="size-6" />
                        <div className="w-max ">Bỏ theo dõi</div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          deletePlaylist();
                        }}
                        className="flex p-3 justify-center w-full sm:w-auto items-start gap-2"
                      >
                        <TrashIcon className="size-6" />
                        <div className="w-max ">Xóa danh sách phát</div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Modal>
          )}
        </>
      </div>
    )
  );
}
