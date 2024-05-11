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
  const recentList = useSelector(
    (state: RootHome) => state.rootHome.recentList
  );
  const [genre, SetGenre] = useState<Genre[]>([]);
  useEffect(() => {
    get("genre/GetLimitFloor", (v: any) => {
      SetGenre(v.ls);
    });
  }, []);
  return (
    <div>
      <div className="text-[24px] font-bold text-white">Duyệt tìm tất cả</div>
      <div
        className={`grid  grid-cols-2 ${
          recentList ? "sm:grid-cols-6 gap-2" : "sm:grid-cols-8 "
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
      className={`bg-[${d.color}] cursor-pointer size-[200px] sm:size-[160px] rounded-lg p-2`}
    >
      <div className="text-[24px] font-bold text-white ">{d.name}</div>
    </div>
  );
}
