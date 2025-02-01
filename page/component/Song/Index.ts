import React from "react";

export const Song = React.lazy(() => import("./Song"));
export const SongInPlayList = React.lazy(() => import("./SongInPlayList"));
export const SongList = React.lazy(() => import("./SongList"));
export const RecommendedSong = React.lazy(() => import("./RecommendedSong"));