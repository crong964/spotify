import React, { useEffect } from "react";

const Foot = React.lazy(() => import("@/page/component/Foot"));
import { useDispatch, useSelector } from "react-redux";

const Header = React.lazy(() => import("@/page/component/Header/Header"));
import "./IndexHome2.css";
import {
  RootHome,
  SetDeviceType,
  SetMess,
  ShowTopbarContent,
} from "./home/RootRedux";

import { socket } from "@/page/socket/Socket";
import { Outlet, useLocation } from "react-router-dom";
import Right from "./home/Right/Right";
import { PlayingBar } from "@/page/component/Audio";
import PlayingPlaylistMobile from "./mobile/playslist/PlayingPlaylistMobile";
import ChatBox from "@/page/component/boxchat/SingleBox";
import { NaviHomeMobile2 } from "@/page/component/NaviHome/NaviHome";
import { ChatBoxMobliePage } from "./mobile/chatbox/ChatBoxMobliePage";
import { SingleBoxChatPage } from "./mobile/SingleBox/SingleBoxChatPage";
import NotificationF from "../component/pop/Notification";
import Left from "../component/Left/Left";

export default function Index() {
  const BoxList = useSelector((state: RootHome) => state.rootHome.BoxList);
  const Right2 = useSelector((state: RootHome) => state.rootHome.Right);
  const { pathname } = useLocation();
  const screem = async () => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        dispatch(SetDeviceType("pc"));
      } else {
        dispatch(SetDeviceType("mobile"));
      }
    });
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
    <div className="h-full w-full relative p-0 m-0 bg-[#272A39] overflow-hidden font-normal">
      <div
        className={`${Right2 == "" ? "gridSpotify" : "gridSpotify2"} h-full`}
      >
        <Left />
        <Header />
        <Right />
        <CenterShare />

        <div className="bg-black rounded-2xl f absolute sm:relative z-40 left-0 bottom-0 w-full px-0 py-0 sm:py-2 sm:px-2">
          <PlayingBar />
          <NaviHomeMobile2 />
        </div>
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
      <NotificationF></NotificationF>
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
      className=" h-full m overflow-y-scroll relative bg-black rounded-2xl"
    >
      {pathname == "/" ? (
        <div className="hidden sm:inline-block sticky top-0 left-0 z-10 w-full bg-black">
          <GenreInHome></GenreInHome>
        </div>
      ) : (
        <></>
      )}
      <div className=" h-max relative ">
        <Outlet></Outlet>
      </div>
      <Foot />
    </div>
  );
}
