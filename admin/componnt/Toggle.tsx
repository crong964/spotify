import React from "react";
import { useState } from "react";
type Toggle = {
  status: string;
  callback(): boolean;
};
function Toggle(d: Toggle) {
  const [show, SetShow] = useState(d.status == "1" ? true : false);
  const han = () => {
    SetShow(d.callback());
  };
  return (
    <div onClick={han} className="flex justify-center cursor-pointer">
      <div
        className={`h-5 p-1 w-[20%] rounded-full ${
          show ? "bg-green-700" : "bg-black"
        }`}
      >
        {show ? (
          <div className="size-3  float-right bg-white rounded-full"></div>
        ) : (
          <div className="size-3 float-left bg-white rounded-full"></div>
        )}
      </div>
    </div>
  );
}
