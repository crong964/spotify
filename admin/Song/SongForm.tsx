import React, { useEffect, useRef, useState } from "react";
import { get, post } from "@/page/config/req";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/admin/Redux";
import IndexGenres from "@/admin/GenreLs";
import { useParams } from "react-router-dom";
import { ImageIcon, MusicIcon } from "@/icon/Icon";
import useSelectedArtist from "./Handlle";
import DateReact from "../componnt/Date";
import { Audio2 } from "@/page/component/Audio/Index";
import Audio3 from "@/page/component/Audio/Audio3";
import { Tabs } from "@/page/component/tabs/Index";
import InputArtist from "../componnt/artist/InputArtist";
import { singer } from "../componnt/artist/interface";

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
  publicDate: string;
  filePath: string;
};
export default function SongForm() {
  const [conut, SetConut] = useState(0);
  const [SelectedSingers, SetSelectedSingers] = useState<singer[]>([]);
  const [file, SetFile] = useState<File>();
  const [total, SetTotal] = useState(0);
  const [finsih, SetFish] = useState(false);
  const { idArtist } = useParams();
  const [song, SetSong] = useState<Song>({
    Id: "",
    SongImage: "",
    SongName: "",
    description: "",
    Duration: 0,
    publicDate: "",
    filePath: "",
    Singer: "",
  });
  const songListAndInforArtist = useSelector(
    (state: RootState) => state.navi.songListAndInforArtist
  );

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
      post("/s", { id: pa }, (v: any) => {
        SetFish(true);
      });
    }
  }
  const [tab, SetTabs] = useState("");
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
              <Tabs
                onchange={(v) => {
                  SetTabs(v);
                }}
                value={tab}
              />
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
          <InputArtist
            onChange={(v) => {
              SetSelectedSingers(v);
            }}
            key={1}
          />

          <div>Ngày phát hành</div>

          <DateReact
            int={song.publicDate}
            cellClassName="p-2"
            className="p-2"
            onChange={(p) => {
              SetSong({
                ...song,
                publicDate: p,
              });
            }}
          />

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
                    <Audio3
                      className="fill-black  rounded-full size-9"
                      GetTIme={(v) => {
                        SetSong({
                          ...song,
                          Duration: v,
                        });
                      }}
                      path={song.filePath}
                      id={song.Id}
                    />
                  </>
                )}
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => {
                if (SelectedSingers.length <= 0) {
                  alert("chưa chọn nghệ sĩ");
                  return;
                }
                let user_id = JSON.stringify(SelectedSingers);

                var form = new FormData();
                if (tab.length == 0) {
                  alert("chưa chon tab");
                  return;
                }
                form.set("Genre_id", tab);
                const myObj: { [key: string]: any } = song;

                for (const key in myObj) {
                  form.set(key, myObj[key]);
                }

                if (myObj.publicDate == "" || myObj.publicDate == undefined) {
                  alert("chưa nhập ngày");
                  return;
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
