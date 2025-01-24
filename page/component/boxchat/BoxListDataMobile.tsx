import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "@/page/Route/home/RootRedux";
import { BoxButton } from "./BoxButton";
import { TypeMess } from "./TypeMess";
import { boxdata, lastmess } from "./Interface";
import { useBoxList } from "./use";
import { useNavigate } from "react-router-dom";

function useBoxData() {
  const [show, SetShow] = useState(false);

  return { show, SetShow };
}

function BoxData(data: boxdata) {
  const mess = useSelector((state: RootHome) => state.rootHome.mess);
  let navigate = useNavigate();
  const va = useBoxData();
  const [bubble, SetBudbble] = useState(false);
  const [watch, SetWatch] = useState(true);
  const [lastMess, SetLastMess] = useState<lastmess>({
    content: data.content,
    idBox: data.idBox,
    idMess: "",
    idUser: data.idUser,
    type: data.messType,
  });

  var status = ["", "", "font-bold"];
  useEffect(() => {
    if (data.status == 2) {
      SetWatch(false);
    }
  }, []);
  useEffect(() => {
    if (mess.idBox == "") {
      return;
    }

    if (mess.idBox == data.idBox) {
      if (mess.content.length > 0) {
        SetLastMess(mess);
      }
      if (mess.idUser == data.idUser) {
        SetWatch(false);
      } else {
        SetWatch(true);
      }
    }
  }, [mess, watch]);
  return (
    <div
      onMouseEnter={() => {
        SetBudbble(true);
      }}
      onMouseLeave={() => {
        SetBudbble(false);
      }}
      className={`relative BOX${data.idBox}`}
    >
      <div
        onClick={() => {
          navigate(`/mobile/singlebox/${data.idBox}`);
        }}
        className="px-2 h-18 py-3 flex items-center hover:bg-[#2A2A2A] cursor-pointer"
      >
        <input type="hidden" id="avatar" value="<%=element.avatar %>" />
        <input type="hidden" id="name" value="<%=element.nameUser %>" />
        <div className="overflow-hidden w-14 h-14 rounded-full mr-3">
          <img src={data.pathImage} alt="" />
        </div>
        <div className="w-3/5 px-3 font-sans">
          <div className="">{data.Name}</div>
          <div
            className={`text-xs line-clamp-1 flex space-x-3 ${
              status[data.status]
            }`}
          >
            {lastMess.idUser == data.idUser ? " " : <div>Bạn</div>}
            <TypeMess content={lastMess.content} type={lastMess.type} />
          </div>
        </div>
        {watch == false ? (
          <span className="relative flex size-6 justify-center items-center">
            <span className="animate-ping absolute h-full w-full rounded-full bg-[#1ED760] opacity-75"></span>
            <span className=" rounded-full h-3 w-3 bg-[#1ED760]"></span>
          </span>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`absolute right-2 top-1/3  p-2 rounded-full ${
          bubble ? "bg-black" : ""
        }`}
        onClick={() => {
          va.SetShow(!va.show);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="fill-white cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </div>
      <BoxButton idBox={data.idBox} show={va.show} SetShow={va.SetShow} />
    </div>
  );
}
export default function BoxListData() {
  const { data } = useBoxList();

  var list = data.map((v, i) => {
    return (
      <BoxData
        imagebox=""
        messType={v.messType}
        status={v.status}
        pathImage={v.pathImage}
        boxtype={v.boxtype}
        content={v.content}
        id={v.id}
        idUser={v.idUser}
        Name={v.Name}
        key={v.idBox}
        idBox={v.idBox}
      />
    );
  });

  return <>{list}</>;
}
