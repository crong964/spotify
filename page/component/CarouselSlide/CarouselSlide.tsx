import React, { useCallback, useEffect, useId } from "react";
import { useState } from "react";
import "@/public/css/index.css";

export var color = [
  "#E8115B",
  "#DC148C",
  "#006450",
  "#8400E7",
  "#1E3264",
  "#E8115B",
  "#27856A",
  "#608108",
  "#148A08",
  "#D84000",
  "#7D4B32",
  "#E91429",
];
interface iCarouselSlide {
  l: string[];
}
export default function CarouselSlide(p: iCarouselSlide) {
  const [index, SetIndex] = useState(0);
  const [stop, Stop] = useState(true);
  const [key, SetKey] = useState(0);
  const [drag, SetDrag] = useState(false);
  useEffect(() => {
    if (stop) {
      Stop(false);
      return;
    }
    var time = setTimeout(() => {
      SetKey(Math.random());
      if (index == p.l.length) {
        SetIndex(0);
      } else {
        SetIndex(index + 1);
      }
      Stop(false);
    }, 3500);
    return () => {
      clearTimeout(time);
    };
  }, [index, stop]);
  return (
    <div
      onMouseDown={(e) => {
        SetDrag(false);
      }}
      onMouseMove={(e) => {
        SetDrag(true);
      }}
      onMouseUp={(e) => {
        console.log((drag ? 'drag' : 'click'));

        SetDrag(false);
      }}
      className="w-full h-[350px] overflow-hidden bg-white m-auto relative"
    >
      <div
        key={key + 1}
        className="w-full h-full absolute disappearRighttoLeft "
      >
        {index - 1 < 0 ? p.l[p.l.length - 1] : p.l[index - 1]}
      </div>
      <div
        key={key}
        style={{ backgroundColor: p.l[index] }}
        className="w-full h-full absolute apearRightToLeft"
      >
        {p.l[index]}
      </div>

      <div className="w-full absolute bottom-0 left-0 flex justify-center p-2">
        <div className="w-max bg-white flex items-center rounded-2xl space-x-3 p-2 h-[20px]">
          {p.l.map((v, i) => {
            if (i == index) {
              return (
                <div
                  className={` w-[40px] h-[15px] border border-black rounded-full bg-[${color[index]}]`}
                ></div>
              );
            }
            return (
              <div
                onClick={() => {
                  SetIndex(i);
                  Stop(true);
                }}
                className={`size-[15px] border border-black rounded-full bg-[${color[i]}]`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
//apearRightToLeft disappearRighttoLeft
