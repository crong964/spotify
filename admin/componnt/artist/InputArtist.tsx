import { useCallback, useEffect, useRef, useState } from "react";
import { post } from "@/page/config/req";
import React from "react";
import { iInputArtist } from "./interface";
type singer = {
  id: string;
  ChanalName: string;
  pathImage: string;
};
function useSelectedArtist() {
  const [singers, Setsingers] = useState<singer[]>([]);
  const [SelectedSingers, SetSelectedSingers] = useState<singer[]>([]);
  const [p, SetP] = useState("");

  useEffect(() => {
    if (p == "") {
      Setsingers([]);
      return 
    }
    let s = setTimeout(() => {
      post("/search/NameArtist", { name: p }, (v: any) => {
        if (v && v.err != undefined && !v.err) {
          Setsingers(v.ls);
        }
      });
    }, 1000);
    return () => {
      clearTimeout(s);
    };

  }, [p]);
  return { singers, SelectedSingers, SetSelectedSingers, SetP, Setsingers };
}

export default function InputArtist(p: iInputArtist) {
  const name = useRef<HTMLInputElement>(null);
  const data = useSelectedArtist();
  p.onChange(data.SelectedSingers);

  return (
    <>
      <div>Ca sĩ </div>
      {data.SelectedSingers.length > 0 ? (
        <div className="w-full">
          {data.SelectedSingers.map((v) => {
            return (
              <div
                key={v.id}
                className="flex items-center space-x-4 my-2 p-2 cursor-pointer"
                onClick={() => {
                  if (!confirm("bạn muốn xóa không")) {
                    return;
                  }
                  data.SetSelectedSingers([
                    ...data.SelectedSingers.filter((d) => {
                      return v.id != d.id;
                    }),
                  ]);
                }}
              >
                <img
                  src={v.pathImage}
                  alt=""
                  className="size-[3.6rem] rounded-full"
                />
                <div>{v.ChanalName}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      <div className="relative flex">
        <input
          ref={name}
          onChange={(e) => {
            let v = e.currentTarget.value;
            if (v.length < 0) {
              return;
            }
            data.SetP(e.currentTarget.value);
          }}
          type="text"
          className="rounded-lg p-2 flex-1 focus:outline-none"
        />

        {data.singers.length > 0 ? (
          <div className="absolute top-full left-0 bg-black overflow-y-scroll text-white h-[300px] w-full">
            {data.singers.map((v) => {
              return (
                <div
                  key={v.id}
                  className="flex items-center space-x-4 my-2 p-2 hover:bg-[#222222] cursor-pointer"
                  onClick={() => {
                    data.SetSelectedSingers([
                      ...data.SelectedSingers,
                      {
                        ChanalName: v.ChanalName,
                        id: v.id,
                        pathImage: v.pathImage,
                      },
                    ]);
                    data.Setsingers([]);
                    if (name.current != null) {
                      name.current.value = "";
                    }
                  }}
                >
                  <img
                    src={v.pathImage}
                    alt=""
                    className="size-[3.6rem] rounded-full"
                  />
                  <div>{v.ChanalName}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {name.current != null && name.current.value.length > 0 ? (
              <button
                onClick={() => {
                  post(
                    "/admin/artist/addQickly",
                    {
                      Name: name.current?.value,
                      ChanalName: name.current?.value,
                    },
                    (v: any) => {
                      if (v && v.data) {
                        data.SetSelectedSingers([
                          ...data.SelectedSingers,
                          v.data,
                        ]);
                      }
                    }
                  );
                }}
                className="px-3 py-1 bg-blue-400 hover:bg-blue-500"
              >
                Thêm
              </button>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
}
