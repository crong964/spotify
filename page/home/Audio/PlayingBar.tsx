import React, { useEffect, useRef, useState } from "react";
import Song from "../../component/Song";
import { useDispatch, useSelector } from "react-redux";
import { NaviRight, RootHome } from "../RootRedux";
import Audio from "./Audio";
import { post } from "../../config/req";
import { NextSong, SetSongs, SetStop } from "./AudioRedux";
import { ParseJson, VolumeAudio } from "../../socket/Socket";

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
              <svg
                className="fill-white size-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
              </svg>
            ) : (
              <svg
                className="fill-white size-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm224-72V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24zm112 0V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="fill-white size-4 hover:fill-[#1FDF64]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                dispatch(NaviRight("Queue"));
              }}
            >
              <svg
                data-encore-id="icon Queue"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="fill-white size-4"
              >
                <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
              </svg>
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
      {p.value <= 0 ? (
        <svg
          data-encore-id="icon"
          role="presentation"
          aria-label="Đang tắt tiếng"
          aria-hidden="true"
          id="volume-icon"
          viewBox="0 0 16 16"
          className="fill-white size-4"
        >
          <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
          <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
        </svg>
      ) : (
        <></>
      )}
    </>
  );
}

function SmallVolume(p: Volume) {
  return (
    <>
      {1 <= p.value && p.value < 33 ? (
        <svg
          data-encore-id="icon"
          role="presentation"
          aria-label="Âm lượng thấp"
          aria-hidden="true"
          id="volume-icon"
          viewBox="0 0 16 16"
          className="fill-white size-4"
        >
          <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
        </svg>
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
        <svg
          data-encore-id="icon"
          role="presentation"
          aria-label="Âm lượng trung bình"
          aria-hidden="true"
          id="volume-icon"
          viewBox="0 0 16 16"
          className="fill-white size-4"
        >
          <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
        </svg>
      ) : (
        <></>
      )}
    </>
  );
}
function BigVolume(p: Volume) {
  return (
    <>
      {66 <= p.value ? (
        <svg
          data-encore-id="icon"
          role="presentation"
          aria-label="Âm lượng cao"
          aria-hidden="true"
          id="volume-icon"
          viewBox="0 0 16 16"
          className="fill-white size-4"
        >
          <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
          <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
        </svg>
      ) : (
        <></>
      )}
    </>
  );
}
