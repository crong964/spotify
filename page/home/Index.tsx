import React, { useEffect, useState } from "react";

import { SetionList } from "./Setion";
import RecentList, { RecentPlaylist } from "./Right/RecentPlaylist";
import Genre from "./Genre";
import Queue from "./Right/Queue";

import PlaylistPage, { ArtisePage, LikedSongListPage } from "./PlayList";

import { useDispatch, useSelector } from "react-redux";
import PlayingBar from "./Audio/PlayingBar";
import Header from "./Header/Header";
import {
  NaviPage,
  RootHome,
  SetDeviceType,
  SetMess,
  ShowTopbarContent,
} from "./RootRedux";
import Search from "./Search";
import Profile from "./Profile";
import IdGenre from "./IdGenre";

import Right from "./Right/Right";
import ChatBox from "./boxchat/SingleBox";
import { socket } from "../socket/Socket";
import { Home } from "./NaviHome/Home";
import { SearchButtom } from "./NaviHome/SearchButtom";
import { SetTypeMobile } from "./NaviHome/NaviRedux";
import { NaviHomeMobile } from "./NaviHome/NaviHome";
import Foot from "./Foot";
import { SuggestPlaylist } from "../component/Playlist";

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
  const mobiletype = useSelector((state: RootHome) => state.mobile.type);
  const BoxList = useSelector((state: RootHome) => state.rootHome.BoxList);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const screem = () => {
    if (window.screen.availWidth > 600) {
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
    socket.on("mess", res);
    window.addEventListener("load", (ev) => {
      screem();
    });
    window.addEventListener("resize", (ev) => {
      screem();
    });
    return () => {
      socket.off("mess", res);
      window.removeEventListener("load", (ev) => {
        screem();
      });
      window.removeEventListener("resize", (ev) => {
        screem();
      });
    };
  }, []);

  return (
    <div className="h-full w-full p-0 m-0 bg-black CircularSpUIv3T-Book overflow-hidden">
      <div className="flex h-[88%]  sm:h-[88%] space-x-1 relative">
        <div className="w-[80px] hidden sm:block px-1 space-y-1">
          <div className="h-[20%] bg-[#121212] rounded-lg py-2">
            <div className="h-full  ">
              <Home />
              <SearchButtom />
            </div>
          </div>
          {isLogin ? (
            <div className="h-[80%] bg-[#121212] rounded-lg py-2 flex justify-center">
              <div className="w-2/3 ">
                <img
                  onClick={() => {
                    dispatch(NaviPage({ page: "likedsongs", param: "" }));
                  }}
                  src="../public/liked-songs-640.png"
                  className="rounded-lg"
                  alt=""
                  srcSet=""
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className=" w-full  space-y-1">
          <div className="relative h-[10%]">
            <Header></Header>
          </div>
          <div className="flex h-[90%] w-full ">
            {mobiletype == "pc" ? <PcBody /> : <MobileBody />}
          </div>
        </div>
        <div className="absolute right-[400px] z-40 space-x-2 flex bottom-0 ">
          {BoxList.map((v) => {
            return <ChatBox idbox={v} key={v} />;
          })}
        </div>
      </div>
      <PlayingBar />
      <NaviHomeMobile />
    </div>
  );
}

function Center() {
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  const topbarcontent = useSelector(
    (state: RootHome) => state.rootHome.topbarcontent
  );
  const dispatch = useDispatch();
  var children: React.JSX.Element;
  switch (page) {
    case "genre":
      children = <Genre></Genre>;
      break;
    case "playlist":
      children = <PlaylistPage></PlaylistPage>;
      break;
    case "likedsongs":
      children = <LikedSongListPage></LikedSongListPage>;
      break;
    case "artise":
      children = <ArtisePage></ArtisePage>;
      break;
    case "search":
      children = <Search></Search>;
      break;
    case "profile":
      children = <Profile></Profile>;
      break;
    case "idgenre":
      children = <IdGenre></IdGenre>;
      break;
    default:
      children = (
        <>
          <div className="h-full">
            <RecentList/>
            <SetionList name="Danh sách các nghệ sĩ" type="artist" />
            <SuggestPlaylist/>
          </div>
        </>
      );
  }
  return (
    <div
      onScroll={(e) => {
        var h = e.currentTarget.scrollTop;
        if (h < 320) {
          dispatch(ShowTopbarContent(false));
          return;
        }
        if (
          (page == "artise" || page == "playlist") &&
          e.currentTarget.scrollTop >= 320 &&
          !topbarcontent
        ) {
          dispatch(ShowTopbarContent(true));
        }
      }}
      className="flex-1 h-full overflow-y-scroll"
    >
      {page == "home" ? (
        <div className="text-white flex justify-start space-x-1 items-center sticky top-0 z-[2] bg-black p-2">
          <button className="px-2 py-1 rounded-2xl bg-white text-black">
            Tất cả
          </button>
          <button className="px-2 py-1 rounded-2xl bg-[#2F2F2F] ">Nhạc</button>
          <button className="px-2 py-1 rounded-2xl bg-[#2F2F2F] ">
            Podcast
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className=" h-max relative">{children}</div>
      <Foot />
    </div>
  );
}

function PcBody() {
  return (
    <>
      <Center />
      <Right />
    </>
  );
}

function MobileBody() {
  const side = useSelector((state: RootHome) => state.rootHome.side);
  switch (side) {
    case "right":
      return <Right />;
    default:
      return <Center />;
  }
}
