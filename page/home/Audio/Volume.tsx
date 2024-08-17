import { BigVolumeIcon, MediumVolumeIcon, MuteVolumeIcon, SmallVolumeIcon } from "@/icon/Icon";
import React from "react";

interface Volume {
  value: number;
}
export default function Volume(p: Volume) {
  return (
    <>
      <MuteVolume value={p.value} />
      <SmallVolume value={p.value} />
      <MediumVolume value={p.value} />
      <BigVolume value={p.value} />
    </>
  );
}

function MuteVolume(p: Volume) {
  return (
    <>
      {p.value <= 0 ? <MuteVolumeIcon className="fill-white size-4" /> : <></>}
    </>
  );
}

function SmallVolume(p: Volume) {
  return (
    <>
      {1 <= p.value && p.value < 33 ? (
        <SmallVolumeIcon className="fill-white size-4" />
      ) : (
        <></>
      )}
    </>
  );
}
function MediumVolume(p: Volume) {
  return (
    <>
      {33 <= p.value && p.value < 66 ? (
        <MediumVolumeIcon className="fill-white size-4" />
      ) : (
        <></>
      )}
    </>
  );
}
function BigVolume(p: Volume) {
  return (
    <>
      {66 <= p.value ? <BigVolumeIcon className="fill-white size-4" /> : <></>}
    </>
  );
}
