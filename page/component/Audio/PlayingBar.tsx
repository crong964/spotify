import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  NaviRight,
  PlaySong,
  RootHome,
  SetPlaying,
} from "@/page/Route/home/RootRedux";

import { post } from "@/page/config/req";
import {
  NextSong,
  SetAutoPlay,
  SetPip,
  SetPlaylistmobile,
  SetSongs,
  SetStop,
} from "./AudioRedux";
import { ParseJson, VolumeAudio } from "@/page/socket/Socket";
import {
  DiscussIcon,
  PauseSoundIcon,
  PiPIcon,
  PlaySoundIcon,
  QueueIcon,
} from "@/icon/Icon";
import { Audio2, Volume } from ".";
import { Pip } from "@/page/component/Pip/Index";
import { Song } from "@/page/component/Song/Index";
import { useNavigate } from "react-router-dom";

interface SongI {
  Id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  SongImage: string;
  filePath: string;
}
export default function PlayingBar() {
  const stopMobie = useSelector((state: RootHome) => state.audioroot.stop);
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
  const pip = useSelector((state: RootHome) => state.audioroot.pip);
  const right = useSelector((state: RootHome) => state.rootHome.Right);
  const navigate = useNavigate();
  const devicetype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const [volume, SetVolume] = useState(
    parseInt(localStorage.getItem("volume") || "100")
  );

  localStorage.setItem("volume", volume + "");
  const dispatch = useDispatch();
  var temp: SongI | undefined = undefined;
  if (localStorage.getItem("song") != null) {
    temp = ParseJson(localStorage.getItem("song") || "{}");
  }

  const RandomNext = (n: number) => {
    if (mark + n >= 0 && mark + n < lsSong.length) {
      dispatch(NextSong(n));
      dispatch(PlaySong(lsSong[mark].Id));
      return;
    }

    post("/song/NextSong", { idSong: lsSong[mark].Id }, (v: any) => {
      if (!v || v.err) {
        return;
      }
      localStorage.setItem("song", JSON.stringify(v.song));
      dispatch(SetSongs([v.song]));
    });
  };

  useEffect(() => {
    VolumeAudio(volume);
  }, [volume]);
  return lsSong[mark]?.filePath ? (
    <div className="w-full bg-black py-0 sm:py-1 h-[10%] sm:h-[12%] grid items-center grid-cols-1 sm:grid-cols-4 mt-0 ">
      <div
        onClick={() => {
          navigate("mobile/playlist");
        }}
        className="flex sm:inline-block justify-between items-center px-2 sm:px-0"
      >
        <Song
          onClick={() => {}}
          Id={lsSong[mark]?.Id || "0"}
          image={lsSong[mark]?.SongImage}
          name={lsSong[mark]?.SongName || ","}
          singer={lsSong[mark]?.Singer || ","}
          user_id={lsSong[mark]?.user_id || " "}
        />

        <button
          className=" p-2 inline-block sm:hidden"
          onClick={(e) => {
            e.stopPropagation();
            var mu = document.querySelector(".g") as HTMLAudioElement;
            if (mu.paused) {
              mu.play();
              dispatch(SetStop(false));
            } else {
              mu.pause();
              dispatch(SetStop(true));
            }
          }}
        >
          {stopMobie ? (
            <PauseSoundIcon className="fill-white  rounded-full size-9" />
          ) : (
            <PlaySoundIcon className="fill-white rounded-full size-9" />
          )}
        </button>
      </div>

      <Audio2
        RandomNext={RandomNext}
        path={lsSong[mark]?.filePath}
        id={lsSong[mark]?.Id}
      />
      <div className="hidden sm:flex space-x-2 justify-center items-center">
        {isLogin ? (
          <>
            <button
              onClick={() => {
                dispatch(NaviRight("Discuss"));
              }}
            >
              {right == "Discuss" ? (
                <DiscussIcon className="size-4 fill-[#1FDF64]" />
              ) : (
                <DiscussIcon className="fill-white size-4 hover:fill-[#1FDF64]" />
              )}
            </button>
            <button
              onClick={() => {
                dispatch(NaviRight("Queue"));
              }}
            >
              {right == "Queue" ? (
                <QueueIcon className="size-4 fill-[#1FDF64]" />
              ) : (
                <QueueIcon className="fill-white size-4 hover:fill-[#1FDF64]" />
              )}
            </button>
          </>
        ) : (
          <></>
        )}
        <div
          className="flex items-center cursor-pointer space-x-2 border-2 border-black hover:border-gray-400 p-2 rounded-xl"
          onWheel={(e) => {
            var cur = e.deltaY;
            var o = 4;
            if (cur < 0) {
              if (volume >= 100) {
                return;
              }
              SetVolume(volume + o);
            } else {
              if (volume > 0) {
                SetVolume(volume - o);
              }
            }
          }}
        >
          <button>
            <Volume value={volume} />
          </button>
          <input
            onChange={(e) => {
              SetVolume(parseInt(e.currentTarget.value));
            }}
            type="range"
            value={volume}
            max={100}
            step={1}
            className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-[4px]"
          />
        </div>
        <button
          onClick={() => {
            dispatch(SetPip(true));
          }}
          className="focus:outline-none"
          title="Mở trình duyệt thu nhỏ"
        >
          <PiPIcon className="fill-white size-5 hover:fill-green-600" />
          {pip ? (
            <Suspense fallback={<></>}>
              <Pip imagePath={lsSong[mark]?.SongImage} />
            </Suspense>
          ) : (
            <></>
          )}
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
}
