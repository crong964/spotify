import React, { Suspense, useEffect, useState } from "react";

import { SetionList } from "./Setion";

const RecentList = React.lazy(() => import("./Right/RecentPlaylist"));
const Genre = React.lazy(() => import("./Genre"));
const PlaylistPage = React.lazy(() => import("@/page/home/Route/PlayListPage"));
const ArtistPage = React.lazy(() => import("@/page/home/Route/ArtistPage"));
const LikedSongListPage = React.lazy(
  () => import("@/page/home/Route/LikedSongListPage")
);
const Foot = React.lazy(() => import("./Foot"));
import { useDispatch, useSelector } from "react-redux";

const PlayingBar = React.lazy(() => import("./Audio/PlayingBar"));
const ChatBox = React.lazy(() => import("./boxchat/SingleBox"));
const Header = React.lazy(() => import("./Header/Header"));

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

const Right = React.lazy(() => import("./Right/Right"));
const PlaylistLike = React.lazy(
  () => import("@/page/home/NaviHome/PlaylistLike")
);

import { socket } from "@/page/socket/Socket";
import { MobileSearchButtom } from "./NaviHome/SearchButtom";

import { NaviHomeMobile } from "./NaviHome/NaviHome";

import { SuggestPlaylist } from "@/page/component/Playlist";
import NaviLoveSong from "./NaviHome/NaviLoveSong";
import Home from "./NaviHome/Home";
import { Outlet, Route, Routes, useRouteError } from "react-router-dom";

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
export default function IndexTest() {
  const { Set, queue, SetQueue, scroll } = useIndex();
  const mobiletype = useSelector((state: RootHome) => state.mobile.type);
  const BoxList = useSelector((state: RootHome) => state.rootHome.BoxList);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const titleXY = useSelector((state: RootHome) => state.rootHome.titleXY);
  const screem = () => {
    if (window.innerWidth > 600) {
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

    window.addEventListener("resize", (ev) => {
      screem();
    });
    window.addEventListener("load", (ev) => {
      screem();
    });

    window.addEventListener("popstate", (e) => {});
    return () => {
      socket.off("mess", res);
      window.removeEventListener("load", (ev) => {
        screem();
      });
      window.removeEventListener("resize", (ev) => {
        screem();
      });
      window.removeEventListener("popstate", () => {
        alert("f");
      });
    };
  }, []);

  return (
    <div className="h-full w-full relative p-0 m-0 bg-black CircularSpUIv3T-Book overflow-hidden">
      <main title="main" className="flex h-full sm:h-[90%] space-x-1 relative">
        <nav title="left" className="w-[80px] hidden sm:block px-1 space-y-1">
          <div className="h-[20%] bg-[#121212] rounded-lg py-2">
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
            {mobiletype == "pc" ? (
              <>
                <CenterShare />
                <Right />
              </>
            ) : (
              <MobileBody />
            )}
          </div>
        </div>
      </main>
      <div className="sticky block sm:hidden bg-black h-[10%] opacity-40 z-30 left-0 bottom-0 w-full"></div>
      <div className="sticky sm:block z-40 left-0 bottom-0 w-full p-2">
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

      {titleXY.show && mobiletype=="pc" ? (
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
    </div>
  );
}

// function Center() {
//   var color = [
//     "#E8115B",
//     "#DC148C",
//     "#006450",
//     "#8400E7",
//     "#1E3264",
//     "#E8115B",
//     "#27856A",
//     "#608108",
//     "#148A08",
//     "#D84000",
//     "#7D4B32",
//     "#E91429",
//   ];
//   const [n, SetN] = useState(0);
//   var carou = color.map((v) => {
//     return <div className={`size-full bg-[${v}] `}></div>;
//   });
//   const page = useSelector((state: RootHome) => state.rootHome.command.page);
//   const topbarcontent = useSelector(
//     (state: RootHome) => state.rootHome.topbarcontent
//   );
//   const dispatch = useDispatch();
//   var children: React.JSX.Element;
//   switch (page) {
//     case "genre":
//       children = <Genre></Genre>;
//       break;
//     case "playlist":
//       children = <PlaylistPage></PlaylistPage>;
//       break;
//     case "likedsongs":
//       children = <LikedSongListPage></LikedSongListPage>;
//       break;
//     case "artist":
//       children = <ArtistPage></ArtistPage>;
//       break;
//     case "search":
//       children = <Search></Search>;
//       break;
//     case "profile":
//       children = <Profile></Profile>;
//       break;
//     case "idgenre":
//       children = <IdGenre></IdGenre>;
//       break;
//     default:
//       children = (
//         <div className="h-full">
//           <RecentList />
//           <SetionList name="Danh sách các nghệ sĩ" type="artist" />
//           <SuggestPlaylist />
//         </div>
//       );
//   }
//   return (
//     <div
//       onScroll={(e) => {
//         var h = e.currentTarget.scrollTop;
//         if (h < 320) {
//           dispatch(ShowTopbarContent(false));
//           return;
//         }
//         if (
//           (page == "artist" || page == "playlist") &&
//           e.currentTarget.scrollTop >= 320 &&
//           !topbarcontent
//         ) {
//           dispatch(ShowTopbarContent(true));
//         }
//       }}
//       className="flex-1 h-full overflow-y-scroll"
//     >
//       {page == "home" ? (
//         <div className="hidden sm:inline-block ">
//           <GenreInHome></GenreInHome>
//         </div>
//       ) : (
//         <></>
//       )}

//       <div className=" h-max relative">{children}</div>
//       <Foot />
//     </div>
//   );
// }

function NaviRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<CenterShare></CenterShare>}>
          <Route
            index
            element={
              <div className="h-full">
                <RecentList />
                <SetionList name="Danh sách các nghệ sĩ" type="artist" />
                <SuggestPlaylist />
              </div>
            }
          />
          <Route path="genre" element={<Outlet></Outlet>}>
            <Route path=":id" element={<IdGenre></IdGenre>} />
            <Route index element={<Genre></Genre>} />
          </Route>
          <Route path="playlist/:id" element={<PlaylistPage />}></Route>
          <Route path="likedsongs" element={<LikedSongListPage />}></Route>
          <Route path="artist/:id" element={<ArtistPage></ArtistPage>}></Route>
          <Route path="search/:s" element={<Search></Search>}></Route>
          <Route element={<div>ko ti d</div>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
// function PcBody() {
//   return (
//     <>
//       <NaviRoute />
//       <Right />
//     </>
//   );
// }

function MobileBody() {
  const side = useSelector((state: RootHome) => state.rootHome.side);
  switch (side) {
    case "right":
      return <NaviRoute />;
    default:
      return <Right />;
  }
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
