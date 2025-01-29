import React, { useEffect, useState } from "react";
import { Tabs } from "@/page/component/tabs/Index";
import { post } from "@/page/config/req";
import { iSong } from "./interface";
import { Song } from "./Song";

export default function SongAndGenrePage() {
  const [songs, SetSongs] = useState<iSong[]>([]);
  const [tabs, setTabs] = useState("");
  useEffect(() => {
    if (tabs=="") {
      return
    }
    post("/song/GetSongByTabs", { tabs: tabs }, (v: any) => {
      SetSongs(v.ls);
    });
  }, [tabs]);
  var stt = 0;
  return (
    <div className="w-full h-full">
      <Tabs
        onchange={(v) => {
          setTabs(v);
        }}
        value=""
      />
      <div className="w-full ">
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
    </div>
  );
}
