import { Avatar } from "@/page/component/avatar";
import { SongInPlayList } from "@/page/component/Song/interface";
import ImagePath from "@/page/config/img";
import { get2, post2 } from "@/page/config/req";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "@/page/Redux/RootRedux";
import { SetAutoPlay, SetSongs } from "@/page/Redux/AudioRedux";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CACHE_5_DAY,
  SONGS_LIST_QUERY,
  TABS_QUERY,
} from "@/page/contant/quey_key";
import { CheckCircleIcon, PlusCircleIcon } from "@/icon/Icon";
import ProtectRoute from "@/page/component/ProtectRoute/ProtectRoute";

import { queryClient } from "@/page/App";
import TabsSelect from "@/page/component/tabs/TabsSelect";
import { iTab } from "@/page/component/tabs/interface";
import { setScrollBottom } from "@/page/Redux/ScrollRedux";
const ArtistLink = React.lazy(() => import("@/page/component/ArtistLink"));

export default function SongListPage() {
  const [tab, setTabs] = useState("");
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
  const stop = useSelector((state: RootHome) => state.audioroot.stop);
  const devicetype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const [songs, setSongs] = useState<SongInPlayList[]>([]);
  const [last_id, setLastId] = useState("");

  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const maxScrollHeight = useSelector(
    (state: RootHome) => state.scrollRedux.maxHeight
  );
  const scrollTop = useSelector(
    (state: RootHome) => state.scrollRedux.scrollTop
  );
  const scrollBottom = useSelector(
    (state: RootHome) => state.scrollRedux.scrollBottom
  );
  const dispatch = useDispatch();

  const onGetSongPlay = async (id: string) => {
    const data = await post2("/song/get", {
      idsong: id,
    });
    if (data && !data.err) {
      let temp = [...lsSong].map((item) => {
        return { ...item };
      });
      temp = temp.filter((song) => {
        return song.Id != id;
      });

      dispatch(SetSongs([{ ...data.song }, ...temp]));
      localStorage.setItem("song", JSON.stringify(data.song));
      dispatch(SetAutoPlay(true));
    }
  };
  const { data, isPending } = useQuery<SongInPlayList[]>({
    queryKey: [SONGS_LIST_QUERY, last_id, tab],
    queryFn: async () => {
      const res_result = await get2(
        `/lsong/pagination?lastId=${last_id}&tabs=${tab}`
      );
      if (res_result && res_result.song) {
        return res_result.song;
      }
      return [];
    },
    staleTime: CACHE_5_DAY + CACHE_5_DAY,
  });
  const { data: tabs } = useQuery<iTab[]>({
    queryKey: [TABS_QUERY],
    queryFn: async () => {
      const data = await get2("/tabs/getall");
      if (data && data.ls) {
        return data.ls;
      }
      return [];
    },
    staleTime: CACHE_5_DAY,
  });

  const { mutate } = useMutation({
    mutationKey: [SONGS_LIST_QUERY],
    mutationFn: async (song: SongInPlayList) => {
      const data = await post2("/lsong/add", {
        Id: song.Id,
      });
      return data?.err;
    },
    onSuccess: (err, song) => {
      if (!err) {
        queryClient.invalidateQueries({
          queryKey: [SONGS_LIST_QUERY],
        });
        let temp = [...songs].map((songTemp) => {
          if (songTemp.Id == song.Id) {
            return { ...song, liked: songTemp.liked == "0" ? "1" : "0" };
          }
          return songTemp;
        });
        setSongs(temp);
      }
    },
  });
  const handleTabs = useCallback((tab: string) => {
    setLastId("");
    setTabs(tab);
    setSongs([]);
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data.length <= 0) {
      return;
    }
    if (data[data.length - 1]?.Id == songs[songs.length - 1]?.Id) {
      return;
    }
    setSongs([...songs, ...data]);
    return () => {};
  }, [data, songs]);

  useEffect(() => {
    if (songs.length <= 0) {
      return;
    }

    if (scrollBottom < 200) {
      setLastId(songs[songs.length - 1]?.Id);
      dispatch(setScrollBottom(300));
    }
  }, [scrollBottom, songs]);

  const itemH = useMemo(() => {
    if (devicetype == "pc") {
      return 80;
    }
    return 140;
  }, [devicetype]);

  const songshtml: ReactNode[] = [];

  const rm = useMemo(() => {
    if (scrollTop < 100) {
      return 0;
    }
    return Math.round((scrollTop - 100) / itemH) || 0;
  }, [itemH, scrollTop]);

  for (
    let i = rm * 4;
    i < songs.length && i < (rm + maxScrollHeight / itemH) * 4;

  ) {
    let songshtml2: ReactNode[] = [];
    for (let j = 0; j + i < songs.length && j < 4; j++) {
      let song = songs[i + j];

      let playing =
        (lsSong[mark] && lsSong[mark].Id == song.Id && !stop) || false;
      songshtml2.push(
        <div
          data-play={playing}
          key={song.Id}
          onClick={() => onGetSongPlay(song.Id)}
          className="data-[play=true]:bg-green-400 data-[play=false]:bg-[#1A1A1A] hover:scale-105 active:scale-95 duration-150 flex items-center space-x-1 sm:space-x-2 cursor-pointer rounded-xl "
        >
          <Avatar
            className="size-[60px] rounded-xl"
            src={ImagePath(song.SongImage)}
          />

          <div className=" flex-1 text-sm   line-clamp-2">
            <p className="font-bold line-clamp-1 text-white">{song.SongName}</p>
            <ArtistLink idArtist={song.user_id} nameArtist={song.Singer} />
          </div>
          <div className="pr-4">
            <div
              data-login={isLogin}
              className="data-[login=true]:block data-[login=false]:hidden"
              onClick={(e) => {
                e.stopPropagation();
                mutate(song);
              }}
            >
              {song.liked ? (
                <CheckCircleIcon className="fill-[#1DD25E] size-4 mx-2"></CheckCircleIcon>
              ) : (
                <PlusCircleIcon className="fill-white size-4 mx-2"></PlusCircleIcon>
              )}
            </div>
          </div>
        </div>
      );
    }
    i += 4;
    songshtml.push(
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-3 lg:gap-3 lg:px-3 pb-3">
        {songshtml2}
      </div>
    );
  }

  return (
    <ProtectRoute>
      <section>
        <div className="text-[24px] font-bold text-white">Tất cả bài hát</div>
        <div className="mb-5 overflow-x-scroll  w-screen">
          <TabsSelect tabs={tabs || []} onChange={handleTabs} value={tab} />
        </div>
        <div style={{ height: (songs.length / 4) * itemH }}></div>
        {songshtml.map((v, i) => {
          return (
            <div
              key={i + rm}
              style={{ top: (i + rm) * itemH + 100 }}
              className="absolute left-0 w-full"
            >
              {v}
            </div>
          );
        })}
      </section>
    </ProtectRoute>
  );
}
