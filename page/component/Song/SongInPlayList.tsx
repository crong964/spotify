import { useState } from "react";
import { SongInPlayList } from "./interface";
import { RootHome } from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { CheckCircleIcon, PlusCircleIcon, TrashIcon } from "@/icon/Icon";
import Time from "@/page/component/Time";
const ArtistLink = React.lazy(() => import("@/page/component/ArtistLink"));
import { SetAutoPlay, SetIdSelectedSong, SetSongs } from "@/page/component/Audio/AudioRedux";
import { post } from "@/page/config/req";
import { Modal, Pop } from "@/page/component/pop";
import { useParams } from "react-router-dom";
import { Avatar } from "../avatar";

export default function SongInPlayList(v: SongInPlayList) {
  const [liked, SetLike] = useState<string>(v.liked);
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const idUser = useSelector((state: RootHome) => state.rootauth.login.idUser);
  const playlists = useSelector((state: RootHome) => state.rootHome.playlists);
  const playlist = useSelector((state: RootHome) => state.rootHome.playlist);
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
  const stop = useSelector((state: RootHome) => state.audioroot.stop);
  const idSelectedSong = useSelector((state: RootHome) => state.audioroot.idSelectedSong);
  const typeDevice = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const dispatch = useDispatch();
  const [xy, XY] = useState({ x: 0, y: 0, s: false });
  const addplaylist = () => {
    post(
      "/contain/deletesong",
      { Song_id: v.Id, PlayList_id: playlist.id },
      (v: any) => {
        if (v.err) {
          alert("xóa thất bại");
        } else {
          alert("xóa thành công");
        }
      }
    );
  };
  const createplaylist = () => {
    post("/playlist/addplaylist", { idsong: v.Id }, (v: any) => {
      alert(v.err == false);
    });
  };
  const GetSongPlay = () => {
    post(
      "/song/get",
      {
        idsong: v.Id,
      },
      (v: any) => {
        if (v && !v.err) {
          dispatch(SetSongs([v.song]));
          localStorage.setItem("song", JSON.stringify(v.song));
        }
      }
    );
    dispatch(SetAutoPlay(true));
  }
  return (
    <div
      onContextMenu={(v) => {
        if (typeDevice == "mobile") {
          XY({ x: 0, y: 0, s: true });
          return;
        }
        XY({ x: v.pageX, y: v.pageY, s: true });
      }}
      className={`${idSelectedSong == v.Id ? "bgsongclick" : "bgsong"} grid grid-cols-7 text-[13px] sm:text-[14px] sm:p-2 py-2 cursor-pointer sm:space-x-2  text-white font-bold rounded-lg items-center`}
    >
      <div
        className="col-span-5 grid grid-cols-5"
        onClick={() => {
          if (idSelectedSong == v.Id) {
            GetSongPlay()
            return
          }
          if (typeDevice == "pc") {
            dispatch(SetIdSelectedSong(v.Id))
            return;
          }
          GetSongPlay()
        }}
      >
        <div className="col-span-5 sm:col-span-3 flex items-center space-x-2">
          <div className="mx-2 size-3 sm:inline-block hidden ">
            {lsSong[mark].Id == v.Id && !stop ?
              <img className="size-full" src='https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg'></img>
              : <div className="">{v.stt}</div>}
          </div>
          <Avatar className="size-12 sm:size-9" src={v.SongImage}></Avatar>
          <div className="flex-col">
            <div className="block">{v.SongName}</div>
            {v.type != "artist" ? (
              <ArtistLink
                key={v.Id}
                idArtist={v.user_id}
                nameArtist={v.Singer}
              />
            ) : (
              <>
                <div className="block sm:hidden text-stone-500">{v.Viewer}</div>
              </>
            )}
          </div>
        </div>

        <div className="sm:block hidden col-span-2 p-2 text-[14px] text-stone-500">
          {v.Viewer}
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 flex items-center space-x-4">
        {isLogin ? (
          <>
            <div
              className=""
              onClick={() => {
                post(
                  "/lsong/add",
                  {
                    Id: v.Id,
                  },
                  (v: any) => {
                    if (v.err) {
                      alert("có lỗi");
                    } else {
                      SetLike(v.liked);
                    }
                  }
                );
              }}
            >
              {liked ? (
                <CheckCircleIcon className="fill-[#1DD25E] size-4 mx-2"></CheckCircleIcon>
              ) : (
                <PlusCircleIcon className="fill-white size-4 mx-2"></PlusCircleIcon>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        <Time d={parseInt(v.Duration + "")} />
      </div>
      {xy.s ? (
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
                  <Avatar className="size-12" src={v.SongImage} />
                  <div className="flex flex-col pl-3">
                    <div className="w-full text-[20px] font-bold">
                      {v.SongName}
                    </div>
                    <div className="w-full text-[15px] flex space-x-2">
                      <ArtistLink idArtist={v.user_id} nameArtist={v.Singer} />
                      <div className="px-0.5">•</div>
                      <div>{v.SongName}</div>
                    </div>
                  </div>
                </div>
                {idUser == playlist.User_id ? (
                  <button
                    onClick={() => {
                      addplaylist();
                    }}
                    className="flex p-3 justify-start items-center gap-2 hover:bg-black w-full"
                  >
                    <TrashIcon className="size-[12px] fill-white" />
                    <div>Xóa danh nhạc khỏi danh sách</div>
                  </button>
                ) : (
                  <></>
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
                        post(
                          "/contain/addsong",
                          { Song_id: v.Id, PlayList_id: vp.idplaylist },
                          (v: any) => {
                            if (v.err) {
                              alert("thêm thất bại");
                            } else {
                              alert("thêm thành công");
                            }
                          }
                        );
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
      ) : (
        <></>
      )}
    </div>
  );
}
