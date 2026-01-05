import Home from "@/page/Route/home/NaviHome/Home";
import { MobileSearchButtom } from "@/page/Route/home/NaviHome/SearchButtom";
import { RootHome } from "@/page/Redux/RootRedux";
import React from "react";
import {  useSelector } from "react-redux";
import { Libarary } from "@/page/component/libarary";
import NaviLoveSong from "@/page/Route/home/NaviHome/NaviLoveSong";
import PlaylistLike from "@/page/Route/home/NaviHome/PlaylistLike";
import {  post2 } from "@/page/config/req";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/page/App";
import { LIKE_PLAYLIST_QUERY } from "@/page/contant/quey_key";

export default function Left() {
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );

  const { mutate: createplaylist } = useMutation({
    mutationFn: async () => {
      const data = await post2("/playlist/addplaylist", {});
      if (data) {
        return data;
      } else {
        return undefined;
      }
    },
    onSuccess: (result) => {
      if (!result) {
        alert("Thất bại");
        return;
      }

      if (!result.err) {
        alert("thành công");
        queryClient.invalidateQueries({
          queryKey: [LIKE_PLAYLIST_QUERY],
        });
      }
    },
  });

  return (
    <nav title="left" className="hidden a sm:block px-1 space-y-1  w-[80px] ">
      <div className="h-[20%] bg-black rounded-t-xl p-0 sm:py-2">
        <div className="h-full  ">
          <Home />
          <MobileSearchButtom />
        </div>
      </div>
      {isLogin && (
        <div className="relative h-[80%] overflow-y-auto bg-black rounded-b-xl pb-2 ">
          <div
            onClick={() => {
              createplaylist();
            }}
            className="sticky z-20 top-0 bg-black"
          >
            <Libarary />
          </div>

          <NaviLoveSong />
          <PlaylistLike />
        </div>
      )}
    </nav>
  );
}
