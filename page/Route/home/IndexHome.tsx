import React, { useEffect, useState } from "react";
const Genre = React.lazy(() => import("./GenrePage/GenrePage"));
const Foot = React.lazy(() => import("@/page/component/Foot"));
import { useDispatch, useSelector } from "react-redux";

const Header = React.lazy(() => import("./Header/Header"));

import {
  NaviPage,
  RootHome,
  SetDeviceType,
  SetMess,
  ShowTopbarContent,
} from "./RootRedux";

const PlaylistLike = React.lazy(
  () => import("@/page/Route/home/NaviHome/PlaylistLike")
);
const NaviLoveSong = React.lazy(
  () => import("@/page/Route/home/NaviHome/NaviLoveSong")
);

import { socket } from "@/page/socket/Socket";
import { MobileSearchButtom } from "./NaviHome/SearchButtom";

import { NaviHomeMobile } from "./NaviHome/NaviHome";

import { Outlet, Route, Routes, useRouteError } from "react-router-dom";
import Home from "./NaviHome/Home";
import Right from "./Right/Right";
import { PlayingBar } from "@/page/component/Audio/Index";
import PlayingPlaylistMobile from "./mobie/PlayingPlaylistMobile";
import ChatBox from "@/page/component/boxchat/SingleBox";
import CarouselSlide, {
  color,
} from "@/page/component/CarouselSlide/CarouselSlide";

function useIndex() {
  const [queue, SetQueue] = useState(false);
  const [scroll, SetSroll] = useState(0);

  function Set(type: "page" | "scroll" | "playlist", va: any) {
    switch (type) {
      default:
        SetSroll(va);
        break;
    }
  }

  return { Set, queue, SetQueue, scroll };
}
export default function Index() {
  const { Set, queue, SetQueue, scroll } = useIndex();
  const mobiletype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const BoxList = useSelector((state: RootHome) => state.rootHome.BoxList);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const titleXY = useSelector((state: RootHome) => state.rootHome.titleXY);
  const playlistmobile = useSelector(
    (state: RootHome) => state.audioroot.playlistmobile
  );
  const screem = () => {
    if (window.innerWidth > 900) {
      dispatch(SetDeviceType("pc"));
    } else {
      dispatch(SetDeviceType("mobile"));
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    function res(v: any) {
      dispatch(SetMess(v));
    }
    screem();
    socket.on("mess", res);
    return () => {
      socket.off("mess", res);
    };
  }, []);

  return (
    <div className="h-full w-full relative p-0 m-0 bg-black CircularSpUIv3T-Book overflow-hidden">
      <main title="main" className="flex h-full sm:h-[90%] space-x-1 relative">
        <nav title="left" className="w-[80px] hidden sm:block px-1 space-y-1">
          <div className="h-[20%] bg-[#121212] rounded-lg p-0 sm:py-2">
            <div className="h-full  ">
              <Home />
              <MobileSearchButtom />
            </div>
          </div>
          {isLogin ? (
            <div className="h-[80%] overflow-y-auto bg-[#121212] rounded-lg py-2 ">
              <NaviLoveSong />
              <PlaylistLike />
            </div>
          ) : (
            <></>
          )}
        </nav>
        <div title="center" className=" w-full  space-y-1">
          <div className="relative min-h-max max-h-[10%]">
            <Header></Header>
          </div>
          <div className="flex h-[90%] w-full ">
            <CenterShare />
            <Right />
          </div>
        </div>
      </main>
      <div className="absolute block sm:hidden bg-[#121212] h-[10%] opacity-40 z-30 left-0 bottom-0 w-full"></div>
      <div className="absolute bg-[#121212] sm:block z-40 left-0 bottom-0 w-full py-0 sm:py-2 px-2">
        <PlayingBar />
        <NaviHomeMobile />
      </div>
      {BoxList.length > 0 ? (
        <div className="absolute right-0 bottom-0 h-full w-full sm:right-[400px] sm:bottom-[100px] sm:h-max sm:w-max z-40 space-x-2 flex  ">
          {BoxList.map((v) => {
            return <ChatBox idbox={v} key={v} />;
          })}
        </div>
      ) : (
        <></>
      )}

      {titleXY.show && mobiletype == "pc" ? (
        <div
          style={{ left: 80, top: titleXY.y }}
          className="absolute z-40 bg-[#434242] p-2 rounded-lg"
        >
          <div className="text-base text-white">{titleXY.Name}</div>
          <div className="text-sm text-gray-400">
            {titleXY.type == "artist" ? "Nghệ sĩ" : "Danh sách phát"}
          </div>
        </div>
      ) : (
        <></>
      )}
      {playlistmobile && mobiletype == "mobile" ? (
        <PlayingPlaylistMobile />
      ) : (
        <></>
      )}
    </div>
  );
}

export function GenreInHome() {
  return (
    <div className="text-white flex justify-start space-x-1 items-center sticky top-0 z-[2] bg-black p-2">
      <button className="px-2 py-1 rounded-2xl bg-[#1FDC62] text-black">
        Tất cả
      </button>
      <button className="px-2 py-1 rounded-2xl bg-[#2F2F2F] ">Nhạc</button>
      <button className="px-2 py-1 rounded-2xl bg-[#2F2F2F] ">Podcast</button>
    </div>
  );
}
function CenterShare() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  const topbarcontent = useSelector(
    (state: RootHome) => state.rootHome.topbarcontent
  );
  return (
    <div
      onScroll={(e) => {
        var h = e.currentTarget.scrollTop;
        if (h < 320) {
          dispatch(ShowTopbarContent(false));
          return;
        }
        if (
          (page == "artist" || page == "playlist") &&
          e.currentTarget.scrollTop >= 320 &&
          !topbarcontent
        ) {
          dispatch(ShowTopbarContent(true));
        }
      }}
      className="flex-1 h-full overflow-y-scroll"
    >
      {page == "home" ? (
        <div className="hidden sm:inline-block ">
          <GenreInHome></GenreInHome>
        </div>
      ) : (
        <></>
      )}
      <div className=" h-max relative">
        <Outlet></Outlet>
      </div>
      <Foot />
    </div>
  );
}
