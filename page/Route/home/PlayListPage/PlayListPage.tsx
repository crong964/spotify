import React, { useEffect, useState } from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetCurName, SetPlaylist } from "@/page/Route/home/RootRedux";
import { get, post } from "@/page/config/req";
import { RecommendedSong, SongList } from "@/page/component/Song/Index";

import { TimeString } from "@/page/component/Time";
import { useParams } from "react-router-dom";

import {
  CheckCircleIcon,
  MusicNoteBeamedIcon,
  PencilIcon,
  PlusCircleIcon,
  ThreeDotsIcon,
  XIcon,
} from "@/icon/Icon";
import { SetAutoPlay } from "@/page/component/Audio/AudioRedux";
import { SongInPlayList } from "@/page/component/Song/interface";
import { Avatar } from "@/page/component/avatar";
import { Pop } from "@/page/component/pop";
import { PopEditPlaylis } from "@/page/component/Playlist";

var g = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 6, 7];
export interface artist {
  id: string | undefined;
  Vertify: string | undefined;
  Nationality: string | undefined;
  ChanalName: string | undefined;
  Account: string | undefined;
  Name: string | undefined;
  description: string | undefined;
  pathImage: string | undefined;
  Password: string | undefined;
  Banner: string | undefined;
}
export interface Song {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  liked: string;
}

interface SongList {
  data: Song[];
}
interface PlaylistForm {
  PlayListName: string;
  id: string;
  ImagePath: string;
  Discripition: string;
}
export default function PlaylistPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const [idU, SetIdU] = useState("");
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const playlist = useSelector((state: RootHome) => state.rootHome.playlist);
  const [like, SetLike] = useState(false);
  const [tabs, SetTabs] = useState("");
  useEffect(() => {
    get(`/playlist/data/${id}`, (v: any) => {
      if (v && !v.err) {
        SetSongS(v.songs);
        var time = 0;
        var song = 0;
        for (let i = 0; i < v.songs.length; i++) {
          const element: Song = v.songs[i];
          time += parseInt(element.Duration + "");
          song += 1;
        }
        v.playlist.Duration = time;
        v.playlist.Songs = song;

        SetLike(v.like);
        SetIdU(v.idU);
        dispatch(SetPlaylist(v.playlist));
        let ls = v.songs as SongInPlayList[];
        let tab: any = {};
        for (let i = 0; i < ls.length; i++) {
          const e = ls[i];
          if (e.Genre_id) {
            tab[e.Genre_id] = !tab[e.Genre_id] ? 1 : tab[e.Genre_id] + 1;
          }
        }
        let max = 0;
        let maxtab = "";
        for (const key in tab) {
          if (Object.prototype.hasOwnProperty.call(tab, key)) {
            const e = tab[key];
            if (e > max) {
              maxtab = key;
              max = e;
            }
          }
        }

        SetTabs(maxtab);
        dispatch(SetCurName(v.playlist.PlayListName));
      }
    });
  }, [id]);
  const [sh, SH] = useState(false);
  const [edit, SetEdit] = useState(false);
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end ">
        <div className="flex items-end justify-start">
          <div className="flex z-10 p-4 justify-center items-end sm:space-x-4">
            <div
              className="relative"
              onMouseEnter={() => {
                if (playlist.User_id == idU) {
                  SH(true);
                }
              }}
            >
              <Avatar
                className="size-[250px] rounded-2xl"
                src={playlist.ImagePath}
              />
              {sh ? (
                <div
                  onMouseLeave={() => {
                    SH(false);
                  }}
                  onClick={() => {
                    SetEdit(true);
                  }}
                  className="bg-black opacity-30 absolute top-0 left-0 size-[250px] flex items-center justify-center rounded-2xl"
                >
                  <PencilIcon className="size-20 fill-white"></PencilIcon>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center">
                <span className="font-normal text-[16px] text-white">
                  playlist
                </span>
              </div>
              <h1>
                <span className="text-white font-bol text-[50px] font-black">
                  {playlist.PlayListName}
                </span>
              </h1>
              <div className="flex space-x-4">
                <span className="text-[16px] font-bold text-white">
                  {playlist.Songs} bài hát
                </span>
                <span className="text-[16px] font-bold text-white flex items-center space-x-3">
                  <div>Khoảng thời gian:</div>
                  <TimeString d={parseInt(playlist.Duration + "")} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[320px]"></div>
      <div className="sm:px-4 py-2">
        <div className="flex items-center py-0 sm:py-4 space-x-5">
          <PlayButtom id={id + ""} page="playlist" />
          {isLogin && idU != playlist.User_id ? (
            <>
              {like ? (
                <button
                  onClick={() => {
                    post(
                      "/likePlaylist/delete",
                      { idPlaylist: id },
                      (v: any) => {
                        if (v) {
                          SetLike(!like);
                        }
                      }
                    );
                  }}
                >
                  <CheckCircleIcon className="size-[32px] fill-[#1ED760] "></CheckCircleIcon>
                </button>
              ) : (
                <button
                  onClick={() => {
                    post("/likePlaylist/add", { idPlaylist: id }, (v: any) => {
                      if (v) {
                        SetLike(!like);
                      }
                    });
                  }}
                >
                  <PlusCircleIcon className="size-[32px] fill-[#C7C7C7] "></PlusCircleIcon>
                </button>
              )}
            </>
          ) : (
            <></>
          )}

          <button className="cursor-pointer">
            <ThreeDotsIcon className="fill-[#C7C7C7] hover:fill-white size-[45px] "></ThreeDotsIcon>
          </button>
        </div>
        <div className="py-3 font-bold text-[24px]  text-white">
          Các bài hát
        </div>
        <SongList data={songs} type="playlist" />
        {isLogin && idU == playlist.User_id ? (
          <RecommendedSong
            tabs={tabs}
            idPlaylist={playlist.id}
            onclick={(v) => {
              alert(v != undefined);
              if (v != undefined) {
                SetSongS([...songs, v]);
              }
            }}
          />
        ) : (
          <></>
        )}
        <footer className="h-5"></footer>
      </div>
      {edit ? (
        <PopEditPlaylis
          Discripition=""
          ImagePath={playlist.ImagePath}
          id={playlist.id}
          PlayListName={playlist.PlayListName}
          onChange={(v) => {
            
            dispatch(SetPlaylist({ ...playlist, ...v }));
          }}
          onShow={(v) => {
            SetEdit(v);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

{
  /* <Pop left={0} top={0}>
            <div className="  relative">
              <div className="w-[100vw] h-[100vh] opacity-20 bg-black absolute top-0 left-0 z-0"></div>
              <div
                onClick={() => {
                  SetEdit(false);
                }}
                className="w-[100vw] h-[100vh] absolute top-0 left-0 z-10 flex justify-center items-center"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    SetEdit(true);
                  }}
                  className="w-[524px] min-h-[384px] bg-[#282828] rounded-lg"
                >
                  <div className="p-6 flex items-center">
                    <div className="flex-1 text-[24px] font-bold">
                      Edit details
                    </div>
                    <div
                      onClick={() => {
                        SetEdit(false);
                      }}
                    >
                      <XIcon className="fill-white size-8 hover:fill-green-400 cursor-pointer" />
                    </div>
                  </div>
                  <div className="min-h-[170px] px-6 grid grid-cols-8 grid-rows-8 gap-4">
                    <input
                      onChange={(e) => {
                        var files = e.currentTarget.files;
                        if (files != null && files.length > 0) {
                          var file = URL.createObjectURL(files[0]);
                          SetFile(files[0]);
                          SetPlaylistForm({
                            ...playlistform,
                            ImagePath: file,
                          });
                        }
                      }}
                      type="file"
                      className="hidden"
                      id="file"
                      name="file"
                    />
                    <label
                      htmlFor="file"
                      className="col-span-3 row-span-8 bg-[#3E3E3E] flex justify-center items-center"
                    >
                      {playlistform.ImagePath ? (
                        <Avatar
                          className="size-full"
                          src={playlistform.ImagePath}
                        />
                      ) : (
                        <MusicNoteBeamedIcon className="size-16 fill-white" />
                      )}
                    </label>
                    <div className=" col-span-5 row-span-8 grid grid-rows-8 grid-cols-1 gap-4">
                      <input
                        onChange={(v) => {
                          let name = v.currentTarget.value;
                          SetPlaylistForm({
                            ...playlistform,
                            PlayListName: name,
                          });
                        }}
                        value={playlistform.PlayListName}
                        placeholder="Tên danh sách"
                        className="col-span-1 focus:outline-none row-span-2 bg-[#3E3E3E]"
                      />

                      <div
                        onChange={(v) => {
                          let name = v.currentTarget.innerText;
                          SetPlaylistForm({
                            ...playlistform,
                            Discripition: name,
                          });
                        }}
                        contentEditable={true}
                        className="col-span-1 focus:outline-none row-span-6 bg-[#3E3E3E]"
                      >
                        {playlistform.Discripition}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end py-2 px-6">
                    <button
                      onClick={() => {
                        let form = new FormData();
                        form.set("PlayListName", playlistform.PlayListName);
                        form.set("id", playlistform.id);
                        form.set("Discripition", playlistform.Discripition);
                        if (file) {
                          form.set("avatar", file);
                        }
                        post("/playlist/update", form, (v: any) => {
                          if (!v.err) {
                            SetPlayList({ ...playlist, ...playlistform });
                          }
                        });
                      }}
                      className="bg-white text-[18px] px-3 py-2 text-black rounded-full"
                    >
                      Save
                    </button>
                  </div>
                  <div className="line-clamp-2 text-[12px] font-bold px-6">
                    By proceeding, you agree to give Spotify access to the image
                    you choose to upload. Please make sure you have the right to
                    upload the image.
                  </div>
                </div>
              </div>
            </div>
          </Pop> */
}
