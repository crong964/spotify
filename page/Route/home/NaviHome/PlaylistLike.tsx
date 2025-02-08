import React, { useEffect, useState } from "react";

import { post } from "@/page/config/req";
import { Link } from "react-router-dom";
import {
  NaviPage,
  RootHome,
  SetPlaylistRedux,
} from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { Pop } from "@/page/component/pop";
import { MusicNoteBeamedIcon, PlusIcon, TrashIcon, XIcon } from "@/icon/Icon";
import { iPlayList } from "@/page/component/Playlist/interface";

import Modal from "@/page/component/pop/Modal";
import { Avatar } from "@/page/component/avatar";

export default function PlaylistLike() {
  const [playList, SetPlayLists] = useState<iPlaylistLikeC[]>([]);
  const iduser = useSelector((state: RootHome) => state.rootauth.login.idUser);
  const dispatch = useDispatch();
  useEffect(() => {
    post("/likePlaylist/getall", {}, (v: any) => {
      if (v && v.ls) {
        SetPlayLists(v.ls);
        let ls = [];
        for (let i = 0; i < v.ls.length; i++) {
          const element: iPlaylistLikeC = v.ls[i];
          if (element.User_id == v.idU) {
            ls.push({
              idplaylist: element.id,
              PlayListName: element.PlayListName,
            });
          }
        }
        dispatch(SetPlaylistRedux(ls as any));
      }
    });
  }, []);

  return (
    <div className="min-h-[300px]">
      {playList.map((d) => {
        return <PlaylistLikeC {...d} idU={iduser} />;
      })}

      <Link to={"/mobile/ArtistsListPage"} className="grid grid-cols-7 gap-16 my-4 sm:hidden">
        <div className="col-span-1 ">
          <PlusIcon className="bg-[#1A1A1A] rounded-full size-[60px]"></PlusIcon>
        </div>
        <div className="col-span-6 flex items-center">Thêm nghệ sĩ</div>
      </Link>
    </div>
  );
}
interface iPlaylistLikeC extends iPlayList {
  idU: string;
  User_id: string;
}
function PlaylistLikeC(d: iPlaylistLikeC) {
  const dispatch = useDispatch();
  const [pop, SetPop] = useState(false);
  const mobiletype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );

  const [de, SetDe] = useState(false);
  const [sh, SetSh] = useState(false);
  const [xy, XY] = useState({ x: 0, y: 0 });
  const [top, SetTop] = useState(0);
  return !de ? (
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
      className={`play${d.id}` + " w-full my-3 sm:my-0 "}
    >
      <Link
        className="grid grid-cols-7 space-x-3 sm:space-x-0 sm:place-items-center  sm:h-[60px] sm:flex sm:justify-center sm:items-center"
        to={`/${d.Type == "artist" ? d.Type : "playlist"}/${d.id}`}
      >
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
        <div className=" sm:hidden col-span-6  flex-col text-[14px]">
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
        {sh ? (
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
                        post(
                          "/likePlaylist/delete",
                          { idPlaylist: d.id },
                          (v: any) => {
                            alert(v.err == false);
                            if (v.err == false) {
                              SetDe(true);
                            }
                          }
                        );
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
                        post(
                          "/playlist/delete",
                          { idplaylist: d.id },
                          (v: any) => {
                            alert(v.err == false);
                            if (v.err == false) {
                              SetDe(true);
                            }
                          }
                        );
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
        ) : (
          <></>
        )}
      </>
    </div>
  ) : (
    <></>
  );
}
