import React, { useEffect, useState } from "react";

import { SetionList } from "./Setion";
import RecentList, { RecentPlaylist } from "./Right/RecentPlaylist";
import Genre from "./Genre";
import Queue from "./Right/Queue";

import PlaylistPage, { ArtisePage, LikedSongListPage } from "./PlayList";

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
import { SetTypeMobile } from "./NaviHome/NaviRedux";
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

  const mobiletype = useSelector((state: RootHome) => state.mobile.type);
  const BoxList = useSelector((state: RootHome) => state.rootHome.BoxList);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const screem = () => {
    if (window.screen.width > 650) {
      dispatch(SetTypeMobile("pc"));
    } else {
      dispatch(SetTypeMobile("mobile"));
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
      <div className="flex h-[82%]  sm:h-[88%] space-x-1 relative">
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
  switch (page) {
    case "genre":
      return <Genre></Genre>;
    case "playlist":
      return <PlaylistPage></PlaylistPage>;
    case "likedsongs":
      return <LikedSongListPage></LikedSongListPage>;
    case "artise":
      return <ArtisePage></ArtisePage>;
    case "search":
      return <Search></Search>;
    case "profile":
      return <Profile></Profile>;
    case "idgenre":
      return <IdGenre></IdGenre>;
    default:
      return (
        <>
          <div className="h-full">
            <RecentList>
              <RecentPlaylist img="../public/ca.jpg" name="Cà Phê Quán Quen" />
              <RecentPlaylist img="../public/ca.jpg" name="Cà Phê Quán Quen" />
            </RecentList>
            <SetionList name="Danh sách các nghệ sĩ" type="artist" />
          </div>
        </>
      );
  }
}

function PcBody() {
  return (
    <>
      <div className="flex-1 h-full overflow-y-scroll">
        <div className=" h-max relative">
          <Center />
        </div>
      </div>
      <Right />
    </>
  );
}

function MobileBody() {
  const center = useSelector((state: RootHome) => state.rootHome.center);
 
  return (
    <>
      {center ? (
        <div className="flex-1 h-full overflow-y-scroll">
          <div className=" h-max relative">
            <Center />
          </div>
        </div>
      ) : (
        <Right />
      )}
    </>
  );
}
