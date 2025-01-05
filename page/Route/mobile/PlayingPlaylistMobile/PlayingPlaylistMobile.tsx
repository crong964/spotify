import React, { useEffect, useState } from "react";
import { RootHome } from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import Time from "@/page/component/Time";
import {
  NextSong,
  RandomSong,
  SetPlaylistmobile,
  SetSongs,
  SetStop,
} from "@/page/component/Audio/AudioRedux";

import {
  ChevronDownIcon,
  PauseSoundIcon,
  PlaySoundIcon,
  SkipNextIcon,
  SkipPreviousIcon,
} from "@/icon/Icon";
import { post } from "@/page/config/req";
import "@/public/css/index.css";
import { ButtonRandomPlay, ModPlay } from "@/page/component/Audio/Index";
import { SongQueueInplayList } from "@/page/Route/home/Right/Queue";
export default function PlayingPlaylistMobile() {
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
  const playlistmobile = useSelector(
    (state: RootHome) => state.audioroot.playlistmobile
  );
  const [duration, SetDuration] = useState(0);
  const [curTime, SetCurTime] = useState(0);
  const [timeUpdate, SetTimeUpdate] = useState(true);
  const [show, SetShow] = useState(true);
  const dispatch = useDispatch();
  const stop = useSelector((state: RootHome) => state.audioroot.stop);

  const RandomNext = (n: number) => {
    if (mark + n >= 0 && mark + n < lsSong.length) {
      dispatch(NextSong(n));
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
    let f = setInterval(() => {
      let g = document.querySelector(".g") as HTMLVideoElement;
      if (g) {
        SetDuration(g.duration);
        SetCurTime(g.currentTime);
      }
    }, 1000);
    return () => {
      clearInterval(f);
    };
  }, [mark]);
  return (
    <div
      className={
        "absolute  p-2 bg-black  z-[99999] w-full h-full overflow-y-scroll " +
        `${show ? "top-0 left-0 appearBottomToTop" : " disppearTopToBottom"}`
      }
    >
      <div className="px-3 py-1 my-3">
        <button
          onClick={() => {
            SetShow(false);
            setTimeout(() => {
              dispatch(SetPlaylistmobile(false));
            }, 2100);
          }}
        >
          <ChevronDownIcon className="size-8 fill-white" />
        </button>
      </div>
      <div className="w-full flex justify-center">
        <img
          src={lsSong[mark]?.SongImage}
          className="size-[300px]  loader "
          alt=""
          srcSet=""
        />
      </div>
      <div className="text-center py-4">
        <div className="text-2xl w-full">{lsSong[mark]?.SongName}</div>
        <div className="text-lg  w-full">{lsSong[mark]?.Singer}</div>
      </div>
      <div className="flex p-2">
        <Time d={curTime} key={0} />
        <input
          type="range"
          className="rounded-lg flex-1 sm:flex-none mx-3  cursor-pointer overflow-hidden appearance-none bg-gray-400 h-[6px] sm:w-[70%]"
          max={duration + ""}
          value={curTime}
          onChange={(ev) => {
            SetCurTime(parseInt(ev.currentTarget.value + ""));
          }}
          onTouchEnd={(ev) => {
            let g = document.querySelector(".g") as HTMLVideoElement;
            if (g) {
              g.currentTime = parseInt(ev.currentTarget.value + "");
            }
          }}
        />
        <Time d={duration} key={1} />
      </div>
      <div
        title="ngẫu nhiên"
        className="flex space-x-9 justify-center items-center"
      >
        <button
          onClick={() => {
            dispatch(RandomSong());
          }}
        >
          <ButtonRandomPlay />
        </button>

        <button
          onClick={() => {
            RandomNext(-1);
          }}
        >
          <SkipPreviousIcon className="hover:fill-green-500 fill-white size-8" />
        </button>

        <button
          className=""
          onClick={() => {
            let mu = document.querySelector(".g") as HTMLAudioElement;
            if (mu.paused) {
              mu.play();
              dispatch(SetStop(false));
            } else {
              mu.pause();
              dispatch(SetStop(true));
            }
          }}
        >
          {stop ? (
            <PlaySoundIcon className="fill-white size-16" />
          ) : (
            <PauseSoundIcon className="fill-white size-16" />
          )}
        </button>

        <button
          onClick={() => {
            RandomNext(1);
          }}
        >
          <SkipNextIcon className="hover:fill-green-500 fill-white size-8" />
        </button>
        <ModPlay/>
      </div>
      <div className="p-3"></div>
      <SongQueueInplayList cur="" type="" />
    </div>
  );
}
