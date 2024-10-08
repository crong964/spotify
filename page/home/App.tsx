import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import rootHome from "./RootRedux";

import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

const IndexTest = React.lazy(() => import("./IndexHome"));

const RecentList = React.lazy(() => import("./Right/RecentPlaylist"));
import { SetionList } from "./Setion";
import { SuggestPlaylist } from "@/page/component/Playlist";
import ArtistsListPage from "./Route/ArtistsListPage";
import { CenterShare, ChangePassword, CreateAccount, Forgot, SignIn, Signup } from "./Route/auth/Index";
const IdGenre = React.lazy(() => import("./IdGenre"));
const Genre = React.lazy(() => import("./Genre"));
const PlaylistPage = React.lazy(() => import("@/page/home/Route/PlayListPage"));
const SingleArtistPage = React.lazy(() => import("@/page/home/Route/SingleArtistPage"));
const LikedSongListPage = React.lazy(
  () => import("@/page/home/Route/LikedSongListPage")
);
const Search = React.lazy(() => import("@/page/home/Search"));
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
                  <SetionList
                    link="section"
                    name="Danh sách các nghệ sĩ"
                    type="artist"
                  />
                  <SuggestPlaylist />
                </div>
              }
            />
            <Route path="genre" element={<Outlet></Outlet>}>
              <Route path=":id" element={<IdGenre></IdGenre>} />
              <Route index element={<Genre></Genre>} />
            </Route>
            <Route path="playlist/:id" element={<PlaylistPage />} />
            <Route path="likedsongs" element={<LikedSongListPage />} />
            <Route path="artist/:id" element={<SingleArtistPage />} />
            <Route path="search/:s" element={<Search />} />
            <Route path="section" element={<ArtistsListPage />} />
          </Route>
          <Route path="auth" element={<CenterShare></CenterShare>}>
            <Route index element={<SignIn />}></Route>
            <Route path="CreateAccount" element={<CreateAccount />}></Route>
            <Route path="Signup" element={<Signup />}></Route>
            <Route path="Forgot" element={<Forgot />}></Route>
            <Route path="ChangePassword" element={<ChangePassword />}></Route>
          </Route>
          <Route path="*" element={<Navigate replace to="" />} />
        </Routes>
      </Suspense>
    </Provider>
  </BrowserRouter>
);
