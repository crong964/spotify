import { post } from "@/page/config/req";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { iSong } from "./SongInterface";
import React from "react";
import { EditSong } from "@/admin/Redux";
import Toggle from "@/admin/componnt/Toggle";
import Time from "@/page/component/Time";
import { TrashIcon } from "@/icon/Icon";

export default function Song(v: iSong) {
  let { idArtist } = useParams();
  let dispatch = useDispatch();
  //Vertify 0 1
  const [vertify, SetVertify] = useState(v.status + "");
  const Remove = () => {
    if (confirm("bạn muốn xóa không")) {
      post(
        "/admin/song/delete",
        { idArtist: idArtist, idsong: v.Id },
        (v: any) => {
          if (v.err) {
            alert("thất bại");
            return;
          }
          alert("thành công");
          location.reload();
        }
      );
    }
  };
  const idSongEdit = () => {
    dispatch(EditSong(v.Id));
  };

  return (
    <div className="grid grid-cols-7 text-[13px] sm:text-[14px] sm:space-x-2  text-black font-bold sm:p-4 rounded-lg items-center">
      <div className="col-span-1 flex items-center space-x-2">
        <div className="sm:inline-block hidden">{v.stt}</div>
        <img className="size-28" src={v.SongImage} alt="" srcSet="" />
      </div>
      <div className="col-span-3 sm:col-span-2 p-2 ">
        <div className="block">{v.SongName}</div>
      </div>
      <div className="sm:block hidden col-span-1 text-[14px] text-stone-500">
        {v.Viewer}
      </div>
      <div className="sm:block hidden col-span-1 text-[14px] text-stone-500">
        <Toggle
          han={() => {
            return new Promise((res, rej) => {
              let a = vertify == "1" ? "0" : "1";
              post(
                "/admin/song/updateStatus",
                { idSong: v.Id, status: a },
                (d: any) => {
                  if (d.err != undefined && d.err) {
                    rej("lỗi");
                    return;
                  }
                  SetVertify(a);
                  res(a);
                }
              );
            });
          }}
          idSong={v.Id}
          status={v.status + ""}
        />
      </div>
      <div className="sm:block hidden col-span-1 text-[14px] text-stone-500">
        <Time d={parseInt(v.Duration)}></Time>
      </div>
      <div className=" col-span-1 text-[14px] text-stone-500 flex">
        <div
          onClick={() => {
            Remove();
          }}
        >
          <TrashIcon className="size-6 hover:fill-green-600 cursor-pointer" />
        </div>

        <svg
          onClick={() => idSongEdit()}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 hover:fill-green-600 cursor-pointer"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg>
      </div>
    </div>
  );
}
