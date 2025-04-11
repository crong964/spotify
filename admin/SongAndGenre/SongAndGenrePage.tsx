import React, { useEffect, useState } from "react";
import { Tabs } from "@/page/component/tabs";
import { post } from "@/page/config/req";
import { iSong } from "./interface";
import { Song } from "./Song";

export default function SongAndGenrePage() {
  const [songs, SetSongs] = useState<iSong[]>([]);
  const [tabs, setTabs] = useState("");
  const [start, SetStart] = useState(0);
  const [nop, SetNop] = useState(0);
  const songStatusInPlaylist = ["Tất cả", "Ngoài danh sách"]
  const choice = (p: number) => {
    SetNop(p)
  }
  useEffect(() => {
    if (tabs == "") {
      return
    }
    
    post("/song/GetSongByTabs", { tabs: tabs, nop: nop }, (v: any) => {
      SetSongs(v.ls);
      if (v.ls.length == 0) {
        SetStart(0)
      } else {
        SetStart(start + v.ls.length)
      }
    });
  }, [tabs, nop]);
  var stt = 0;
  return (
    <div className="w-full h-full">
      <Tabs
        onchange={(v) => {
          setTabs(v);
        }}
        value=""
      />
      <div className="py-7">
        <div className="text-lg pb-3">Nhạc trong danh sách chính chức</div>
        <div className="flex space-x-5">
          {songStatusInPlaylist.map((v, i) => {
            return nop == i ?
              <button onClick={() => {
                choice(i)
              }} className="px-3 rounded-lg w-max py-2 bg-blue-500 text-white">
                {v}
              </button> : <button onClick={() => {
                choice(i)
              }} className="px-3 rounded-lg w-max py-2 bg-white text-black hover:bg-blue-500 hover:text-white">
                {v}
              </button>

          })}
        </div>
      </div>
      <div className="w-full flex flex-col space-y-4">
        <div className="h-[600px] overflow-y-auto">
          {songs.map((v) => {
            stt += 1;
            return (
              <Song
                Duration={v.Duration}
                Id={v.Id}
                Singer={v.Singer}
                SongName={v.SongName}
                Viewer={v.Viewer}
                filePath={v.filePath}
                SongImage={v.SongImage}
                stt={stt}
                user_id={v.user_id}
                key={v.Id}
              />
            );
          })}
        </div>
        <div className="flex justify-end">
          <button
            className="px-3 rounded-lg w-max py-2 bg-white text-black hover:bg-blue-500 hover:text-white"
            onClick={() => {
              if (tabs == "") {
                return
              }
              post("/song/GetSongByTabs", { tabs: tabs, nop: nop, start: start }, (v: any) => {

                if (v.ls.length == 0) {
                  SetStart(0)
                } else {
                  SetStart(start + v.ls.length)
                }
                SetSongs(v.ls);


              });
            }}>
            Làm Mới
          </button>
        </div>
      </div>
    </div>
  );
}
