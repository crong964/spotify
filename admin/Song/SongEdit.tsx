import React, { useEffect, useState } from "react";
import { post } from "@/page/config/req";

import { useSelector } from "react-redux";
import { RootState } from "@/admin/Redux";
import { useParams } from "react-router-dom";

import DateReact from "../componnt/Date";
import { Tabs } from "@/page/component/tabs";
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
  user_id: string;
};

type SongEidt = {
  idSong: string;
};
function convertYYYMMDD(params: string) {
  let d = new Date(parseInt(params) * 1000);
  return `${d.getFullYear()}-${d.getMonth() + 1 > 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)
    }-${d.getDate() > 10 ? d.getDate() : "0" + d.getDate()}`;
}
export default function SongEdit() {
  const [SelectedSingers, SetSelectedSingers] = useState<singer[]>([]);
  const [conut, SetConut] = useState(0);
  const [file, SetFile] = useState<File>();
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
    user_id: "",
  });
  const [tab, SetTabs] = useState("");

  const songListAndInforArtist = useSelector(
    (state: RootState) => state.navi.songListAndInforArtist
  );
  const idSong = useSelector((state: RootState) => state.navi.idSong);
  useEffect(() => {
    post("/admin/song/get", { idsong: idSong }, (v: any) => {
      if (v.err != undefined && !v.err) {
        SetSong(v.song);
        SetTabs(v.song.Genre_id);
      }
    });
  }, [idSong]);
  return (
    <>
      {songListAndInforArtist == "edit" ? (
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
          <InputArtist
            onChange={(v) => {
              SetSelectedSingers(v);
            }}
            key={1}
          />

          <div>Ngày phát hành</div>

          <DateReact
            cellClassName="p-2"
            int={song.publicDate}
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
              value={song.description}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-1/3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-1/3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                    />
                  </svg>
                </div>

                <audio
                  controls
                  src={`/s?id=${song.filePath}`}
                  onCanPlay={(e) => {
                    console.log(e.currentTarget.duration);
                    SetSong({
                      ...song,
                      Duration: e.currentTarget.duration,
                    });
                  }}
                >
                  <source src={`/s?id=${song.filePath}`} />
                </audio>
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

                if (song.Singer.length <= 0 || song.SongName.length <= 0) {
                  alert("chưa nhập tên hoặc chưa nhập tên ca sĩ");
                  if (!confirm("bạn muốn tiếp tục chứ")) {
                    return;
                  }
                }
                var form = new FormData();

                const myObj: { [key: string]: any } = song;

                for (const key in myObj) {
                  form.set(key, myObj[key]);
                }
                if (myObj.publicDate == "" || myObj.publicDate == undefined) {
                  alert("chưa nhập ngày");
                  return;
                }
                form.set("Genre_id", tab);
                if (file != undefined) {
                  form.set("avatar", file);
                }
                form.set("user_id", user_id);
                post("/admin/song/update", form, (v: any) => {
                  if (!v.err) {
                    alert("tc");
                    window.location.reload();
                  } else {
                    alert("loou");
                  }
                });
              }}
              className="bg-blue-700 cursor-pointer text-white font-bold rounded-full px-3 py-2"
            >
              Cập nhật
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
