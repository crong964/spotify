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

import {
  CenterShare,
  ChangePassword,
  CreateAccount,
  Forgot,
  SignIn,
  Signup,
} from "@/page/Route/auth/Index";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import SearchPage from "./Route/home/SearchPage/SearchPage";
import SongListPage from "./Route/home/SongListPage/SongListPage";
import { QueryClient } from "@tanstack/react-query";
import HomePage from "./Route/home/HonePage/HomePage";

const PlaylistLike = React.lazy(
  () => import("./Route/home/NaviHome/PlaylistLike")
);

const ArtistsListPageMobile = React.lazy(
  () => import("./Route/mobile/ArtistsListPage/ArtistsListPageMobile")
);
const PlayListSectionPage = React.lazy(
  () => import("./Route/home/PlayListPage/PlayListSectionPage")
);
const MixPage = React.lazy(() => import("./Route/home/Mix/MixPage"));

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

const IdGenre = React.lazy(() => import("./Route/home/GenrePage/IdGenre"));
const Genre = React.lazy(() => import("./Route/home/GenrePage/GenrePage"));
//@ts-ignore
const root = createRoot(document.getElementById("root"));
const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});
root.render(
  <BrowserRouter>
    <PersistQueryClientProvider
      persistOptions={{ persister: persister }}
      client={queryClient}
    >
      <Provider store={rootHome}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route index element={<HomePage />} />
              <Route path="genre" element={<Suspense children={<Outlet />} />}>
                <Route path=":id" element={<IdGenre />} />
                <Route index element={<Genre />} />
              </Route>
              <Route path="playlist/:id" element={<PlaylistPage />} />
              <Route path="mix/:id" element={<MixPage />} />
              <Route path="songlist/" element={<SongListPage />} />
              <Route path="likedsongs" element={<LikedSongListPage />} />
              <Route path="artist/:id" element={<SingleArtistPage />} />
              <Route path="search/:query" element={<SearchPage />} />
              <Route path="section" element={<ArtistsListPage />} />

              <Route
                path="PlayListSectionPage"
                element={<PlayListSectionPage />}
              />
              <Route path="mobile">
                <Route path="playlist" element={<></>} />
                <Route path="chatbox" element={<></>} />
                <Route path="singlebox/:idbox" element={<></>} />
                <Route path="library" element={<PlaylistLike />} />
                <Route
                  path="ArtistsListPage"
                  element={<ArtistsListPageMobile />}
                />
              </Route>
            </Route>
            <Route path="auth" element={<CenterShare />}>
              <Route index element={<SignIn />} />
              <Route path="CreateAccount" element={<CreateAccount />} />
              <Route path="Signup" element={<Signup />} />
              <Route path="Forgot" element={<Forgot />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
            </Route>
            <Route path="*" element={<Navigate replace to="" />} />
          </Routes>
        </Suspense>
      </Provider>
    </PersistQueryClientProvider>
  </BrowserRouter>
);
