import { LibraryIcon } from "@/icon/Icon";
import { post } from "@/page/config/req";
import React, { useState } from "react";
import { Pop } from "@/page/component/pop";
import { useSelector } from "react-redux";
import { RootHome } from "@/page/Route/home/RootRedux";

export default function Libarary() {
  const [pop, SetPop] = useState(false);
  const mobiletype = useSelector(
    (state: RootHome) => state.rootHome.devicetype
  );
  const [top, SetTop] = useState(0);
  return (
    <div
      className="p-3 flex justify-center items-center"
      onClick={() => {
        post("/playlist/addplaylist", {}, (v: any) => {
          if (v.err) {
            alert("tạo thất bại");
          }
          else{
            alert("tạo thành công");
          }
        });
      }}
      onMouseMove={(ev) => {
        SetPop(true);
        let top = ev.currentTarget.getBoundingClientRect().top;
        SetTop(Math.floor(top));
      }}
      onMouseLeave={(ev) => {
        SetPop(false);
      }}
    >
      <LibraryIcon className="size-6  fill-white" />
      {pop && mobiletype == "pc" ? (
        <Pop left={80} top={top}>
          <div className="bg-[#434242] p-2 rounded-lg">
            <div className="text-base text-white">Thêm danh sách phát</div>
          </div>
        </Pop>
      ) : (
        <></>
      )}
    </div>
  );
}
