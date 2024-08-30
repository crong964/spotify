import React from "react";
import { RootHome } from "@/page/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { NoRepeat, RepeatPlaylistIcon, RepeatSongIcon } from "@/icon/Icon";
import { SetModPlay } from "@/page/home/Audio/AudioRedux";

export default function ModPlay() {
  const modplay = useSelector((state: RootHome) => state.audioroot.modplay);

  let chilred = <></>;
  switch (modplay) {
    case 2:
      chilred = (
        <ButtonModPlay title="lặp lại 1 bài hát mãi mãi">
          <RepeatSongIcon className="fill-green-500 size-8 sm:size-4" />
        </ButtonModPlay>
      );
      break;
    case 1:
      chilred = (
        <ButtonModPlay title="lặp lại danh sách phát">
          <RepeatPlaylistIcon className="fill-green-500 size-8 sm:size-4" />
        </ButtonModPlay>
      );
      break;
    default:
      chilred = (
        <ButtonModPlay title="không lặp">
          <NoRepeat className="fill-white size-8 sm:size-4"></NoRepeat>
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
