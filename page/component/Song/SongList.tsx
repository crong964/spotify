import React, { useMemo } from "react";
import { SongList } from "./interface";
import SongInPlayList from "./SongInPlayList";
import ImagePath from "@/page/config/img";
import { useSelector } from "react-redux";
import { RootHome } from "@/page/Redux/RootRedux";

export default function SongList({ data, type, headerHeight = 0 }: SongList) {
  const scrollHeight = useSelector((root: RootHome) => root.scrollRedux.height);
  const itemHeight = useMemo(() => {
    return 59;
  }, []);
  const rm = useMemo(() => {
    if (scrollHeight < headerHeight) {
      return 0;
    }
    return Math.round((scrollHeight - headerHeight) / itemHeight) || 0;
  }, [scrollHeight, headerHeight]);
  var stt = rm;
  return (
    <>
      <div style={{ height: data.length * itemHeight }}></div>
      {data.length > 0 && (
        <>
          {data
            .filter((_, i) => {
              return i >= rm && i <= rm + 11;
            })
            .map((song, i) => {
              stt += 1;
              return (
                <div
                  style={{ top: itemHeight * (i + rm) + headerHeight }}
                  className="absolute w-full h-[59px] px-1 sm:px-4"
                >
                  <SongInPlayList
                    type={type}
                    Duration={song.Duration + ""}
                    Id={song.Id}
                    Singer={song.Singer}
                    SongName={song.SongName}
                    Viewer={song.Viewer}
                    filePath={ImagePath(song.filePath)}
                    SongImage={song.SongImage}
                    liked={song.liked}
                    stt={stt}
                    user_id={song.user_id}
                    key={song.Id}
                  />
                </div>
              );
            })}
        </>
      )}
    </>
  );
}
