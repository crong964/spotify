import { Fragment, useEffect, useRef, useState } from "react";
import { post } from "@/page/config/req";
import React from "react";
import { iInputArtist, singer } from "./interface";
import ImagePath from "@/page/config/img";

function useSelectedArtist() {
  const [singers, setsingers] = useState<singer[]>([]);
  const [SelectedSingers, setSelectedSingers] = useState<singer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search == "") {
      setsingers([]);
      return;
    }
    let s = setTimeout(() => {
      post("/search/NameArtist", { name: search }, (v: any) => {
        if (v && v.err != undefined && !v.err) {
          setsingers(v.ls);
        }
      });
    }, 200);
    return () => {
      clearTimeout(s);
    };
  }, [search]);
  return {
    singers,
    SelectedSingers,
    setSelectedSingers,
    setSearch,
    setsingers,
  };
}

export default function InputArtist({ onChange, singers }: iInputArtist) {
  const name = useRef<HTMLInputElement>(null);
  const data = useSelectedArtist();
  onChange(data.SelectedSingers);
  useEffect(() => {
    if (!singers) {
      return;
    }
    data.setSelectedSingers(singers);
    return () => {};
  }, [singers]);
  return (
    <Fragment>
      
      <div>Ca sĩ </div>
      {data.SelectedSingers.length > 0 && (
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
                  data.setSelectedSingers([
                    ...data.SelectedSingers.filter((d) => {
                      return v.id != d.id;
                    }),
                  ]);
                }}
              >
                <img
                  src={ImagePath(v.pathImage)}
                  alt=""
                  className="size-[3.6rem] rounded-full"
                />
                <p>{v.ChanalName}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="relative flex">
        <input
          ref={name}
          onChange={(e) => {
            let v = e.currentTarget.value;
            if (v.length < 0) {
              return;
            }
            data.setSearch(e.currentTarget.value);
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
                    data.setSelectedSingers([
                      ...data.SelectedSingers,
                      {
                        ChanalName: v.ChanalName,
                        id: v.id,
                        pathImage: v.pathImage,
                      },
                    ]);
                    data.setsingers([]);
                    if (name.current != null) {
                      name.current.value = "";
                    }
                  }}
                >
                  <img
                    src={ImagePath(v.pathImage)}
                    alt={v.ChanalName}
                    className="size-[3.6rem] rounded-full"
                  />
                  <p>{v.ChanalName}</p>
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
                        data.setSelectedSingers([
                          ...data.SelectedSingers,
                          v.data,
                        ]);
                        data.setSearch("");
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
    </Fragment>
  );
}
