import { useEffect } from "react";
import { BoxInfor } from "./interface";
import { useChatBox } from "./use";
import SingleMess from "../Mess/SingleMess";
import React from "react";
import { HeadChatBox } from "./HeadChatBox";
import { post } from "@/page/config/req";
import { SendMess } from "./SendMess";

export default function SingleChatBox(boxInfor: BoxInfor) {
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
  async function SetList() {
    var f = document.querySelector(
      `.boxscroll${boxChatData.idBox}`
    ) as HTMLElement;

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
  }
  useEffect(() => {
    SetList();
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
        idUser2={boxChatData.idUser} // my id
        key={v.idMess}
      />
    );
    return s;
  });

  return boxInfor.idbox != "-1" ? (
    <div
      title={boxInfor.idbox}
      className=" boxchat w-full h-full flex flex-col sm:w-[300px] sm:h-[400px] rounded-lg  border border-white"
    >
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
          <div className=" bg-black h-[calc(100%-15%-100px);] sm:h-[300px] w-full border-y-2 grid grid-cols-1 content-end">
            <div
              className={`overflow-x-hidden  overflow-y-scroll boxscroll${boxChatData.idBox}`}
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
            <div className="p-2">
              <label htmlFor={`file${boxChatData.idBox}`}>
                <input
                  multiple
                  onChange={(v) => {
                    var files = v.currentTarget.files;
                    if (files == undefined) {
                      return;
                    }
                    var fo = new FormData();
                    for (let i = 0; i < files.length; i++) {
                      const element = files[i];
                      fo.append("image", element);
                    }
                    fo.set("idbox", boxInfor.idbox);
                    post("/mess/image", fo, () => {});
                  }}
                  type="file"
                  className="hidden"
                  id={`file${boxChatData.idBox}`}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-[20px] cursor-pointer fill-white hover:fill-[#1FDF64]"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
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
