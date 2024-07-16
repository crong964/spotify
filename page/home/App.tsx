import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import rootHome from "./RootRedux";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const IndexTest = React.lazy(() => import("./IndexHome"));
import RecentList from "./Right/RecentPlaylist";
import { SetionList } from "./Setion";
import { SuggestPlaylist } from "@/page//component/Playlist";
const IdGenre = React.lazy(() => import("./IdGenre"));
const Genre = React.lazy(() => import("./Genre"));
const PlaylistPage = React.lazy(() => import("@/page/home/Route/PlayListPage"));
const ArtistPage = React.lazy(() => import("@/page/home/Route/ArtistPage"));
const LikedSongListPage = React.lazy(
  () => import("@/page/home/Route/LikedSongListPage")
);

import Search from "./Search";

import rootAuth from "../auth/RootAuth";
const IndexAuth = React.lazy(() => import("@/page/auth/IndexAuth"));
//@ts-ignore
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={rootHome}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<IndexTest></IndexTest>}>
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
            <Route
              path="artist/:id"
              element={<ArtistPage></ArtistPage>}
            ></Route>
            <Route path="search/:s" element={<Search></Search>}></Route>
            <Route element={<div>ko ti d</div>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Provider>
    <Provider store={rootAuth}>
      <IndexAuth />
    </Provider>
  </BrowserRouter>
);
