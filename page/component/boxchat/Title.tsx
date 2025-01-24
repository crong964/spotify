import React from "react";

interface Title {
  Order: number;
  value: number;
  Select(d: number): void;
  data: string;
}
export function Title(d: Title) {
  return (
    <div
      onClick={() => {
        d.Select(d.value);
      }}
      className={`${
        d.Order == d.value ? "border-b-8 border-b-[#1ED760] text-[#1ED760]" : ""
      }`}
    >
      {d.data}
    </div>
  );
}