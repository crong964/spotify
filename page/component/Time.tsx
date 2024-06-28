import React from "react";

interface Time {
  d: number;
}
export default function Time(params: Time) {
  if (isNaN(params.d)) {
    return <div></div>;
  }
  
  let data = parseInt(params.d + "");
  let minute = parseInt(data / 60 + "");
  let second = data % 60;

  return (
    <div className="text-[12px] text-[#a7a7a7] hidden sm:inline-block ">
      {minute}:{second < 10 ? `0${second}` : `${second}`}
    </div>
  );
}
