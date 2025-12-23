import { io } from "socket.io-client";

export const socket = io();

export function VolumeAudio(params: number) {
  var mu = document.querySelector(".g") as HTMLAudioElement;
  if (mu) {
    if (params <= 0) {
      mu.volume = 0;
      return;
    }
    if (params >= 100) {
      mu.volume = 1;
      return;
    }
    mu.volume = params / 100;
  }
}
export function GetVolum() {
  let volume = parseInt(localStorage.getItem("volume") || "100");
  if (volume > 100) {
    return 100;
  }
  if (volume < 0) {
    return 0;
  }
  return volume;
}
export function ParseJson(params: string) {
  try {
    return JSON.parse(params);
  } catch (error) {
    return {};
  }
}
class Help implements iHelp {
  Title(titlename: string) {
    let t = document.getElementById("titlte");
    if (t) {
      t.innerText = titlename;
    }
  }
}

interface iHelp {
  Title(titlename: string): void;
}

export const iHelp = new Help();
