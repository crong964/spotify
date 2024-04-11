import React, { useEffect, useMemo, useState } from "react";
import { post } from "../../config/req";
import { useDispatch } from "react-redux";
import { SetBoxList } from "../RootRedux";

interface handle {
  idBox: string;
  mess: string;
  curIdbox: string;
}
interface Button {
  onClick(): void;
  text: string;
  children: React.JSX.Element;
}
interface BoxButton {
  show: boolean;
  idBox: string;
  SetShow(d: boolean): void;
}
interface boxdata {
  idBox: string;
  idUser: number;
  Name: string;
  pathImage: string;
  imagebox: string;
  boxtype: number;
  id: number;
  content: string;
  messType: string;
  status: number;
}

function useBoxList() {
  const [data, SetData] = useState<boxdata[]>([]);

  useEffect(() => {
    post("box/", {}, (v: any) => {
      SetData(v.ls);
    });
  }, []);

  function ReadBox(idbox: string) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (idbox == element.idBox) {
        element.status = 1;
        break;
      }
    }
    SetData([...data]);
  }
  function ReceiveMess(idBox: string, mess: string, curIdbox: string) {
    var tempLs: boxdata[] = [];
    var box: boxdata | undefined = undefined,
      curBox: boxdata | undefined = undefined;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.idBox == idBox && idBox != curIdbox) {
        box = element;
        box.status = 2;
        continue;
      }
      if (element.idBox == curIdbox) {
        curBox = element;
        curBox.status = 1;
        continue;
      }
      tempLs.push(element);
    }
    if (idBox == curIdbox && curBox) {
      SetData([curBox, ...tempLs]);
      return;
    }
    if (box && !curBox) {
      SetData([box, ...tempLs]);
      return;
    }
    if (box && curBox) {
      SetData([curBox, box, ...tempLs]);
      return;
    }
  }
  return {
    data,
    ReceiveMess,
    ReadBox,
  };
}

function Button(d: Button) {
  return (
    <div
      className="w-full flex bg-black hover:bg-[#2A2A2A] font-mono p-2 justify-around cursor-pointer"
      onClick={d.onClick}
    >
      {d.children}
      <div>{d.text}</div>
    </div>
  );
}
function BoxButton(params: BoxButton) {
  switch (params.show) {
    case true:
      return (
        <div className="flex flex-col absolute top-1/3 min-w-[70%] right-8">
          <div className=" bg-black z-10 p-3 rounded-lg flex flex-col">
            <Button onClick={() => {}} text="Ẩn thông báo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </Button>
            <Button
              text="Xóa hộp thoại"
              onClick={() => {
                post(
                  "/box/hiddenBoxChat",
                  {
                    idBox: params.idBox,
                  },
                  (n: any) => {
                    alert(n.mess);
                    params.SetShow(false);
                    (
                      document.querySelector(
                        `.BOX${params.idBox}`
                      ) as HTMLElement
                    ).classList.add("hidden");
                  }
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </Button>
          </div>
        </div>
      );
    default:
      return <></>;
  }
}

function useBoxData() {
  const [show, SetShow] = useState(false);

  return { show, SetShow };
}

function BoxData(data: boxdata) {
  const va = useBoxData();
  const [bubble, SetBudbble] = useState(false);
  const dispatch = useDispatch();
  var status = ["", "", "font-bold"];
  // Seen = "1",
  // Unread = "2"
  return (
    <div
      onMouseEnter={() => {
        SetBudbble(true);
      }}
      onMouseLeave={() => {
        SetBudbble(false);
      }}
      className={`relative BOX${data.idBox}`}
      title={`BOX${data.idBox}`}
    >
      <div
        onClick={() => {
          dispatch(SetBoxList(data.idBox));
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
          <div className={`text-xs line-clamp-1 ${status[data.status]}`}>
            {data.id == data.idUser ? "Bạn " : ""}
            {data.content}
          </div>
        </div>
        {data.status == 2 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 hover:fill-blue-500"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
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
export default function BoxListData(p: handle) {
  const { data, ReceiveMess } = useBoxList();

  useEffect(() => {
    ReceiveMess(p.idBox, p.mess, p.curIdbox);
  }, [p.idBox, p.mess]);

  var list = data.map((v) => {
    return (
      <BoxData
        imagebox=""
        messType=""
        status={0}
        pathImage={v.pathImage}
        boxtype={v.boxtype}
        content={v.content}
        id={0}
        idUser={v.idUser}
        Name={v.Name}
        key=""
        idBox={v.idBox}
      />
    );
  });

  return <>{list}</>;
}
