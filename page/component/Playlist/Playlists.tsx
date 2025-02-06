import React from "react";
import { Link } from "react-router-dom";
import { PlayList } from "./Playlist";
import { iPlayLists } from "./interface";

export default function PlayLists(p: iPlayLists) {
  var children = p.d
    .filter((v, i) => {
      return i < 7;
    })
    .map((v) => {
      return (
        <PlayList
          Type={v.Type}
          Genre_ID={v.Genre_ID}
          ImagePath={v.ImagePath}
          PlayListName={v.PlayListName}
          id={v.id}
          key={v.id}
        />
      );
    });

  return (
    <>
      {children.length > 0 ? (
        <>
          <div className="w-full">
            <div className="w-full flex justify-between items-center p-2">
              <Link
                to={p.link || "#"}
                className="text-[24px] font-bold border-0 sm:border-2 border-black hover:border-b-white"
              >
                {p.title}
              </Link>
              {children.length >= 7 ? (
                <Link
                  className="text-[#B3B3B3] text-[14px] font-bold border-0 sm:border-2 border-black hover:border-b-[#B3B3B3]"
                  to={p.link || "#"}
                >
                  Hiện tất cả
                </Link>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full flex overflow-x-scroll sm:overflow-hidden">
              {children}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
