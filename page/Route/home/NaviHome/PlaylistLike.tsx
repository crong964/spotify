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
import { MusicNoteBeamedIcon, TrashIcon, XIcon } from "@/icon/Icon";
import { iPlayList } from "@/page/component/Playlist/interface";

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
    <>
      {playList.map((d) => {
        return <PlaylistLikeC {...d} idU={iduser} />;
      })}
    </>
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
      className={
        `play${d.id}` +
        " w-full relative h-full grid place-items-center grid-cols-1 sm:h-[60px] sm:flex sm:justify-center sm:items-center"
      }
    >
      <Link to={`/${d.Type == "artist" ? d.Type : "playlist"}/${d.id}`}>
        {d.ImagePath != "" ? (
          <>
            <img
              onClick={() => {
                dispatch(
                  NaviPage({
                    page: d.Type as any,
                    param: d.id,
                  })
                );
              }}
              src={d.ImagePath}
              className={`${
                d.Type == "artist" ? "rounded-full" : " rounded-lg"
              }`.concat(" size-12")}
              alt=""
              srcSet=""
            />
          </>
        ) : (
          <MusicNoteBeamedIcon className="size-8" />
        )}
      </Link>
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
      {sh && mobiletype == "pc" ? (
        <Pop top={xy.y} left={xy.x} key={d.id}>
          <div
            onClick={() => {
              SetSh(false);
            }}
            onMouseLeave={() => {
              SetSh(false);
            }}
            className=" bg-[#434242] p-1 text-[14px]"
          >
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
                  className="flex p-3 justify-center items-start gap-2"
                >
                  <XIcon className="size-6" />
                  <div className="w-max ">Bỏ theo dõi</div>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    post("/playlist/delete", { idplaylist: d.id }, (v: any) => {
                      alert(v.err == false);
                      if (v.err == false) {
                        SetDe(true);
                      }
                    });
                  }}
                  className="flex p-3 justify-center items-start gap-2"
                >
                  <TrashIcon className="size-6" />
                  <div className="w-max ">Xóa danh sách phát</div>
                </button>
              </>
            )}
          </div>
        </Pop>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}
