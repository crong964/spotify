import React, { useState } from "react";
import { Pop } from "@/page/component/pop";
import { useDispatch } from "react-redux";
import { NaviPage } from "@/page/Route/home/RootRedux";
import { Infor } from "./interface";
import { get } from "@/page/config/req";

export default function Avatar(p: Infor) {
  const [show, SetShow] = useState(false);
  const [xy, XY] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  return (
    <button className="relative cursor-pointer focus:outline-none">
      <div
        onClick={(e) => {
          SetShow(!show);
          let x = e.currentTarget.getBoundingClientRect().right;
          let y = e.currentTarget.getBoundingClientRect().bottom;
          XY({ x: x, y: y });
        }}
        className="text-[14px] "
      >
        <img
          className="size-[40px] rounded-full cursor-pointer"
          src={p.pathImage}
          alt=""
          srcSet=""
        />
      </div>
      {show ? (
        <Pop top={xy.y} left={xy.x - 200}>
          <div onMouseLeave={()=>{
            SetShow(false)
          }} className="bg-[#3E3E3E] rounded-lg min-w-[200px] text-[16px]  sm:right-0">
            <div className="text-white  cursor-pointer hover:bg-black">
              <div
                onClick={() => {
                  dispatch(NaviPage({ page: "profile", param: "" }));
                  SetShow(!show);
                }}
                className="p-2"
              >
                Tài khoản
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                SetShow(true);
                get("/auth/logout", (e: any) => {
                  window.location.replace("/auth");
                });
              }}
              className="text-white cursor-pointer hover:bg-black"
            >
              <div className="p-2">Đăng xuất </div>
            </div>
          </div>
        </Pop>
      ) : (
        <></>
      )}
    </button>
  );
}
