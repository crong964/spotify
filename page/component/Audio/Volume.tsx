import {
  BigVolumeIcon,
  MediumVolumeIcon,
  MuteVolumeIcon,
  SmallVolumeIcon,
} from "@/icon/Icon";
import React from "react";

interface Volume {
  value: number;
}
export default function Volume({ value }: Volume) {
  return (
    <>
      <MuteVolume value={value} />
      <SmallVolume value={value} />
      <MediumVolume value={value} />
      <BigVolume value={value} />
    </>
  );
}

function MuteVolume({ value }: Volume) {
  return <>{value <= 0 && <MuteVolumeIcon className="fill-white size-4" />}</>;
}

function SmallVolume({ value }: Volume) {
  return (
    <>
      {1 <= value && value < 33 && (
        <SmallVolumeIcon className="fill-white size-4" />
      )}
    </>
  );
}
function MediumVolume({ value }: Volume) {
  return (
    <>
      {33 <= value && value < 66 && (
        <MediumVolumeIcon className="fill-white size-4" />
      )}
    </>
  );
}
function BigVolume({ value }: Volume) {
  return <>{66 <= value && <BigVolumeIcon className="fill-white size-4" />}</>;
}
