import React, { useState } from "react";
import { Playing, RootHome, SetPlaying } from "../home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../config/req";
import { SetSong } from "../home/Audio/AudioRedux";

export default function PlayButtom(p: Playing) {
  const playing = useSelector((state: RootHome) => state.rootHome.playing);
  const stopAudio = useSelector((state: RootHome) => state.audioroot.stop);
  const [status, SetStatus] = useState<"play" | "pause">("pause");
  const [load, SetLoad] = useState(false);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        post("recentPlaylist/play", { id: p.id, type: p.page }, (v: any) => {
          if (!v.err) {
            SetStatus("play");
            dispatch(SetPlaying({ id: p.id, page: p.page }));
            dispatch(SetSong(v.ls));
          }
        });
      }}
      className="size-12 rounded-full hover:bg-[#1ED760] bg-[#1FDC62] flex justify-center items-center"
    >
      {stopAudio || playing.id != p.id || p.page != playing.page ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-6 fill-black"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="fill-black size-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
        </svg>
      )}
    </div>
  );
}
