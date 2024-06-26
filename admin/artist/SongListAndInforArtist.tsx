import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { post } from "../../page/config/req";
import SongList from "../componnt/SongList";
import SongForm from "../Song/SongForm";
type Artist = {
  ChanalName: string;
  pathImage: string;
  id: string;
};
type Song = {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  stt: number;
  Vertify: number;
};
export default function SongListAndInforArtist() {
  let { idArtist } = useParams();
  const [infor, SetInfor] = useState<Artist>({
    ChanalName: "",
    id: "",
    pathImage: "",
  });
  const [songlist, SetSongList] = useState<Song[]>([]);
  const [feature, SetFeature] = useState<"list" | "add" | "edit">("list");
  useEffect(() => {
    post("/admin/song/", { idArtist: idArtist }, (v: any) => {
      if (v && v.err != undefined && !v.err) {
        SetInfor(v.u);
        SetSongList(v.ls);
      }
    });
  }, [idArtist]);
  return (
    <>
      <div className="flex space-x-5 my-4">
        <button
          className="rounded-xl px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white"
          onClick={() => {
            SetFeature("list");
          }}
        >
          Danh sách nhạc
        </button>
        <button
          className="rounded-xl px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white"
          onClick={() => {
            SetFeature("add");
          }}
        >
          Thêm nhạc
        </button>
      </div>
      <div className="flex items-center space-x-4 px-7">
        <img src={infor.pathImage} className="size-[240px]" alt="" srcSet="" />
        <div className="text-[100px] font-bold">{infor.ChanalName}</div>
      </div>

      {feature == "add" ? <SongForm></SongForm> : <></>}
      {feature == "list" ? <SongList data={songlist} /> : <></>}
    </>
  );
}
