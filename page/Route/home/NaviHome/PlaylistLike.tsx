import React, { useEffect, useState } from "react";
import { post2 } from "@/page/config/req";
import { Link } from "react-router-dom";
import { RootHome, SetPlaylistRedux } from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { Pop } from "@/page/component/pop";
import { MusicNoteBeamedIcon, PlusIcon, TrashIcon, XIcon } from "@/icon/Icon";
import { iPlayList } from "@/page/component/Playlist/interface";

import Modal from "@/page/component/pop/Modal";
import { Avatar } from "@/page/component/avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CACHE_INFILITY, LIKE_PLAYLIST_QUERY } from "@/page/contant/quey_key";
import { queryClient } from "@/page/App";

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
      <Link to={"/likedsongs"} className="my-3 space-x-3 flex items-center sm:hidden">
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
function PlaylistLikeItem(d: iPlaylistLikeItem) {
  const [pop, SetPop] = useState(false);
  const mobiletype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const [de, SetDe] = useState(false);
  const [sh, SetSh] = useState(false);
  const [xy, XY] = useState({ x: 0, y: 0 });
  const [top, SetTop] = useState(0);

  const { mutate: deletePlaylist } = useMutation({
    mutationFn: async () => {
      const data = await post2("/playlist/delete", { idplaylist: d.id });
      return data;
    },
    onSuccess: (result) => {
      if (result && !result.err) {
        alert("xóa thành công");
        SetDe(true);
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
      }
    },
  });
  const { mutate: cancelFollow } = useMutation({
    mutationFn: async () => {
      const data = await post2("/likePlaylist/delete", { idPlaylist: d.id });
      return data;
    },
    onSuccess: (result) => {
      if (result && !result.err) {
        alert("hủy thành công");
        SetDe(true);
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
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
          SetPop(false);
        }}
        key={d.id}
        onMouseMove={(ev) => {
          if (sh) {
            SetPop(false);
            return;
          }

          SetPop(true);
          let top = ev.currentTarget.getBoundingClientRect().top;
          SetTop(Math.floor(top));
        }}
        onMouseLeave={(ev) => {
          SetPop(false);
        }}
        className={`play${d.id}` + " w-full  "}
      >
        <Link
          className="py-3 sm:py-2 space-x-3 sm:space-x-0  h-min-[60px] flex sm:justify-center items-center"
          to={`/${d.Type == "artist" ? d.Type : "playlist"}/${d.id}`}
        >
          {d.ImagePath != "" ? (
            <div className="basis-14 sm:basis-12">
              <Avatar
                src={d.ImagePath}
                className={`${
                  d.Type == "artist" ? " rounded-full" : " rounded-lg"
                }`.concat(" size-14 sm:size-12 ")}
              />
            </div>
          ) : (
            <MusicNoteBeamedIcon className="size-10" />
          )}
          <div className=" sm:hidden flex-1 flex-col text-[14px]">
            <div className="text-left">{d.PlayListName}</div>
            <div className="text-left">
              {d.Type == "artist" ? "Nghệ sĩ" : "Danh sách phát"}
            </div>
          </div>
        </Link>

        <>
          {pop && mobiletype == "pc" ? (
            <Pop top={top} left={80} key={d.id}>
              <div className="absolute  bg-[#434242] p-2 rounded-lg min-w-max">
                <div className="text-base text-white ">{d.PlayListName}</div>
                <div className="text-sm text-gray-400">
                  {d.Type == "artist" ? "Nghệ sĩ" : "Danh sách phát"}
                  {d.idU == d.User_id ? "_Danh sách của bạn" : ""}
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
              key={d.id}
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
                    {d.ImagePath != "" ? (
                      <div className="col-span-1">
                        <Avatar
                          src={d.ImagePath}
                          className={`${
                            d.Type == "artist" ? " rounded-full" : " rounded-lg"
                          }`.concat(" size-14 sm:size-12 ")}
                        ></Avatar>
                      </div>
                    ) : (
                      <MusicNoteBeamedIcon className="size-10" />
                    )}
                    <div className=" sm:hidden col-span-6  flex-col text-[14px] ">
                      <div className="text-left">{d.PlayListName}</div>
                      <div className="text-left">
                        {d.Type == "artist" ? "Nghệ sĩ" : "Danh sách phát"}
                      </div>
                    </div>
                  </div>
                  {d.idU != d.User_id ? (
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
