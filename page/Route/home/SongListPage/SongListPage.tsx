import { Avatar } from "@/page/component/avatar";
import { SongInPlayList } from "@/page/component/Song/interface";
import ImagePath from "@/page/config/img";
import { get, post } from "@/page/config/req";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "@/page/Route/home/RootRedux";
import { SetAutoPlay, SetSongs } from "@/page/component/Audio/AudioRedux";
import { useQuery } from "@tanstack/react-query";
import { CACHE_5_DAY, SONGS_LIST_QUERY } from "@/page/contant/quey_key";
const ArtistLink = React.lazy(() => import("@/page/component/ArtistLink"));

export default function SongListPage() {
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
  const stop = useSelector((state: RootHome) => state.audioroot.stop);
  const [songs, setSongs] = useState<SongInPlayList[]>([]);
  const [last_id, setLastId] = useState("");
  const [hiddenLoadButton, setHiddenLoadingButton] = useState(false);
  const dispatch = useDispatch();

  const onGetSongPlay = (id: string) => {
    post(
      "/song/get",
      {
        idsong: id,
      },
      (v: any) => {
        if (v && !v.err) {
          let temp = [...lsSong].map((item) => {
            return { ...item };
          });
          temp = temp.filter((song) => {
            return song.Id != id;
          });

          dispatch(SetSongs([{ ...v.song }, ...temp]));
          localStorage.setItem("song", JSON.stringify(v.song));
          dispatch(SetAutoPlay(true));
        }
      }
    );
  };
  const fetchSongs = (last_id: string) => {
    return new Promise<SongInPlayList[]>((result, rej) => {
      get("/song/pagination?lastId=" + last_id, (res_result: any) => {
        if (res_result && res_result.song) {
          if (res_result.song.length < 30) {
            setHiddenLoadingButton(false);
          }
          result(res_result.song);
          return;
        }
        res_result([]);
      });
    });
  };

  const { data, isPending } = useQuery<SongInPlayList[]>({
    queryKey: [SONGS_LIST_QUERY, last_id],
    queryFn: async () => {
      let da = await fetchSongs(last_id);
      return da;
    },
    staleTime: CACHE_5_DAY + CACHE_5_DAY,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data[data.length - 1]?.Id == songs[songs.length - 1]?.Id) {
      return;
    }
    setSongs([...songs, ...data]);

    return () => {};
  }, [data, songs]);

  return (
    <section>
      <div className="text-[24px] font-bold text-white">Tất cả bài hát</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-4 sm:px-3">
        {songs.map((song) => {
          return (
            <div
              key={song.Id}
              className="flex items-center space-x-1 sm:space-x-2 cursor-pointer bg-[#1A1A1A] rounded-xl "
            >
              <Avatar
                className="size-[60px] rounded-xl"
                src={ImagePath(song.SongImage)}
              />
              <div className="text-white flex-1 text-sm   line-clamp-2">
                <p className="font-bold line-clamp-1">{song.SongName}</p>
                <ArtistLink idArtist={song.user_id} nameArtist={song.Singer} />
              </div>
              <div
                className="pr-4"
                onClick={() => {
                  onGetSongPlay(song.Id);
                }}
              >
                {lsSong[mark] && lsSong[mark].Id == song.Id && !stop ? (
                  <img
                    className="size-full"
                    src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
                  ></img>
                ) : (
                  <div className="">Play</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-10">
        {!hiddenLoadButton && (
          <button onClick={() => setLastId(songs[songs.length - 1]?.Id)}>
            Tải thêm {isPending ? "..." : ""}
          </button>
        )}
      </div>
    </section>
  );
}
