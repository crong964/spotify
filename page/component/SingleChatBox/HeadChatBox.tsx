import { NaviPage } from "@/page/Route/home/RootRedux";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface boxChat {
    pathImage: string;
    Name: string;
    idBox: string;
    id: string; // id người gửi cuối
    type: string;
    permission: number;
    idUser: string; //id bạn của bạn
  }
export function HeadChatBox(data: boxChat) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  return (
    <div className="pl-0 sm:pl-2 h-[100px] sm:h-[44px] py-0 sm:py-2 flex bg-black cursor-pointer items-center justify-between">
      <div
        onClick={() => {
          dispatch(NaviPage({ page: "artist", param: data.id }));
        }}
        className="flex items-center"
      >
        <div className="overflow-hidden size-16 sm:size-[32px] rounded-full mr-3">
          <img className="" src={data.pathImage} alt="" srcSet="" />
        </div>
        <div className="w-max px-3 font-sans">
          <div className="text-[20px]">{data.Name}</div>
        </div>
      </div>
      <div
        onClick={() => {
          navigate(`/mobile/chatbox`);
        }}
      >
        Thoát
      </div>
    </div>
  );
}
