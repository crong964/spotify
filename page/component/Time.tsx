import React from "react";

interface Time {
  d: number;
  className?: string;
}
export default function Time(params: Time) {
  if (isNaN(params.d)) {
    return <div></div>;
  }

  let data = parseInt(params.d + "");
  let minute = parseInt(data / 60 + "");
  let second = data % 60;

  return (
    <div
      className={
        params.className || "text-[12px] font-normal text-[#a7a7a7] sm:inline-block "
      }
    >
      {minute}:{second < 10 ? `0${second}` : `${second}`}
    </div>
  );
}
export function TimeString(params: Time) {
  if (isNaN(params.d)) {
    return <div></div>;
  }

  let data = parseInt(params.d + "");
  let hour = parseInt(data / 3600 + "");
  let minute = parseInt((data - hour * 3600) / 60 + "");
  let second = data % 60;

  return (
    <div
      className={
        params.className || "text-[14px] inline-block "
      }
    >
      {hour > 0 ? `${hour} giờ ` : " "}
      {minute > 0 ? `${minute} phút ` : " "}
      {second > 0 ? `${second} giây ` : " "}
    </div>
  );
}
