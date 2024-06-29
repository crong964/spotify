import React, { useEffect, useRef, useState } from "react";
import Song from "../../component/Song";
import { useDispatch, useSelector } from "react-redux";
import { NaviRight, RootHome } from "../RootRedux";
import Audio from "./Audio";
import { post } from "../../config/req";
import { NextSong, SetSongs, SetStop } from "./AudioRedux";
import { ParseJson, VolumeAudio } from "../../socket/Socket";
import {
  BigVolumeIcon,
  DiscussIcon,
  MediumVolumeIcon,
  MuteVolumeIcon,
  PauseSoundIcon,
  PlaySoundIcon,
  QueueIcon,
  SmallVolumeIcon,
} from "../../../icon/Icon";

interface SongI {
  Id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  SongImage: string;
  filePath: string;
}
export default function PlayingBar() {
  const stop = useSelector((state: RootHome) => state.audioroot.stop);
  const idsong = useSelector((state: RootHome) => state.rootHome.idSong);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
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
      return;
    }

    post("song/NextSong", { idSong: lsSong[mark].Id }, (v: any) => {
      if (!v || v.err) {
        return;
      }
      localStorage.setItem("song", JSON.stringify(v.song));
      dispatch(SetSongs([v.song]));
    });
  };
  useEffect(() => {
    post(
      "song/get",
      {
        idsong: idsong,
      },
      (v: any) => {
        if (v && !v.err) {
          dispatch(SetSongs([v.song]));
          localStorage.setItem("song", JSON.stringify(v.song));
        }
      }
    );
  }, [idsong]);
  useEffect(() => {
    VolumeAudio(volume);
  }, [volume]);
  return (
    <div className="w-full bg-[#121212] h-[10%] sm:h-[12%] grid items-center grid-cols-1 sm:grid-cols-4 mt-0 ">
      <div className="flex sm:inline-block justify-between items-center px-2 sm:px-0">
        <Song
          onClick={() => {}}
          Id={lsSong[mark]?.Id || "0"}
          image={lsSong[mark]?.SongImage}
          name={lsSong[mark]?.SongName}
          singer={lsSong[mark]?.Singer}
        />
        <div>
          <button
            className=" p-2 inline-block sm:hidden"
            onClick={() => {
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
            {stop ? (
              <PlaySoundIcon className="fill-white size-8" />
            ) : (
              <PauseSoundIcon className="fill-white size-8" />
            )}
          </button>
        </div>
      </div>
      <Audio
        RandomNext={RandomNext}
        path={lsSong[mark]?.filePath}
        id={lsSong[mark]?.Id}
      />
      <div className="hidden sm:flex space-x-2  justify-center items-center">
        {isLogin ? (
          <>
            <button
              onClick={() => {
                dispatch(NaviRight("Discuss"));
              }}
            >
              <DiscussIcon className="fill-white size-4 hover:fill-[#1FDF64]" />
            </button>
            <button
              onClick={() => {
                dispatch(NaviRight("Queue"));
              }}
            >
              <QueueIcon className="fill-white size-4" />
            </button>
          </>
        ) : (
          <></>
        )}
        <div
          className="flex items-center cursor-pointer space-x-2 hover:border-2 hover:border-gray-400 p-2 rounded-xl"
          onWheel={(e) => {
            var cur = e.deltaY;
            var o = 2;
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
      </div>
    </div>
  );
}
interface Volume {
  value: number;
}
function Volume(p: Volume) {
  return (
    <>
      <MuteVolume value={p.value} />
      <SmallVolume value={p.value} />
      <MediumVolume value={p.value} />
      <BigVolume value={p.value} />
    </>
  );
}

function MuteVolume(p: Volume) {
  return (
    <>
      {p.value <= 0 ? <MuteVolumeIcon className="fill-white size-4" /> : <></>}
    </>
  );
}

function SmallVolume(p: Volume) {
  return (
    <>
      {1 <= p.value && p.value < 33 ? (
        <SmallVolumeIcon className="fill-white size-4" />
      ) : (
        <></>
      )}
    </>
  );
}
function MediumVolume(p: Volume) {
  return (
    <>
      {33 <= p.value && p.value < 66 ? (
        <MediumVolumeIcon className="fill-white size-4" />
      ) : (
        <></>
      )}
    </>
  );
}
function BigVolume(p: Volume) {
  return (
    <>
      {66 <= p.value ? <BigVolumeIcon className="fill-white size-4" /> : <></>}
    </>
  );
}
