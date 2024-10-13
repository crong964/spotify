import React, { useEffect, useState } from "react";
import { PlayList } from "@/page/component/Playlist";
import { post } from "@/page/config/req";
import { Link } from "react-router-dom";
import { NaviPage, SetTitle } from "@/page/Route/home/RootRedux";
import { useDispatch } from "react-redux";

export default function PlaylistLike() {
  const [playList, SetPlayLists] = useState<PlayList[]>([]);

  useEffect(() => {
    post("/likePlaylist/getall", {}, (v: any) => {
      if (v && v.ls) {
        SetPlayLists(v.ls);
      }
    });
  }, []);

  const dispatch = useDispatch();
  return (
    <>
      {playList.map((d) => {
        return (
          <div
            key={d.id}
            onMouseMove={(ev) => {
              dispatch(
                SetTitle({
                  Name: d.PlayListName,
                  show: true,
                  type: d.Type,
                  y: ev.currentTarget.getBoundingClientRect().top,
                })
              );
            }}
            onMouseLeave={(ev) => {
              dispatch(
                SetTitle({
                  Name: "",
                  show: false,
                  type:"",
                  y: ev.currentTarget.getBoundingClientRect().top,
                })
              );
            }}
            className={
              `play${d.id}` +
              " w-full relative h-full grid place-items-center grid-cols-1 sm:h-[60px] sm:flex sm:justify-center sm:items-center"
            }
          >
            <Link to={`/${d.Type}/${d.id}`}>
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
            </Link>
          </div>
        );
      })}
    </>
  );
}
