import React, { useCallback, useState } from "react";
import { Playing, RootHome, SetPlaying } from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { get, post } from "@/page/config/req";
import { SetSongs, SetStop } from "@/page/component/Audio/AudioRedux";
import { PausePlaylistIcon, PlayPlaylistIcon } from "@/icon/Icon";

export default function PlayButtom(p: Playing) {
  const playing = useSelector((state: RootHome) => state.rootHome.playing);
  const stopAudio = useSelector((state: RootHome) => state.audioroot.stop);

  const [load, SetLoad] = useState(false);
  const dispatch = useDispatch();

  const PlayingPlaylist = () => {
    if (playing.id == p.id && p.page == playing.page) {
      var mu = document.querySelector(".g") as HTMLAudioElement;
      if (mu.paused) {
        mu.play();
        dispatch(SetStop(false));
      } else {
        mu.pause();
        dispatch(SetStop(true));
      }
      return;
    }
    if (p.page != "likesong") {
      post("/recentPlaylist/play", { id: p.id, type: p.page }, (v: any) => {
        if (!v.err) {
          dispatch(SetPlaying({ id: p.id, page: p.page }));
          dispatch(SetSongs(v.ls));
          dispatch(SetStop(false));
        }
      });
      return;
    }
    get("/lsong/likedsongs", (v: any) => {
      if (v && !v.err) {
        dispatch(SetPlaying({ id: p.id, page: p.page }));
        dispatch(SetSongs(v.ls));
        dispatch(SetStop(false));
      }
    });
  };
  return (
    <div
      onClick={() => {
        PlayingPlaylist();
      }}
      className="cursor-pointer rounded-full p-2 hover:bg-[#1ED760] bg-[#1FDC62] flex justify-center items-center"
    >
      {stopAudio || playing.id != p.id || p.page != playing.page ? (
        <PausePlaylistIcon className="size-8  fill-black" />
      ) : (
        <PlayPlaylistIcon className="size-8  fill-black" />
      )}
    </div>
  );
}
