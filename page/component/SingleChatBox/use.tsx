import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { singleMess } from "../Mess/SingleMess";
import { boxChat } from "./interface";
import { RootHome, SetMess } from "@/page/Route/home/RootRedux";
import { post } from "@/page/config/req";

interface BoxInfor {
    idbox: string;
  }
export function useChatBox(boxInfor: BoxInfor) {
  const dcp = useDispatch();
  const [listMess, SetListMess] = useState<singleMess[]>([]);
  const [boxChatData, SetBoxChatData] = useState<boxChat>({
    idBox: boxInfor.idbox,
    id: "",
    Name: "",
    pathImage: "",
    permission: 0,
    type: "",
    idUser: "",
  });
  const [scroll, SetScroll] = useState(0);
  const [scrollStatus, SetScrollStatus] = useState<"up" | "down">("down");
  const [load, SetLoad] = useState(false);
  const [now, SetNow] = useState("");
  const mess = useSelector((state: RootHome) => state.rootHome.mess);

  useEffect(() => {
    var url = "/mess/GetAllMessInbox";
    post(url, { idBox: boxInfor.idbox }, (v: any) => {
      SetBoxChatData(v.infor);
      SetListMess([...(v.mess as []).reverse()]);
      SetNow(v.now);
    });
  }, []);

  useEffect(() => {
    if (
      mess.idBox == boxChatData.idBox &&
      mess.idBox != "" &&
      mess.content != ""
    ) {
      SetListMess([...listMess, mess as any]);
      SetScrollStatus("down");
      // data.idUser  là bạn bè
      dcp(
        SetMess({
          idBox: "",
          content: "",
          idMess: "",
          idUser: "",
          ngay: "",
          type: "",
        })
      );
    }
  }, [listMess, mess]);
  function SetParamester() {
    post(
      "/mess/NextMessList",
      { idFriend: boxChatData.id, idBox: boxChatData.idBox, now: now },
      (v: any) => {
        SetListMess([...(v.ls as []).reverse(), ...listMess]);
        SetNow(v.now);
        SetLoad(false);
        SetScrollStatus("up");
      }
    );
    SetLoad(true);
  }

  return {
    listMess,
    boxChatData,
    now,
    load,
    scroll,
    scrollStatus,
    mess,
    SetParamester,
    SetScroll,
    SetScrollStatus,
    SetListMess,
  };
}
