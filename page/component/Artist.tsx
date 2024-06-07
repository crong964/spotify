import React, { useState } from "react";
import PlayButtom from "./PlayButtom";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "../home/RootRedux";
interface artist {
  pathImage: string;
  ChanalName: string;
  artist: string;
  id: string;
  type: string;
}
interface Artists {
  d: artist[];
}
export function Artists(d: Artists) {
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  return (
    <>
      {d.d.length > 0 ? (
        <>
          <div className="mt-1 overflow-auto sm:overflow-hidden">
            <div className="text-white text-[24px] my-1 font-bold">Nghệ sĩ</div>
            <div
              className={`flex sm:grid gap-3 overflow-x-scroll w-max sm:w-full  ${
                Right != "" ? "grid-cols-5" : "grid-cols-7 "
              }`}
            >
              {d.d.map((v) => {
                return (
                  <Artist
                    ChanalName={v.ChanalName}
                    artist={v.artist}
                    key={v.id}
                    id={v.id}
                    pathImage={v.pathImage}
                    type="nghệ sĩ"
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default function Artist(params: artist) {
  const [hidden, SetHidden] = useState(true);

  const dispatch = useDispatch();
  return (
    <div
      className="w-full cursor-pointer"
      onMouseEnter={() => {
        SetHidden(false);
      }}
      onMouseLeave={() => {
        SetHidden(true);
      }}
    >
      <div className="relative">
        <img
          onClick={() => {
            dispatch(NaviPage({ page: "artise", param: params.id }));
          }}
          src={params.pathImage}
          className="size-[150px] sm:size-full rounded-full"
          alt=""
          srcSet=""
        />
        {hidden ? (
          <></>
        ) : (
          <div className="absolute right-0 bottom-0">
            <PlayButtom id={params.id} page={params.type} />
          </div>
        )}
      </div>
      <div className="text-[14px] sm:text-[16px] text-white font-bold line-clamp-1">
        {params.ChanalName}
      </div>
      <div className="text-[14px] text-[#b3b3b3] font-normal line-clamp-1">
        {params.type == "artist" ? "nghệ sĩ" : params.artist}
      </div>
    </div>
  );
}
