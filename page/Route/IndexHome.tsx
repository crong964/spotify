import React, { useEffect, useState } from "react";
const Genre = React.lazy(() => import("./home/GenrePage/GenrePage"));
const Foot = React.lazy(() => import("@/page/component/Foot"));
import { useDispatch, useSelector } from "react-redux";

const Header = React.lazy(() => import("@/page/component/Header/Header"));

import {
  RootHome,
  SetDeviceType,
  SetMess,
  ShowTopbarContent,
} from "./home/RootRedux";

const PlaylistLike = React.lazy(
  () => import("@/page/Route/home/NaviHome/PlaylistLike")
);
const NaviLoveSong = React.lazy(
  () => import("@/page/Route/home/NaviHome/NaviLoveSong")
);

import { socket } from "@/page/socket/Socket";
import { MobileSearchButtom } from "./home/NaviHome/SearchButtom";

import {
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./home/NaviHome/Home";
import Right from "./home/Right/Right";
import { PlayingBar } from "@/page/component/Audio/Index";
import PlayingPlaylistMobile from "./mobile/playslist/PlayingPlaylistMobile";
import ChatBox from "@/page/component/boxchat/SingleBox";
import CarouselSlide, {
  color,
} from "@/page/component/CarouselSlide/CarouselSlide";
import { NaviHomeMobile2 } from "@/page/component/NaviHome/NaviHome";
import { ChatBoxMobliePage } from "./mobile/chatbox/ChatBoxMobliePage";
import { SingleBoxChatPage } from "./mobile/SingleBox/SingleBoxChatPage";
import { Libarary } from "@/page/component/libarary";
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
  const BoxList = useSelector((state: RootHome) => state.rootHome.BoxList);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const { pathname } = useLocation();
  const screem = async () => {
    if (window.innerWidth > 900) {
      dispatch(SetDeviceType("pc"));
    } else {
      dispatch(SetDeviceType("mobile"));
    }
    try {
      let wakelock = await navigator.wakeLock.request("screen");
      wakelock.addEventListener("release", () => {});
    } catch (error) {}
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
    <div className="h-full w-full relative p-0 m-0 bg-black overflow-hidden font-normal">
      <main title="main" className="flex h-full  sm:h-[90%] space-x-1 relative">
        <nav title="left" className="w-[80px] hidden sm:block px-1 space-y-1">
          <div className="h-[20%] bg-[#121212] rounded-lg p-0 sm:py-2">
            <div className="h-full  ">
              <Home />
              <MobileSearchButtom />
            </div>
          </div>
          {isLogin ? (
            <div className="relative h-[80%] overflow-y-auto bg-[#121212] rounded-lg pb-2 ">
              <div className="sticky z-20 top-0 bg-black">
                <Libarary />
              </div>
              <NaviLoveSong />
              <PlaylistLike />
            </div>
          ) : (
            <></>
          )}
        </nav>
        <div title="center" className="w-full sm:w-[calc(100%-88px)] space-y-1">
          <div className="relative min-h-max max-h-[10%] ">
            <Header></Header>
          </div>

          <div className="flex h-[90%] w-full px-0 sm:px-3">
            <CenterShare />
            <Right />
          </div>
        </div>
      </main>
      <div className="absolute sm:block z-40 left-0 bottom-0 w-full px-0 py-0 sm:py-2 sm:px-2">
        <PlayingBar />
        <NaviHomeMobile2 />
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
      {pathname.indexOf("mobile/playlist") >= 0 ? (
        <PlayingPlaylistMobile />
      ) : (
        <></>
      )}
      {pathname.indexOf("mobile/chatbox") >= 0 ? <ChatBoxMobliePage /> : <></>}
      {pathname.indexOf("mobile/singlebox") >= 0 ? (
        <SingleBoxChatPage />
      ) : (
        <></>
      )}
    </div>
  );
}

export function GenreInHome() {
  return (
    <div className="text-white flex justify-start space-x-1 items-center sticky top-0 z-[2] sm:bg-black p-2">
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
  const { pathname } = useLocation();
  return (
    <div
      onScroll={(e) => {
        var h = e.currentTarget.scrollTop;
        if (h < 320) {
          dispatch(ShowTopbarContent(false));
          return;
        }
        if (
          (pathname.indexOf("/artist") >= 0 ||
            pathname.indexOf("/playlist") >= 0) &&
          e.currentTarget.scrollTop >= 320 &&
          !topbarcontent
        ) {
          dispatch(ShowTopbarContent(true));
        }
      }}
      className="flex-1 h-full overflow-y-scroll relative"
    >
      {pathname == "/" ? (
        <div className="hidden sm:inline-block sticky top-0 left-0 z-10 w-full bg-black">
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
