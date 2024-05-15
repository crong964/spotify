import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "./RootRedux";
import { get } from "../config/req";
interface Genre {
  Id: string;
  Name: string;
}
export default function Genre() {
  var color = [
    "#E8115B",
    "#DC148C",
    "#006450",
    "#8400E7",
    "#1E3264",
    "#E8115B",
    "#27856A",
    "#608108",
    "#148A08",
    "#D84000",
    "#7D4B32",
    "#E91429",
  ];
  var i = 0;
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  const dispatch = useDispatch();
  const [genre, SetGenre] = useState<Genre[]>([]);
  useEffect(() => {
    get("genre/GetLimitFloor", (v: any) => {
      SetGenre(v.ls);
    });
  }, []);
  return (
    <div>
      <div className="text-[24px] font-bold text-white">Duyệt tìm tất cả</div>
      <form className="flex sm:hidden w-full sticky top-0 left-0 items-center bg-white text-black rounded-2xl my-1 p-2">
        <input
          className="w-[90%] p-2 focus:outline-none "
          onChange={(v) => {
            var value = v.currentTarget.value;
            if (value.length == 2) {
              dispatch(NaviPage({ page: "genre", param: "" }));
              return;
            }
            dispatch(NaviPage({ page: "search", param: value }));
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </form>
      <div
        className={`grid grid-cols-2 ${
          Right != "" ? "sm:grid-cols-6 " : "sm:grid-cols-8 "
        }`}
      >
        {genre.map((v) => {
          i += 1;
          return (
            <GenreData
              id={v.Id}
              name={v.Name}
              key={v.Id}
              color={color[i % color.length]}
            ></GenreData>
          );
        })}
      </div>
    </div>
  );
}
interface GenreData {
  name: string;
  color: string;
  id: string;
}
function GenreData(d: GenreData) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(NaviPage({ page: "idgenre", param: d.id }));
      }}
      className={`bg-[${d.color}] cursor-pointer m-2 h-[100px] sm:size-[160px] rounded-lg p-2`}
    >
      <div className="text-[24px] font-bold text-white ">{d.name}</div>
    </div>
  );
}
