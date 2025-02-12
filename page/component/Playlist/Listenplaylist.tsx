import { get } from "@/page/config/req";
import React from "react";
import { useEffect, useState } from "react";
import { Playlist } from ".";
import { useNavigate } from "react-router-dom";
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
export default function Listenplaylist() {
  const [count, SetCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    get("/rs/listenAgain", (v: any) => {
      SetCount(Math.floor(v.count / 50));
    });
  }, []);
  let children = [];
  for (let i = 0; i < count && i < 7; i++) {
    children.push(
      <Playlist
        
        ImagePath="https://res.cloudinary.com/dkd1k6e2r/image/upload/v1739376087/aXZpdml2aXZpdml2aXZpdg_g89ohh.jpg"
        className={`cursor-pointer size-[100px] sm:size-[180px] `}
        Genre_ID=""
        PlayListName={`Mix Ngày ${i + 1}`}
        Type=""
        id=""
        click={() => {
          navigate(`/mix/${i}`);
        }}
        key={i}
      />
    );
  }
  return count > 0 ? (
    <>
      <div className="w-full">
        <div className="w-full flex justify-between items-center p-2">
          <div className="text-[24px] font-bold border-0 sm:border-2 border-black hover:border-b-white">
            Nghe lại các bài hát cũ
          </div>
        </div>
        <div className="w-full space-x-1 sm:space-x-0 flex overflow-x-scroll sm:overflow-hidden">
          {children}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
