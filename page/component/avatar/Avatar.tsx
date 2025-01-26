import React from "react";

interface Avatar {
  src: string;
  className: string;
}
export function Avatar(p: Avatar) {
  return (
    <div className={`relative overflow-hidden ${p.className}`}>
      <img src={p.src} className="absolute top-0 left-0 z-0" alt="" srcSet="" />
    </div>
  );
}
