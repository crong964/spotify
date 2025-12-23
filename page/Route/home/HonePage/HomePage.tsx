import React from "react";
import { Listenplaylist, SuggestPlaylist } from "@/page/component/Playlist";
import RecentList, {
  iRecentPlaylist,
} from "@/page/Route/home//Right/RecentPlaylist";
import { SetionList } from "@/page/Route/home/Setion";
import { get2, post2 } from "@/page/config/req";
import { useQuery } from "@tanstack/react-query";
import {
  CACHE_1_DAY,
  CACHE_5_DAY,
  FETCH_LISTENED_QUERY,
  NEXT_PLAYLIST_ARTIST_QUERY,
  NEXT_PLAYLIST_QUERY,
  RECENT_PLAYLIST_QUERY,
} from "@/page/contant/quey_key";
export default function HomePage() {
  const { data: fetchRecentPlaylist, isLoading: isloadingRecentPlaylist } =
    useQuery<iRecentPlaylist[]>({
      queryKey: [RECENT_PLAYLIST_QUERY],
      queryFn: async () => {
        const data = await post2("/recentPlaylist/getAll", {});
        if (data && data.ls) {
          return data.ls;
        }
        return [];
      },
      staleTime: CACHE_1_DAY,
    });

  const { data: fetchListenAgain, isLoading: isloadingListenAgain } =
    useQuery<number>({
      queryKey: [FETCH_LISTENED_QUERY],
      queryFn: async () => {
        const data = await get2("/recentSong/listenAgain");
        if (data && data.count != undefined) {
          let n = Math.floor(data.count / 50);
          let d = data.count - n * 50;
          if (d == 0) {
            return n;
          } else {
            return n + 1;
          }
        }
        return 0;
      },
      staleTime: CACHE_1_DAY,
    });

  const { data: fetchPlaylistArtist, isLoading: isloadingPlaylistArtist } =
    useQuery({
      queryKey: [NEXT_PLAYLIST_ARTIST_QUERY],
      queryFn: async () => {
        const data = await post2("/playlist/NextPlaylistArtist", {});
        if (data && data.ls) {
          return data.ls;
        }
        return [];
      },
      staleTime: CACHE_5_DAY,
    });

  const { data: fetchNextPlaylist, isLoading: isLoadingNextPlaylist } =
    useQuery({
      queryKey: [NEXT_PLAYLIST_QUERY],
      queryFn: async () => {
        const data = await post2("/playlist/Nextplaylist", {});
        if (data && data.ls) {
          return data.ls;
        }
        return [];
      },
      staleTime: CACHE_5_DAY,
    });
  return (
    <div className="h-full">
      {!isLoadingNextPlaylist &&
        !isloadingListenAgain &&
        !isloadingPlaylistArtist &&
        !isloadingRecentPlaylist && (
          <>
            <RecentList recentlists={fetchRecentPlaylist || []} />
            <Listenplaylist count={fetchListenAgain || 0} />
            <SetionList
              artists={fetchPlaylistArtist || []}
              link="section"
              name="Danh sách các nghệ sĩ"
              type="artist"
            />
            <SuggestPlaylist playlists={fetchNextPlaylist || []} />
          </>
        )}
    </div>
  );
}
