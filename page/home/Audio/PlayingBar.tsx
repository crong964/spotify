import React, { useEffect, useRef, useState } from "react";
import Song from "../Song";
import { useDispatch, useSelector } from "react-redux";
import { NaviRight, RootHome, ShowRecentList } from "../RootRedux";
import Audio from "./Audio";
import { post } from "../../config/req";
import { SetStop } from "./AudioRedux";

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
  const dispatch = useDispatch();

  const idsong = useSelector((state: RootHome) => state.rootHome.idSong);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);

  var temp: SongI | undefined = undefined;
  if (localStorage.getItem("song") != null) {
    temp = JSON.parse(localStorage.getItem("song") as string);
  }

  const NextSong = (Song: SongI) => {
    localStorage.setItem("song", JSON.stringify(Song));
    SetSong(Song);
  };
  const HandelAu = (type: "song" | "pause", d: any) => {
    switch (type) {
      case "song":
        NextSong(d);
        break;
      default:
        break;
    }
  };
  const [song, SetSong] = useState<SongI>({
    Duration: temp?.Duration ? temp.Duration : "",
    filePath: temp?.filePath ? temp.filePath : "",
    Id: temp?.Id ? temp.Id : "",
    SongImage: temp?.SongImage ? temp.SongImage : "",
    Singer: temp?.Singer ? temp.Singer : "",
    SongName: temp?.SongName ? temp.SongName : "",
  });
  useEffect(() => {
    post(
      "/song/get",
      {
        idsong: idsong,
      },
      (v: any) => {
        if (!v.err) {
          SetSong(v.song);
          localStorage.setItem("song", JSON.stringify(v.song));
        }
      }
    );
  }, [idsong]);
  return (
    <div className="w-full bg-[#121212] h-[9%] sm:h-[12%] grid items-center grid-cols-1 sm:grid-cols-4 mt-0 ">
      <div className="flex sm:inline-block justify-between items-center px-2 sm:px-0">
        <Song
          Id={song.Id}
          image={song.SongImage}
          name={song.SongName}
          singer={song.Singer}
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
              <svg className="fill-white size-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm224-72V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24zm112 0V328c0 13.3-10.7 24-24 24s-24-10.7-24-24V184c0-13.3 10.7-24 24-24s24 10.7 24 24z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <Audio path={song.filePath} next={HandelAu} id={song.Id} />
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
        <button>
          <svg
            aria-label="Âm lượng trung bình"
            aria-hidden="true"
            id="volume-icon"
            viewBox="0 0 16 16"
            className="fill-white size-4"
          >
            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
          </svg>
        </button>
        <input
          type="range"
          max={1}
          step={1 / 10}
          className="rounded-lg overflow-hidden appearance-none bg-gray-400 h-1"
        />
      </div>
    </div>
  );
}
