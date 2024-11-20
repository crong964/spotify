import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  NextSong,
  SetPip,
  SetSongs,
  SetStop,
} from "@/page/component/Audio/AudioRedux";
import { PlaySong, RootHome } from "@/page/Route/home/RootRedux";
import { post } from "@/page/config/req";
import {
  PauseSoundIcon,
  PlaySoundIcon,
  SkipNextIcon,
  SkipPreviousIcon,
} from "@/icon/Icon";
import { PiP } from "./Type";
import { PiPWindow } from "@/page/component/Pip/Index";

export default function Pip({ imagePath }: PiP) {
  let [pipWindow, SetPipWindow] = useState<any>(null);
  const dispatch = useDispatch();
  const [duration, SetDuration] = useState(0);
  const [currentTime, SetCurrentTime] = useState(0);
  const lsSong = useSelector((state: RootHome) => state.audioroot.lsSong);
  const stop = useSelector((state: RootHome) => state.audioroot.stop);
  const mark = useSelector((state: RootHome) => state.audioroot.mark);
  const [show, SetShow] = useState(false);
  const RandomNext = useCallback((n: number) => {
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
  }, []);

  useEffect(() => {
    const d = async () => {
      let w = window as any;
      let pipWindow = await w.documentPictureInPicture.requestWindow({
        width: 200,
        height: 200,
      });
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join("");
          const style = document.createElement("style");

          style.textContent = cssRules;
          pipWindow.document.head.appendChild(style);
        } catch (e) {
          const link = document.createElement("link");

          link.rel = "stylesheet";
          link.type = styleSheet.type;

          pipWindow.document.head.appendChild(link);
        }
      });
      pipWindow.addEventListener("pagehide", () => {
        dispatch(SetPip(false));
      });
      SetPipWindow(pipWindow);
    };
    d();
  }, [pipWindow]);
  useEffect(() => {
    let s = setInterval(() => {
      let mu = document.querySelector(".g") as HTMLAudioElement;
      if (mu) {
        SetDuration(mu.duration);
        SetCurrentTime(mu.currentTime);
      }
    }, 1000);

    return () => {
      clearInterval(s);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        SetShow(true);
      }}
      onMouseLeave={() => {
        SetShow(false);
      }}
    >
      <PiPWindow pipWindow={pipWindow}>
        <div
          className="bg-no-repeat relative opacity-5 "
          style={{
            backgroundImage: `url(${imagePath})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            alignItems: " flex-end",
            height: "100vh",
            width:"100vw"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              opacity: 0.4,
              zIndex: 0,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div style={{ width: "100%" }}>
              {show ? (
                <div
                  style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{ margin: 4 }}
                    onClick={() => {
                      RandomNext(-1);
                    }}
                  >
                    <SkipPreviousIcon className="hover:fill-green-500 fill-white size-4" />
                  </button>
                  <button
                    style={{ margin: 4 }}
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
                    style={{ margin: 4 }}
                    onClick={() => {
                      RandomNext(1);
                    }}
                  >
                    <SkipNextIcon className="hover:fill-green-500 fill-white size-4" />
                  </button>
                </div>
              ) : (
                <></>
              )}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  height: 4,
                  width: `${(currentTime / duration) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </PiPWindow>
    </div>
  );
}
