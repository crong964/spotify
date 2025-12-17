import React, { useEffect, useMemo, useState } from "react";
import { iTab } from "./interface";
import { Tab } from ".";

interface iTabsSelect {
  value: string;
  tabs: iTab[];
  onChange: (p: string) => void;
}
export default function TabsSelect({ onChange, value, tabs }: iTabsSelect) {
  const selected = useMemo(() => {
    let s = value.split(" ");
    let f: any = {};
    for (let i = 0; i < s.length; i++) {
      const element = s[i];
      f[element] = true;
    }
    return f;
  }, [value]);

  const selectedS = (v: any) => {
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
  if (!tabs) {
    return;
  }
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => {
          return (
            <Tab
              data-selected={selected[tab.id] == true}
              className="data-[selected=true]:bg-[#1FDC62] data-[selected=false]:bg-[#1A1A1A] cursor-pointer px-3 py-2 rounded-xl hover:scale-105 active:scale-95 duration-150"
              onClick={() => {
                if (selected[tab.id]) {
                  selected[tab.id] = false;
                } else {
                  selected[tab.id] = true;
                }
                onChange(selectedS(selected));
              }}
              id={tab.id + 1}
              key={tab.id}
              nameTab={tab.nameTab}
            />
          );
        })}
      </div>
    </>
  );
}
