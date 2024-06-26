import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { post } from "../../page/config/req";
import Time from "../../page/component/Time";

type Song = {
  Id: string;
  user_id: string;
  SongName: string;
  Singer: string;
  Duration: string;
  Viewer: number;
  SongImage: string;
  filePath: string;
  stt: number;
  Vertify: number;
};
type SongList = {
  data: Song[];
};

interface Toggle {
  status: string;
  idSong: string;
}
function Toggle(d: Toggle) {
  const [show, SetShow] = useState(d.status == "1" ? true : false);

  function Han() {
    post(
      "/song/upStatus",
      {
        idSong: d.idSong,
        status: show ? 0 : 1,
      },
      (v: any) => {
        if (!v.err) {
          SetShow(!show);
        }
      }
    );
  }
  return (
    <div className="flex flex-col cursor-pointer">
      <div
        onClick={Han}
        className={`h-10 p-2 w-[60%] rounded-full ${
          show ? "bg-green-700" : "bg-black"
        }`}
      >
        {show ? (
          <div className="size-6  float-right bg-white rounded-full"></div>
        ) : (
          <div className="size-6 float-left bg-white rounded-full"></div>
        )}{" "}
      </div>
    </div>
  );
}
export function Song(v: Song) {
  let { idArtist } = useParams();

  const feature = () => {
    if (confirm("bạn muốn xóa không")) {
      post(
        "/admin/song/delete",
        { idArtist: idArtist, idsong: v.Id },
        (v: any) => {
          if (v.err) {
            alert("thất bại");
            return;
          }
          alert("thành công");
          location.reload();
        }
      );
    }
  };
  return (
    <div className="grid grid-cols-7 text-[13px] sm:text-[14px] sm:space-x-2  text-black font-bold sm:p-4 rounded-lg items-center">
      <div className="col-span-1 flex items-center space-x-2">
        <div className="sm:inline-block hidden">{v.stt}</div>
        <img className="size-28" src={v.SongImage} alt="" srcSet="" />
      </div>
      <div className="col-span-3 sm:col-span-2 p-2 ">
        <div className="block">{v.SongName}</div>
      </div>
      <div className="sm:block hidden col-span-1 text-[14px] text-stone-500">
        {v.Viewer}
      </div>
      <div className="sm:block hidden col-span-1 text-[14px] text-stone-500">
        <Toggle idSong={v.Id} status={v.Vertify + ""} />
      </div>
      <div className="sm:block hidden col-span-1 text-[14px] text-stone-500">
        <Time d={parseInt(v.Duration)}></Time>
      </div>
      <div className="sm:block hidden col-span-1 text-[14px] text-stone-500">
        <svg
          onClick={() => {
            feature();
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6 hover:fill-green-600 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
}
export default function SongList(d: SongList) {
  var stt = 0;
  return (
    <>
      {d.data.length > 0 ? (
        <>
          <div className="text-3xl my-4">Danh sách nhạc</div>
          <div className="hidden sm:grid grid-cols-7 text-[13px] sm:text-[14px]  cursor-pointer sm:space-x-2 text-black font-bold p-2 rounded-lg items-center">
            <div className="col-span-1 flex items-center space-x-2">
              <div className="inline-block">Số thứ tự</div>
            </div>
            <div className="col-span-2 p-2 ">
              <div className="block">Tên nhạc</div>
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              Lượt xem
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              Ẩn/hiển
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              thời gian
            </div>
            <div className="sm:block hidden col-span-1 text-[14px] ">
              Thao tác
            </div>
          </div>
          <div className="py-2">
            {d.data.map((v) => {
              stt += 1;
              return (
                <Song
                  Vertify={v.Vertify}
                  Duration={v.Duration + ""}
                  Id={v.Id}
                  Singer={v.Singer}
                  SongName={v.SongName}
                  Viewer={v.Viewer}
                  filePath={v.filePath}
                  SongImage={v.SongImage}
                  stt={stt}
                  user_id=""
                  key={v.Id}
                />
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
