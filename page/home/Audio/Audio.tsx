import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { post } from "@/page/config/req";
import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "@/page/home/RootRedux";
import {
  NextSong,
  RandomSong,
  RepeatPlaylist,
  SetAutoPlay,
  SetModPlay,
  SetSongs,
  SetStop,
} from "./AudioRedux";
import Time from "../../component/Time";
import {
  NoRepeat,
  PauseSoundIcon,
  PlaySoundIcon,
  RandomPlayIcon,
  RepeatPlaylistIcon,
  RepeatSongIcon,
  SkipNextIcon,
  SkipPreviousIcon,
} from "@/icon/Icon";

interface Audio {
  path: string;
  id: string;
  RandomNext(n: number): void;
}
export default function Audio(params: Audio) {
  const stop = useSelector((state: RootHome) => state.audioroot.stop);
  const modplay = useSelector((state: RootHome) => state.audioroot.modplay);
  const autoplay = useSelector((state: RootHome) => state.audioroot.autoplay);
  const dispatch = useDispatch();
  const [duration, SetDuration] = useState(0);
  const [curTime, SetCurTime] = useState(0);
  const [timeUpdate, SetTimeUpdate] = useState(true);
  useEffect(() => {
    async function set() {
      let mu = document.querySelector(".g") as HTMLAudioElement;

      if (mu) {
        SetDuration(mu.duration);
      }
    }
    set();
  });

  return (
    <div className="col-span-full sm:col-span-2 flex flex-col space-y-0 sm:space-y-2">
      <div
        title="ngẫu nhiên"
        className="hidden sm:flex space-x-9 justify-center items-center"
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
            params.RandomNext(-1);
          }}
        >
          <SkipPreviousIcon className="hover:fill-green-500 fill-white size-4" />
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
            <PlaySoundIcon className="fill-white size-8" />
          ) : (
            <PauseSoundIcon className="fill-white size-8" />
          )}
        </button>

        <button
          onClick={() => {
            params.RandomNext(1);
          }}
        >
          <SkipNextIcon className="hover:fill-green-500 fill-white size-4" />
        </button>
        <ModPlay></ModPlay>
      </div>

      <div className="flex justify-center items-center space-x-2 ">
        <Time d={curTime} key={0} />
        <input
          type="range"
          className="rounded-lg  cursor-pointer overflow-hidden appearance-none bg-gray-400 h-[6px] w-full sm:w-[70%]"
          max={duration + ""}
          value={curTime}
          onChange={(e) => {
            SetCurTime(parseInt(e.currentTarget.value));
            SetTimeUpdate(false);
          }}
          onMouseUp={() => {
            let mu = document.querySelector(".g") as HTMLAudioElement;
            mu.currentTime = curTime;
            SetTimeUpdate(true);
          }}
        />
        <Time d={duration} key={1} />
        <audio
          
          src={`/idSong?idSong=${params.path}`}
          onCanPlay={async (e) => {
            if (!autoplay) {
              return;
            }
            let cu = e.currentTarget;
            await cu.play();
            dispatch(SetStop(cu.paused));
          }}
          className="g"
          onTimeUpdate={(e) => {
            let time =
              e.currentTarget.duration - e.currentTarget.currentTime < 0.001;
            if (time && modplay == 0) {
              params.RandomNext(1);
            }
            if (time && modplay == 1) {
              dispatch(RepeatPlaylist());
            }
            if (time && modplay == 2) {
              let mu = document.querySelector(".g") as HTMLAudioElement;
              mu.currentTime = 0;
            }

            if (timeUpdate) {
              SetCurTime(e.currentTarget.currentTime);
            }
          }}
        >
          {params.path != "" ? (
            <source src={`/idSong?idSong=${params.path}`} type="audio/mp3" />
          ) : (
            <></>
          )}
        </audio>
      </div>
    </div>
  );
}

function ModPlay() {
  const modplay = useSelector((state: RootHome) => state.audioroot.modplay);
  let chilred = <></>;
  switch (modplay) {
    case 2:
      chilred = (
        <ButtonModPlay title="lặp lại 1 bài hát mãi mãi">
          <RepeatSongIcon className="fill-green-500 size-4" />
        </ButtonModPlay>
      );
      break;
    case 1:
      chilred = (
        <ButtonModPlay title="lặp lại danh sách phát">
          <RepeatPlaylistIcon className="fill-green-500 size-4" />
        </ButtonModPlay>
      );
      break;
    default:
      chilred = (
        <ButtonModPlay title="không lặp">
          <NoRepeat className="fill-white size-4"></NoRepeat>
        </ButtonModPlay>
      );
      break;
  }
  return chilred;
}

interface iButtonModPlay {
  children: React.JSX.Element;
  title: string;
}

function ButtonModPlay(params: iButtonModPlay) {
  const dispatch = useDispatch();
  return (
    <button
      title={params.title}
      onClick={() => {
        dispatch(SetModPlay());
      }}
    >
      {params.children}
    </button>
  );
}

function ButtonRandomPlay() {
  const random = useSelector((state: RootHome) => state.audioroot.random);
  if (!random) {
    return <RandomPlayIcon className="size-4 fill-white"></RandomPlayIcon>;
  }
  return <RandomPlayIcon className="size-4 fill-[#1CCA5A]"></RandomPlayIcon>;
}
