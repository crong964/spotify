import { post } from "@/page/config/req";
import React, { useState } from "react";

export default function CmdPage() {
  const [res, SetRes] = useState<string[]>([]);
  const [data, SetData] = useState("");
  const [his, SetHis] = useState<string[]>([]);
  const [pos, SetPos] = useState(-1);
  const Action = (f: number) => {
    let nPo = pos + f;
    SetPos(nPo);
    post("/admin/cmd/", { cmd: `ls ${his[nPo]}` }, (v: any) => {
      if (v) {
        SetRes(v.data);
      }
    });
  };
  const AddStack = (s: string) => {
    if (pos + 1 == his.length) {
      SetHis([...his, s]);
      SetPos(his.length);
      return;
    }
    let nHis = his.map((v) => {
      return v;
    });
    nHis[pos] = s;
    SetHis([...nHis]);
  };
  const ReSet = () => {};
  return (
    <div>
      <div className="flex space-x-3 items-center">
        <div>ls</div>
        <input
          placeholder="vị trí tới"
          onChange={(e) => {
            let v = e.currentTarget.value;
            SetData(v);
          }}
          value={data}
          contentEditable
          className="p-2 w-[400px] focus:outline-none border-2"
        />
        <button
          onClick={() => {
            AddStack(data);
            post("/admin/cmd/", { cmd: `ls ${data}` }, (v: any) => {
              if (v) {
                SetRes(v.data);
              }
            });
          }}
        >
          gửi
        </button>
      </div>
      <div className="p-2 text-center text-[50px] font-bold">dữ liệu</div>
      <div className="flex space-x-4 my-4">
        {pos > 0 ? (
          <button
            onClick={() => {
              Action(-1);
            }}
          >
            Back
          </button>
        ) : (
          <></>
        )}
        {pos < his.length - 1 ? (
          <button
            onClick={() => {
              Action(1);
            }}
          >
            Forward
          </button>
        ) : (
          <></>
        )}
        <div>số vị trí {pos}</div>
        <div>vị trí {his[pos]}</div>
      </div>
      <div className="h-[400px] overflow-y-auto">
        {res.map((v) => {
          return (
            <div className="grid grid-cols-2 space-y-3 hover:bg-slate-300">
              <div className="col-span-1">{v}</div>
              <div
                className="col-span-1 cursor-pointer"
                onClick={() => {
                  let va = `${his[pos]}${v}/`;
                  AddStack(va);
                  post("/admin/cmd/", { cmd: `ls ${va}` }, (v: any) => {
                    if (v) {
                      SetRes(v.data);
                      SetData(va);
                    }
                  });
                }}
              >
                Vào
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
