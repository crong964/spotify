import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { SetMess } from "../home/RootRedux";

export const socket = io();

export function VolumeAudio(params: number) {
  var mu = document.querySelector(".g") as HTMLAudioElement;
  if (mu) {
    if (params <= 0) {
        mu.volume=0
        return
    }
    mu.volume = params / 100;
   
  }
}
