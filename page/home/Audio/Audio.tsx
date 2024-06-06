import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { post } from "../../config/req";
import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "../RootRedux";
import { NextSong, SetModPlay, SetStop } from "./AudioRedux";

interface Audio {
  path: string;
  next(a: "song" | "pause", d: any): void;
  id: string;
}
export default function Audio(params: Audio) {
  const stop = useSelector((state: RootHome) => state.audioroot.stop);
  const modplay = useSelector((state: RootHome) => state.audioroot.modplay);
  const dispatch = useDispatch();
  const [duration, SetDuration] = useState(0);
  const [curTime, SetCurTime] = useState(0);
  const [timeUpdate, SetTimeUpdate] = useState(true);
  useEffect(() => {
    async function set() {
      var mu = document.querySelector(".g") as HTMLAudioElement;

      if (mu) {
        SetDuration(mu.duration);
      }
    }
    set();
  });
  return (
    <div className="col-span-full sm:col-span-2 flex flex-col space-y-0 sm:space-y-2">
      <div className="hidden sm:flex space-x-9 justify-center items-center">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-shuffle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
            />
            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
          </svg>
        </button>

        <button
          onClick={() => {
            params.next("song", params.id);
            dispatch(NextSong(-1));
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-white size-4"
          >
            <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
          </svg>
        </button>

        <button
          className=""
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

        <button
          onClick={() => {
            params.next("song", params.id);
            dispatch(NextSong(1));
          }}
        >
          <svg
            width="16"
            height="16"
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="white"
            className=""
          >
            <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
          </svg>
        </button>
        <ModPlay></ModPlay>
      </div>

      <div className="flex justify-center items-center space-x-2 ">
        <Time d={curTime} key={0} />
        <input
          type="range"
          className="rounded-lg  cursor-pointer overflow-hidden appearance-none bg-gray-400 h-[6px] w-full sm:w-[70%]"
          max={duration}
          value={curTime}
          onChange={(e) => {
            SetCurTime(parseInt(e.currentTarget.value));
            SetTimeUpdate(false);
          }}
          onMouseUp={() => {
            var mu = document.querySelector(".g") as HTMLAudioElement;
            mu.currentTime = curTime;
            SetTimeUpdate(true);
          }}
        />
        <Time d={duration} key={1} />
        <audio
          src={`idSong?idSong=${params.path}`}
          onCanPlay={async (e) => {
            var cu = e.currentTarget;
            await cu.play();
            dispatch(SetStop(cu.paused));
          }}
          className="g"
          onTimeUpdate={(e) => {
            var time =
              e.currentTarget.duration - e.currentTarget.currentTime < 0.001;
            if (time && (modplay == 1 || modplay == 0)) {
              params.next("song", params.id);
            }
            if (time && modplay == 2) {
              var mu = document.querySelector(".g") as HTMLAudioElement;
              mu.currentTime = 0;
            }

            if (timeUpdate) {
              SetCurTime(e.currentTarget.currentTime);
            }
          }}
        >
          {params.path != "" ? (
            <source src={`idSong?idSong=${params.path}`} type="audio/mp3" />
          ) : (
            <></>
          )}
        </audio>
      </div>
    </div>
  );
}

interface Time {
  d: number;
}
function Time(params: Time) {
  var data = parseInt(params.d + "");
  var minute = parseInt(data / 60 + "");
  var second = data % 60;

  if (isNaN(data)) {
    return <div></div>;
  }
  return (
    <div className="text-[12px] text-[#a7a7a7] hidden sm:inline-block ">
      {minute}:{second < 10 ? `0${second}` : `${second}`}
    </div>
  );
}

function ModPlay() {
  const modplay = useSelector((state: RootHome) => state.audioroot.modplay);
  var chilred = <></>;
  switch (modplay) {
    case 2:
      chilred = (
        <ButtonModPlay>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-green-500 size-4"
          >
            <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"></path>
            <path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>
          </svg>
        </ButtonModPlay>
      );
      break;
    case 1:
      chilred = (
        <ButtonModPlay>
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-green-500 size-4"
          >
            <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
          </svg>
        </ButtonModPlay>
      );
      break;
    default:
      chilred = (
        <ButtonModPlay>
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="fill-white size-4"
          >
            <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
          </svg>
        </ButtonModPlay>
      );
      break;
  }
  return chilred;
}

interface iButtonModPlay {
  children: React.JSX.Element;
}

function ButtonModPlay(params: iButtonModPlay) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(SetModPlay());
      }}
    >
      {params.children}
    </button>
  );
}
