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

const Index = React.lazy(() => import("./Route/IndexHome2"));

import { SetionList } from "./Route/home/Setion";
import { Listenplaylist, SuggestPlaylist } from "@/page/component/Playlist";

import {
  CenterShare,
  ChangePassword,
  CreateAccount,
  Forgot,
  SignIn,
  Signup,
} from "@/page/Route/auth/Index";

import SearchPage from "./Route/home/SearchPage/SearchPage";

const PlaylistLike = React.lazy(() => import("./Route/home/NaviHome/PlaylistLike"));

const ArtistsListPageMobile = React.lazy(() => import("./Route/mobile/ArtistsListPage/ArtistsListPageMobile"))
const PlayListSectionPage = React.lazy(() => import("./Route/home/PlayListPage/PlayListSectionPage"))
const MixPage = React.lazy(
  () => import("./Route/home/Mix/MixPage")
);


const SingleArtistPage = React.lazy(
  () => import("./Route/home/SingleArtistPage/SingleArtistPage")
);
const PlaylistPage = React.lazy(
  () => import("./Route/home/PlayListPage/PlayListPage")
);
const LikedSongListPage = React.lazy(
  () => import("./Route/home/LikedSongListPage/LikedSongListPage")
);

const ArtistsListPage = React.lazy(
  () => import("./Route/home/ArtistsListPage/ArtistsListPage")
);
const RecentList = React.lazy(
  () => import("./Route/home/Right/RecentPlaylist")
);
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
                  <Listenplaylist />
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
            <Route path="mix/:id" element={<MixPage />} />
            <Route path="likedsongs" element={<LikedSongListPage />} />
            <Route path="artist/:id" element={<SingleArtistPage />} />
            <Route path="search/:s" element={<SearchPage />} />
            <Route path="section" element={<ArtistsListPage />} />
            <Route
              path="PlayListSectionPage"
              element={<PlayListSectionPage />}
            />
            <Route path="mobile">
              <Route path="playlist" element={<></>} />
              <Route path="chatbox" element={<></>} />
              <Route path="singlebox/:idbox" element={<></>} />
              <Route path="library" element={<PlaylistLike></PlaylistLike>} />
              <Route
                path="ArtistsListPage"
                element={<ArtistsListPageMobile></ArtistsListPageMobile>}
              />
            </Route>
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
