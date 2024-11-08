import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import rootHome from "./Route/home/RootRedux";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

const Index = React.lazy(() => import("./Route/home/IndexHome"));

import { SetionList } from "./Route/home/Setion";
import { SuggestPlaylist } from "@/page/component/Playlist";

import {
  CenterShare,
  ChangePassword,
  CreateAccount,
  Forgot,
  SignIn,
  Signup,
} from "@/page/Route/auth/Index";
import SingleArtistPage from "./Route/home/SingleArtistPage/SingleArtistPage";
import PlaylistPage from "./Route/home/PlayListPage/PlayListPage";
import LikedSongListPage from "./Route/home/LikedSongListPage/LikedSongListPage";
import SearchPage from "./Route/home/SearchPage/SearchPage";
import ArtistsListPage from "./Route/home/ArtistsListPage/ArtistsListPage";
import RecentList from "./Route/home/Right/RecentPlaylist";
const IdGenre = React.lazy(() => import("./Route/home/GenrePage/IdGenre"));
const Genre = React.lazy(() => import("./Route/home/GenrePage/GenrePage"));
//@ts-ignore
const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={rootHome}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Index></Index>}>
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
            <Route path="search/:s" element={<SearchPage />} />
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
