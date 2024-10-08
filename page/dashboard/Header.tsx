import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navi, NaviReduxDispatch, RootNaviRedux } from "./NaviRedux";

interface Text {
  children: React.JSX.Element;
}
function Text(d: Text) {
  return (
    <div className="text-[#6a6a6a] cursor-pointer hover:text-white">
      {d.children}
    </div>
  );
}
export default function Header() {
  const dispatch: NaviReduxDispatch = useDispatch();
  const page = useSelector((state: RootNaviRedux) => state.navi.page);
  const image = useSelector((state: RootNaviRedux) => state.navi.image);
  return (
    <div className="bg-black flex items-center text-white font-bold text-[14px] p-5">
      <div className="flex justify-start w-1/3 cursor-pointer ">
        <img src={image} className="size-9" alt="" />
      </div>
      <div className="flex justify-center space-x-4 w-1/3 cursor-pointer ">
        <Text>
          <div
            className={`${page == "home" ? "text-white" : ""}`}
            onClick={() => {
              dispatch(Navi("home"));
            }}
          >
            Trang chủ
          </div>
        </Text>
        <Text>
          <div
            className={`${page == "SongForm" ? "text-white" : ""}`}
            onClick={() => {
              dispatch(Navi("songlist"));
            }}
          >
            Bài hát
          </div>
        </Text>
      </div>
      <div className="flex justify-end space-x-4 w-1/3 cursor-pointer ">
        <Text>
          <div
            className={`${page == "SongForm" ? "text-white" : ""}`}
            onClick={() => {
              dispatch(Navi("songform"));
            }}
          >
            Thêm bài mới
          </div>
        </Text>
        <Text>
          <div>Cài đặt</div>
        </Text>
      </div>
    </div>
  );
}
