import React, { useEffect, useState } from "react";
import { get, post } from "@/page/config/req";
import IndexGenres from "@/page/dashboard/Genres";
import { useDispatch, useSelector } from "react-redux";
import { Navi, RootNaviRedux, SongEidt } from "@/page/dashboard/NaviRedux";
interface Genre {
  Id: string;
  Name: string;
  color: string;
  idParent: string;
  Floor: number;
}
interface Song {
  Id: string;
  SongName: string;
  SongImage: string;
  status: number;
  Duration: number;
  description: string;
  PublicTime: string;
  Genre_id: string;
  filePath: string;
}
export default function SongForm() {
  const [conut, SetConut] = useState(0);
  const [total, SetTotal] = useState(0);
  const [finsih, SetFish] = useState(true);

  const [PreviewNewImage, SetPreviewNewImage] = useState("");
  const [newImage, SetNewImage] = useState<File>();

  const [song, SetSong] = useState<Song>({
    Id: "",
    SongImage: "",
    SongName: "",
    status: 0,
    description: "",
    Duration: 0,
    PublicTime: "",
    Genre_id: "",
    filePath: "",
  });
  const idSong = useSelector((state: RootNaviRedux) => state.navi.idSong);

  const name = useSelector((state: RootNaviRedux) => state.navi.name);
  const slectGenre = useSelector(
    (state: RootNaviRedux) => state.navi.slectGenre
  );
  const floor = useSelector((state: RootNaviRedux) => state.navi.floor);
  const dispatch = useDispatch();

  useEffect(() => {
    post(
      "song/get",
      {
        idsong: idSong,
      },
      (v: any) => {
        if (!v.err) {
          SetSong(v.song);
        }
      }
    );
  }, [idSong]);

  return (
    <div className="w-[70%] mx-auto py-[72px] px-[42px] text-[16px] font-bold space-y-4">
      <div className="text-center text-[40px] font-bold">
        Thông tin bài hát chỉnh sửa
      </div>
      <div className="w-full">
        <div className="flex space-x-4">
          <div>thể loại</div>
          <div className="font-extralight">{name}</div>
        </div>
        <div className="rounded-lg w-full border h-[200px]">
          <IndexGenres />
        </div>
      </div>
      <div>Tên nhạc</div>
      <div>
        <input
          value={song.SongName}
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
          value={song.description}
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
          <div
            onClick={() => {
              SetPreviewNewImage("");
            }}
            className="bg-blue-700 w-min my-2 text-white px-3 py-2 rounded-lg"
          >
            Xóa
          </div>
          <label
            htmlFor={PreviewNewImage == "" ? "avatar" : ""}
            className=" px-4 py-2 rounded-full w-full"
          >
            {PreviewNewImage == "" ? (
              <img src={song.SongImage} alt="" srcSet="" />
            ) : (
              <img src={PreviewNewImage} alt="" srcSet="" />
            )}

            <input
              id="avatar"
              onChange={(e) => {
                var files = e.currentTarget.files;
                if (files != null && files.length > 0) {
                  var file = URL.createObjectURL(files[0]);
                  SetNewImage(files[0]);
                  SetPreviewNewImage(file);
                  SetSong({
                    ...song,
                    SongImage: file,
                  });
                }
              }}
              type="file"
              className=" invisible "
            />
          </label>
        </div>
        <div className="nhac w-1/2">
          <div>Nhạc</div>
          <label htmlFor="music">
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
                d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
              />
            </svg>

            <audio
              controls
              onCanPlay={(e) => {
                SetSong({
                  ...song,
                  Duration: e.currentTarget.duration,
                });
              }}
            >
              {song.filePath == "" ? (
                <></>
              ) : (
                <source src={`s?id=${song.filePath}`} />
              )}
            </audio>
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          onClick={() => {
            var form = new FormData();
            const myObj: { [key: string]: any } = song;
            for (const key in myObj) {
              const element = myObj[key];
              form.set(key, element);
            }
            if (floor == 0) {
              form.set("Genre_id", song.Genre_id);
            } else {
              form.set("Genre_id", slectGenre[floor]);
            }

            if (newImage != undefined) {
              form.set("avatar", newImage);
            }

            post("song/NewUpdate", form, (v: any) => {
              if (!v.err) {
                dispatch(Navi("songlist"));
              } else {
                alert("loou");
              }
            });
          }}
          className="bg-blue-700 cursor-pointer text-white font-bold rounded-full px-3 py-1"
        >
          Lưu
        </div>
      </div>
    </div>
  );
}
