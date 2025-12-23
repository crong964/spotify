import React from "react";
import { Playing, RootHome, SetPlaying } from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { get, post } from "@/page/config/req";
import { SetSongs, SetStop } from "@/page/component/Audio/AudioRedux";
import { PausePlaylistIcon, PlayPlaylistIcon } from "@/icon/Icon";

export default function PlayButtom({ id, page }: Playing) {
  const playing = useSelector((state: RootHome) => state.rootHome.playing);
  const stopAudio = useSelector((state: RootHome) => state.audioroot.stop);

  const dispatch = useDispatch();

  const PlayingPlaylist = () => {
    if (playing.id == id && page == playing.page) {
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
    if (page == "likesong") {
      get("/lsong/likedsongs", (v: any) => {
        if (v && !v.err) {
          dispatch(SetPlaying({ id: id, page: page }));
          dispatch(SetSongs(v.ls));
          dispatch(SetStop(false));
        }
      });

      return;
    }
    if (page == "mix") {
      get(`/rs/getlistenAgain/${id}`, (v: any) => {
        if (v && !v.err) {
          dispatch(SetPlaying({ id: id, page: page }));
          dispatch(SetSongs(v.ls));
          dispatch(SetStop(false));
        }
      });
      return;
    }
    post("/recentPlaylist/play", { id: id, type: page }, (v: any) => {
      if (!v.err) {
        dispatch(SetPlaying({ id: id, page: page }));
        dispatch(SetSongs(v.ls));
        dispatch(SetStop(false));
      }
    });
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        PlayingPlaylist();
      }}
      className="cursor-pointer rounded-full shadowPlayButton p-2 hover:bg-[#1ED760] bg-[#1FDC62] flex justify-center items-center"
    >
      {stopAudio || playing.id != id ? (
        <PausePlaylistIcon className="size-8  fill-black" />
      ) : (
        <PlayPlaylistIcon className="size-8  fill-black" />
      )}
    </div>
  );
}
