import React, { useEffect, useState } from "react";
import { iRecommendedSong, SongInPlayList } from "./interface";
import { Avatar } from "@/page/component/avatar";
import ArtistLink from "@/page/component/ArtistLink";
import { post } from "@/page/config/req";
import { SearchCircleIcon, XIcon } from "@/icon/Icon";

export default function RecommendedSong(p: iRecommendedSong) {
  const [songs, SetSongs] = useState<SongInPlayList[]>([]);
  const [songsearch, SetSongSearch] = useState<SongInPlayList[]>([]);
  const [nameSong, SetSongName] = useState("");
  const [start, SetStart] = useState(0);
  const [count, SetCount] = useState(0);
  useEffect(() => {
    getsong();
  }, []);
  useEffect(() => {
    if (nameSong == "") {
      SetSongName("");
      return;
    }

    let time = setTimeout(() => {
      post(
        "/search/NameWithoutPlaylist",
        {
          name: nameSong,
          idPlaylist: p.idPlaylist,
        },
        (v: any) => {
          SetSongSearch(v.songs);
        }
      );
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [nameSong]);
  const getsong = () => {
    post(
      "/song/GetSongByTabs",
      { idPlaylist: p.idPlaylist, start: start, tabs: p.tabs },
      (v: any) => {
        if (v.ls.length > 0) {
          SetStart((start) => start + v.ls.length);
          SetSongs(v.ls);
        } else {
          SetStart(0);
          SetSongs(v.ls);
        }
      }
    );
  };
  return (
    <div className="w-full">
      <div className="min-h-[300px]">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <div className="text-[24px] font-bold pb-[24px]">
              Hãy cùng tìm nội dung cho danh sách phát của bạn
            </div>
            <div className="flex px-2 bg-[#2A2A2A] items-center space-x-4 self-stretch">
              <SearchCircleIcon className="size-[24px] " />
              <input
                onChange={(v) => {
                  let name = v.currentTarget.value;
                  SetSongName(name);
                }}
                type="text"
                className="focus:outline-none p-3 bg-[#2A2A2A] flex-1"
                placeholder="Tìm bài hát"
              />
              {nameSong == "" ? (
                <></>
              ) : (
                <div
                  onClick={() => {
                    SetSongName("");
                    SetSongSearch([]);
                  }}
                >
                  <XIcon className="size-[24px] " />
                </div>
              )}
            </div>
          </div>
          <div>
            <XIcon className="size-[30px]" />
          </div>
        </div>
        {songsearch.map((v) => {
          return (
            <div className="grid grid-cols-7 text-[13px] sm:text-[14px] sm:p-2 py-2 cursor-pointer sm:space-x-2 hover:bg-[#2D2D2D] text-white font-bold rounded-lg items-center">
              <div className="col-span-6 grid grid-cols-5 ">
                <div className="flex items-center col-span-3">
                  <Avatar className="size-12 sm:size-9" src={v.SongImage} />
                  <div className="flex flex-col px-2">
                    <div>{v.SongName}</div>
                    <ArtistLink idArtist={v.user_id} nameArtist={v.Singer} />
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <button
                  className="border-2 border-white px-3 py-2 rounded-2xl hover:bg-white hover:text-black"
                  onClick={() => {
                    post(
                      "/contain/addsong",
                      {
                        Song_id: v.Id,
                        PlayList_id: p.idPlaylist,
                      },
                      (r: any) => {
                        if (!r.err) {
                          p.onclick(v);
                          SetSongSearch(
                            songsearch.filter((vs) => {
                              return vs.Id != v.Id;
                            })
                          );
                        } else {
                          p.onclick(undefined);
                        }
                      }
                    );
                  }}
                >
                  Thêm
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div>Danh sách đề xuất</div>
      {songs.map((v) => {
        return (
          <div className="grid grid-cols-7 text-[13px] sm:text-[14px] sm:p-2 py-2 cursor-pointer sm:space-x-2 hover:bg-[#2D2D2D] text-white font-bold rounded-lg items-center">
            <div className="col-span-6 grid grid-cols-5 ">
              <div className="flex items-center col-span-3">
                <Avatar className="size-12 sm:size-9" src={v.SongImage} />
                <div className="flex flex-col px-2">
                  <div>{v.SongName}</div>
                  <ArtistLink idArtist={v.user_id} nameArtist={v.Singer} />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <button
                className="border-2 border-white px-3 py-2 rounded-2xl hover:bg-white hover:text-black"
                onClick={() => {
                  post(
                    "/contain/addsong",
                    {
                      Song_id: v.Id,
                      PlayList_id: p.idPlaylist,
                    },
                    (r: any) => {
                      if (!r.err) {
                        p.onclick(v);
                        SetSongs(
                          songs.filter((vs) => {
                            return vs.Id != v.Id;
                          })
                        );
                      } else {
                        p.onclick(undefined);
                      }
                    }
                  );
                }}
              >
                Thêm
              </button>
            </div>
          </div>
        );
      })}
      <div className="flex justify-end">
        {songs.length <= 0 ? (
          <></>
        ) : (
          <button
            className="border-2 border-white px-3 py-2 rounded-2xl hover:bg-white hover:text-black"
            onClick={() => {
              getsong();
            }}
          >
            Làm mới
          </button>
        )}
      </div>
    </div>
  );
}
