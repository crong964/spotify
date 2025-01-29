import React, { useEffect, useMemo, useState } from "react";
import { iTab, iTabs } from "./interface";
import { Tab } from "./Index";
import { post } from "@/page/config/req";

export default function Tabs(p: iTabs) {
  const [tabs, SetTabs] = useState<iTab[]>([]);
  const [nameTab, SetNameTab] = useState("");
  useEffect(() => {
    post("/admin/tab/getall", {}, (v: any) => {
      SetTabs(v.ls);
    });
  }, []);

  const selected = useMemo(() => {
    let s = p.value.split(" ");
    let f: any = {};
    for (let i = 0; i < s.length; i++) {
      const element = s[i];
      f[element] = true;
    }
    return f;
  }, [p.value]);

  const value = (v: any) => {
    let s = "";
    for (const key in v) {
      if (Object.prototype.hasOwnProperty.call(v, key)) {
        const element = v[key];
        if (element) {
          s += `${key} `;
        }
      }
      
    }
    return s.trim();
  };

  return (
    <>
      <div className="flex items-center">
        <span className="pl-2">Thêm Tab</span>
        <input
          onChange={(v) => {
            let nameTab = v.currentTarget.value;
            SetNameTab(nameTab);
          }}
          className="flex-1 focus:outline-none p-2"
          type="text"
          value={nameTab}
        />
        <button
          className=""
          onClick={() => {
            post("/admin/tab/add", { nameTab: nameTab }, (v: any) => {
              SetTabs(v.ls);
            });
          }}
        >
          Thêm mới
        </button>
      </div>
      <div className="flex flex-wrap">
        {tabs.map((v) => {
          return selected[v.id] == true ? (
            <Tab
              className="w-max text-white bg-red-400 px-1 py-0.5 mx-1 border-black cursor-pointer"
              onClick={() => {
                selected[v.id] = undefined;
                p.onchange(value(selected));
              }}
              id={v.id}
              key={v.id}
              nameTab={v.nameTab}
            />
          ) : (
            <Tab
              className="w-max text-black px-1 py-0.5 mx-1 border-black cursor-pointer"
              onClick={() => {
                selected[v.id] = true;
                p.onchange(value(selected));
              }}
              id={v.id}
              key={v.id}
              nameTab={v.nameTab}
            />
          );
        })}
      </div>
    </>
  );
}
