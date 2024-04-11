import React, { useEffect, useState } from "react";
import SingleMess, { singleMess } from "../Mess/SingleMess";
import { post } from "../../config/req";
import { useDispatch } from "react-redux";
import { NaviPage, RemoveBoxList } from "../RootRedux";
import { socket } from "../../socket/Socket";

interface BoxInfor {
  idbox: string;
}
interface boxChat {
  pathImage: string;
  Name: string;
  idBox: string;
  id: string;
  type: string;
  permission: number;
  idUser: string;
}
interface SendMessData {
  idbox: string;
}

function sendMess() {}

function useChatBox(boxInfor: BoxInfor) {
  const [listMess, setListMess] = useState<singleMess[]>([]);
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
  const [load, setLoad] = useState(false);
  const [now, setNow] = useState("");

  useEffect(() => {
    var url = "mess/GetAllMessInbox";
    post(url, { idBox: boxInfor.idbox }, (v: any) => {
      SetBoxChatData(v.infor);
      console.log(v.infor);

      setListMess((v.mess as []).reverse());
    });
  }, []);

  useEffect(() => {
    function Receive(p: any) {
      p.pathImage = boxChatData.pathImage;

      setListMess([...listMess, p]);
    }
    socket.on(boxInfor.idbox, Receive);
    return () => {
      socket.off(boxInfor.idbox, Receive);
    };
  }, [listMess, boxChatData]);

  function SetParamester() {
    post(
      "mess/getContentSCroll",
      { idFriend: boxChatData.id, idBox: boxChatData.idBox, now: now },
      (v: any) => {
        setListMess([...(v.listMess as []).reverse(), ...listMess]);
        setNow(v.now);
        setLoad(false);
        SetScrollStatus("up");
      }
    );
    setLoad(true);
  }

  function Set(type: "AddMyMessIntoListMess", value: any) {
    switch (type) {
      case "AddMyMessIntoListMess":
        var temp: singleMess | any = {
          avatar: "",
          content: value,
          idCurrent: boxChatData.id,
          type: "0",
          idMess: "",
          idUser: boxChatData.id,
          idUser2: boxChatData.id,
          ngay: "",
        };

        setListMess([...listMess, temp]);
        SetScrollStatus("down");

        break;
    }
  }
  return {
    listMess,
    boxChatData,
    now,
    load,
    scroll,
    scrollStatus,
    SetParamester,
    SetScroll,
    SetScrollStatus,
    setListMess,
    Set,
  };
}

function SendMess(data: SendMessData) {
  const [text, SetText] = useState("");
  return (
    <div className="chat">
      <div className="flex p-2 ">
        <input
          type="text"
          placeholder="Aa"
          className="focus:outline-none  mess w-11/12 bg-black rounded-lg border-0 "
          value={text}
          onChange={(inputData) => {
            SetText(inputData.currentTarget.value);
          }}
        />
        <button
          className="bg-white rounded-full p-1"
          onClick={() => {
            if (text.length <= 0) {
              return;
            }
            //         idBox: string;
            // idUser: string;
            // content: string;

            post(
              "/mess/send",
              {
                idBox: data.idbox,
                content: text,
              },
              (v: any) => {
                SetText("");
              }
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-black hover:fill-blue-600"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function HeadChatBox(data: boxChat) {
  const dispatch = useDispatch();
  return (
    <div className="pl-2 h-[44px] py-2 flex bg-black cursor-pointer items-center justify-between">
      <div
        onClick={() => {
          dispatch(NaviPage({ page: "artise", param: data.id }));
        }}
        className="flex items-center"
      >
        <div className="overflow-hidden size-[32px] rounded-full mr-3">
          <img className="" src={data.pathImage} alt="" srcSet="" />
        </div>
        <div className="w-max px-3 font-sans">
          <div className="">{data.Name}</div>
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(RemoveBoxList(data.idBox));
        }}
      >
        Xóa
      </div>
    </div>
  );
}

export default function ChatBox(boxInfor: BoxInfor) {
  //mess/getAllContent

  const {
    SetParamester,
    SetScroll,
    listMess,
    boxChatData,
    load,
    now,
    scroll,
    scrollStatus,
  } = useChatBox(boxInfor);

  useEffect(() => {
    var f = document.querySelector(".boxscroll") as HTMLElement;

    if (f) {
      var y1 = scroll;

      var y2 = f.scrollHeight;

      if (scrollStatus == "up") {
        f.scrollTo({
          behavior: "auto",
          top: y2 - y1,
        });
      } else {
        f.scrollTo({
          behavior: "auto",
          top: y2,
        });
      }
      SetScroll(f.scrollHeight);
    }
  }, [listMess]);

  var idFuture;
  var id = "";
  if (boxChatData.id.length > 0) {
    id = boxChatData.id;
  }

  var list = listMess.map((v, i) => {
    idFuture = listMess[i + 1] ? listMess[i + 1].idUser : undefined;
    var s = (
      <SingleMess
        avatar={boxChatData.pathImage}
        content={v.content}
        idFuture={idFuture}
        ngay={v.ngay}
        type={v.type}
        idMess={v.idMess}
        idUser={v.idUser}
        idUser2={boxChatData.idUser}// my id
        key={v.idMess}
      />
    );
    return s;
  });

  return boxInfor.idbox != "-1" ? (
    <div className=" boxchat w-[300px] rounded-lg h-[400px] border border-white">
      {boxChatData ? (
        <>
          <HeadChatBox
            idUser=""
            pathImage={boxChatData.pathImage}
            Name={boxChatData.Name}
            idBox={boxChatData.idBox}
            id={boxChatData.id}
            type={boxChatData.type}
            permission={boxChatData.permission}
          />
          <div className=" bg-black  h-[300px] w-full border-y-2 grid grid-cols-1 content-end py-2">
            <div
              className=" overflow-x-hidden overflow-y-scroll boxscroll"
              onScroll={(r) => {
                if (load) {
                  return;
                }

                if (r.currentTarget.scrollTop == 0) {
                  if (now == "-1") {
                    return;
                  }
                  SetParamester();
                }
              }}
            >
              {list}
            </div>
          </div>
          <SendMess idbox={boxChatData.idBox} />
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}
