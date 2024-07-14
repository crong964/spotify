import { useState } from "react";
import { post } from "@/page/config/req";
import React from "react";

interface Toggle {
  status: string;
  idSong: string;
  han(): Promise<string>;
}

export default function Toggle(d: Toggle) {
  const [show, SetShow] = useState(d.status == "1" ? true : false);

  const han = async () => {
    try {
      var s = await d.han();
      SetShow(s == "1");
    } catch (error) {
      alert("có lỗi");
    }
  };
  return (
    <div className="flex flex-col cursor-pointer">
      <div
        onClick={() => {
          han();
        }}
        className={`h-5 p-1 w-[20%] rounded-full ${
          show ? "bg-green-700" : "bg-black"
        }`}
      >
        {show ? (
          <div className="size-3  float-right bg-white rounded-full"></div>
        ) : (
          <div className="size-3 float-left bg-white rounded-full"></div>
        )}{" "}
      </div>
    </div>
  );
}
