import React, { useEffect, useState } from "react";

import { SetionList } from "./Setion";
import RecentList, { RecentPlaylist } from "./Right/RecentPlaylist";
import Genre from "./Genre";
import Queue from "./Right/Queue";

import Playlist, { Artise, LikedSongList } from "./PlayList";

import { useDispatch, useSelector } from "react-redux";
import PlayingBar from "./Audio/PlayingBar";
import Header from "./Header/Header";
import { NaviPage, RootHome, SetMess } from "./RootRedux";
import Search from "./Search";
import Profile from "./Profile";
import IdGenre from "./IdGenre";

import Right from "./Right/Right";
import ChatBox from "./boxchat/SingleBox";
import { socket } from "../socket/Socket";
import { Home } from "./NaviHome/Home";
import { SearchButtom } from "./NaviHome/SearchButtom";
import { NaviHomeMobile } from "./NaviHome/NaviHome";

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
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  const BoxList = useSelector((state: RootHome) => state.rootHome.BoxList);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    function res(v: any) {
      dispatch(SetMess(v));
    }
    socket.on("mess", res);
    return () => {
      socket.off("mess", res);
    };
  }, []);

  var children: React.JSX.Element;
  switch (page) {
    case "genre":
      children = <Genre></Genre>;
      break;
    case "playlist":
      children = <Playlist></Playlist>;
      break;
    case "likedsongs":
      children = <LikedSongList></LikedSongList>;
      break;
    case "artise":
      children = <Artise></Artise>;
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
        <div>
          <div className="">
            <RecentList>
              <RecentPlaylist img="../public/ca.jpg" name="Cà Phê Quán Quen" />
              <RecentPlaylist img="../public/ca.jpg" name="Cà Phê Quán Quen" />
            </RecentList>
            <SetionList name="Danh sách các nghệ sĩ" type="artist"/>
           
          </div>
        </div>
      );
      break;
  }
  return (
    <div className="h-full w-full bg-black CircularSpUIv3T-Book overflow-y-hidden">
      <div className="flex h-[82%] sm:h-[85%] space-x-1 relative">
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
        <div className="flex-1 w-[100%]  space-y-1">
          <div className="relative ">
            <Header></Header>
          </div>
          <div className=" overflow-y-scroll h-[80%] relative">{children}</div>
        </div>
        <Right />
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
