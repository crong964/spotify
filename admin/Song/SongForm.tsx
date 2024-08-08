import React, { useEffect, useRef, useState } from "react";
import { get, post } from "@/page/config/req";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/admin/Redux";
import IndexGenres from "@/admin/GenreLs";
import { useParams } from "react-router-dom";
import { ImageIcon, MusicIcon } from "@/icon/Icon";
import useSelectedArtist from "./Handlle";

type Genre = {
  Id: string;
  Name: string;
  color: string;
  idParent: string;
  Floor: number;
};
type Song = {
  Id: string;
  Singer: string;
  SongName: string;
  SongImage: string;
  Duration: number;
  description: string;
  PublicTime: string;
  filePath: string;
};
export default function SongForm() {
  const name = useRef<HTMLInputElement>(null);
  const [conut, SetConut] = useState(0);
  const [file, SetFile] = useState<File>();
  const [total, SetTotal] = useState(0);
  const [finsih, SetFish] = useState(false);
  const { idArtist } = useParams();
  const data = useSelectedArtist();
  const [song, SetSong] = useState<Song>({
    Id: "",
    SongImage: "",
    SongName: "",
    description: "",
    Duration: 0,
    PublicTime: "",
    filePath: "",
    Singer: "",
  });
  const slectGenre = useSelector((state: RootState) => state.navi.slectGenre);
  const songListAndInforArtist = useSelector(
    (state: RootState) => state.navi.songListAndInforArtist
  );
  const floor = useSelector((state: RootState) => state.navi.floor);
  function upload(params: Uint8Array, i: number, pa?: string) {
    let n = 10000;
    let checksum = 0;
    if (i < params.length) {
      let element = "";
      for (let j = i; j < i + n && j < params.length; j++) {
        element += params[j] + " ";
        checksum += params[j];
        if (checksum > 10000) {
          checksum %= 10000;
        }
      }
      let data = {
        d: element,
        name: pa,
        idArtist: idArtist,
        checksum: checksum,
      };

      post("/admin/song/uploadfile", data, (v: any) => {
        if (!v.err) {
          SetConut(i + n);
          SetSong({
            ...song,
            Id: v.name,
            filePath: v.name,
          });
          upload(params, i + n, v.name);
        }
      });
    } else {
      SetFish(true);
    }
  }

  return (
    <>
      {songListAndInforArtist == "add" ? (
        <div className="w-[70%] mx-auto py-[72px] px-[42px] text-[16px] font-bold space-y-4">
          <div className="text-center text-[40px] font-bold">
            Thông tin bài hát
          </div>
          <div className="w-full">
            <div className="flex space-x-4">
              <div>thể loại</div>
              <div className="font-extralight"></div>
            </div>
            <div className="rounded-lg w-full border h-[200px]">
              <IndexGenres />
            </div>
          </div>
          <div>Tên nhạc</div>
          <div>
            <input
              onChange={(e) => {
                SetSong({
                  ...song,
                  SongName: e.currentTarget.value,
                });
              }}
              type="text"
              className="border-2 border-[#404040] font-medium rounded-lg p-2 w-full"
            />
          </div>
          <div>Ca sĩ</div>
          {data.SelectedSingers.length > 0 ? (
            <div className="w-full">
              {data.SelectedSingers.map((v) => {
                return (
                  <div
                    key={v.id}
                    className="flex items-center space-x-4 my-2 p-2 cursor-pointer"
                    onClick={() => {
                      if (!confirm("bạn muốn xóa không")) {
                        return;
                      }
                      data.SetSelectedSingers([
                        ...data.SelectedSingers.filter((d) => {
                          return v.id != d.id;
                        }),
                      ]);
                    }}
                  >
                    <img
                      src={v.pathImage}
                      alt=""
                      className="size-[3.6rem] rounded-full"
                    />
                    <div>{v.ChanalName}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
          <div className="relative ">
            <input
              ref={name}
              onChange={(e) => {
                let v = e.currentTarget.value;
                if (v.length < 0) {
                  return;
                }
                data.SetP(e.currentTarget.value);
              }}
              type="text"
              className="border-2 border-[#404040] rounded-lg p-2 w-full focus:outline-none"
            />
            {data.singers.length > 0 ? (
              <div className="absolute top-full left-0 bg-black overflow-y-scroll text-white h-[300px] w-full">
                {data.singers.map((v) => {
                  return (
                    <div
                      key={v.id}
                      className="flex items-center space-x-4 my-2 p-2 hover:bg-[#222222] cursor-pointer"
                      onClick={() => {
                        data.SetSelectedSingers([
                          ...data.SelectedSingers,
                          {
                            ChanalName: v.ChanalName,
                            id: v.id,
                            pathImage: v.pathImage,
                          },
                        ]);
                        data.Setsingers([]);
                        if (name.current != null) {
                          name.current.value = "";
                        }
                      }}
                    >
                      <img
                        src={v.pathImage}
                        alt=""
                        className="size-[3.6rem] rounded-full"
                      />
                      <div>{v.ChanalName}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div>Ngày phát hành</div>
          <div>
            <input
              onChange={(e) => {
                SetSong({
                  ...song,
                  PublicTime: e.currentTarget.value,
                });
              }}
              type="datetime-local"
              className="border-2 border-[#404040] rounded-lg p-2 w-full"
            />
          </div>
          <div>Mô tả</div>
          <div className="w-full">
            <textarea
              name="discription"
              onChange={(e) => {
                SetSong({
                  ...song,
                  description: e.currentTarget.value,
                });
              }}
              className="font-normal text-[20px] p-2 w-full border border-black rounded-lg"
              id=""
              cols={10}
              rows={4}
            ></textarea>
          </div>
          <div className="flex w-full">
            <div className="anh w-1/2">
              <div className="mb-2">Ảnh đại diên</div>
              <label
                htmlFor={song.SongImage == "" ? "avatar" : "gdas"}
                className=" px-4 py-2 rounded-full w-full"
              >
                <div className="w-full">
                  {song.SongImage == "" ? (
                    <ImageIcon className="size-1/3" />
                  ) : (
                    <div>
                      <div
                        className="px-4 py-2 w-min bg-blue-600 rounded-full my-2"
                        onClick={() => {
                          SetSong({
                            ...song,
                            SongImage: "",
                          });
                        }}
                      >
                        xóa
                      </div>
                      <img src={song.SongImage} />
                    </div>
                  )}
                </div>

                <input
                  id="avatar"
                  type="file"
                  className=" invisible "
                  onChange={(e) => {
                    var files = e.currentTarget.files;
                    if (files != null && files.length > 0) {
                      var file = URL.createObjectURL(files[0]);
                      SetFile(files[0]);
                      SetSong({
                        ...song,
                        SongImage: file,
                      });
                    }
                  }}
                />
              </label>
            </div>
            <div className="nhac w-1/2">
              <div>Nhạc</div>
              <label htmlFor="music">
                <div className="w-full">
                  <MusicIcon className="w-1/3 fill-white"></MusicIcon>
                </div>
                {!finsih ? (
                  <>
                    <input
                      id="music"
                      onChange={(e) => {
                        var file = e.currentTarget.files?.[0];

                        file?.arrayBuffer().then((v) => {
                          var ut = new Uint8Array(v);
                          SetTotal(ut.length);
                          upload(ut, 0);
                        });
                      }}
                      type="file"
                      className="border-2 invisible border-[#404040] rounded-lg  p-2 w-full"
                    />
                    {total != 0 ? (
                      <div>
                        <div>{(conut / total) * 100}</div>
                        <input
                          type="range"
                          className="w-full"
                          max={total}
                          value={conut}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    <audio
                      src={`/s?id=${song.Id}`}
                      controls
                      onCanPlay={(e) => {
                        SetSong({
                          ...song,
                          Duration: e.currentTarget.duration,
                        });
                      }}
                    >
                      <source src={`/s?id=${song.Id}`} />
                    </audio>
                  </>
                )}
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => {
                if (data.SelectedSingers.length <= 0) {
                  alert("chưa chọn nghệ sĩ");
                  return;
                }
                let user_id = JSON.stringify(data.SelectedSingers);
                if (floor == 0) {
                  alert("chưa chọn thể loại");
                  return;
                }

                var form = new FormData();

                form.set("Genre_id", slectGenre[floor]);
                const myObj: { [key: string]: any } = song;

                for (const key in myObj) {
                  form.set(key, myObj[key]);
                }
                if (file != undefined) {
                  form.set("avatar", file);
                } else {
                  alert("chưa có file nhạc");
                  return;
                }
                form.set("user_id", user_id);
                post("/admin/song/addSong", form, (v: any) => {
                  if (!v.err) {
                    alert("tc");
                    window.location.reload();
                  } else {
                    alert("loou");
                  }
                });
              }}
              className="bg-blue-700 cursor-pointer text-white font-bold rounded-full px-3 py-1"
            >
              Đăng
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
