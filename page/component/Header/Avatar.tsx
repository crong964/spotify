import React, { useState } from "react";
import { Pop } from "@/page/component/pop";
import { useDispatch } from "react-redux";
import { NaviPage } from "@/page/Route/home/RootRedux";
import { Infor } from "./interface";
import { get } from "@/page/config/req";
import { AvatarIcon } from "@/icon/Icon";
import CalcXY from "../pop/CalcXY";
import Modal from "../pop/Modal";

export default function Avatar(p: Infor) {
  const [show, SetShow] = useState(false);
  const [xy, XY] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  return (
    <button className="relative cursor-pointer focus:outline-none">
      <div
        onClick={(e) => {
          SetShow(!show);

          let xy = CalcXY({
            wE: 200,
            hE: 100,
            dom: e.currentTarget.getBoundingClientRect(),
          });

          XY(xy);
        }}
        className="text-[14px] "
      >
        {p.pathImage == "" ? (
          <div className="bg-[#2A2A2A] p-2 rounded-2xl">
            <AvatarIcon className="size-[20px] fill-white" />
          </div>
        ) : (
          <img
            className="size-[40px] rounded-full cursor-pointer"
            src={p.pathImage}
            alt=""
            srcSet=""
          />
        )}
      </div>
      {show ? (
        <Modal
          top={xy.y}
          left={xy.x}
          show={() => {
            SetShow(false);
          }}
        >
          <div className="bg-[#3E3E3E] rounded-lg min-w-[200px] text-[16px]">
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
        </Modal>
      ) : (
        <></>
      )}
    </button>
  );
}
