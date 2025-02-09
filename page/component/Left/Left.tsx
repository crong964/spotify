import Home from "@/page/Route/home/NaviHome/Home";
import { MobileSearchButtom } from "@/page/Route/home/NaviHome/SearchButtom";
import { RootHome } from "@/page/Route/home/RootRedux";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Libarary } from "@/page/component/libarary";
import NaviLoveSong from "@/page/Route/home/NaviHome/NaviLoveSong";
import PlaylistLike from "@/page/Route/home/NaviHome/PlaylistLike";
import { SetExtend } from "./LeftRedux";
import { post } from "@/page/config/req";

export default function Left() {
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const extend = useSelector((state: RootHome) => state.leftRedux.extend);
  const [key, SetKey] = useState(0);
  return (
    <nav
      title="left"
      className={`hidden a sm:block px-1 space-y-1 ${
        extend ? " w-[280px] " : " w-[80px] "
      }`}
    >
      <div className="h-[20%] bg-black rounded-t-xl p-0 sm:py-2">
        <div className="h-full  ">
          <Home />
          <MobileSearchButtom />
        </div>
      </div>
      {isLogin ? (
        <div className="relative h-[80%] overflow-y-auto bg-black rounded-b-xl pb-2 ">
          <div
            onClick={() => {
              post("/playlist/addplaylist", {}, (v: any) => {
                if (v.err) {
                  alert("tạo thất bại");
                } else {
                  alert("tạo thành công");
                  let key = Math.floor(Math.random() * 10);
                  SetKey(key);
                }
              });
            }}
            className="sticky z-20 top-0 bg-black"
          >
            <Libarary />
          </div>
          <NaviLoveSong />
          <PlaylistLike key={key} />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}
