import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux";
import { Song } from "../SongList";

export default function PlayListForm() {
  const SelectListl = useSelector((state: RootState) => state.navi.SelectList);
  var ls: React.JSX.Element[] = [];
  var stt = 0;
  for (const key in SelectListl) {
    const element = SelectListl[key];
    if (element == undefined) {
      continue;
    }
    
    stt += 1;
    ls.push(
      <Song
        Duration={element.Duration}
        Id={element.Id}
        Singer={element.Singer}
        SongName={element.SongName}
        Viewer={element.Viewer}
        filePath={element.filePath}
        imagePath={element.imagePath}
        stt={stt}
        user_id={element.user_id}
        key={element.Id}
      />
    );
  }
  return <div className="h-[400px]">{ls}</div>;
}
