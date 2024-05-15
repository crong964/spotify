import { useSelector } from "react-redux";
import { RootHome } from "../RootRedux";
import React from "react";
import Queue from "./Queue";
import Discuss from "./Discuss";
import BoxChat from "./BoxChat";

export default function Right() {
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  var child: React.JSX.Element = <></>;
  if (Right == "") {
    return <></>;
  }
  if (Right == "Queue") {
    child = <Queue />;
  }
  if (Right == "Discuss") {
    child = <Discuss idsong=""></Discuss>;
  }
  if (Right == "Mess") {
    child = <BoxChat></BoxChat>;
  }
  return (
    <div className="h-full w-full sm:w-[400px]  self-stretch">{child}</div>
  );
}

export function MobileRight() {
  const pageMobie = useSelector(
    (state: RootHome) => state.mobile.pageMobie
  ) as any;
  var child: React.JSX.Element = <></>;
  if (pageMobie == "Queue") {
    child = <Queue />;
  }
  if (pageMobie == "Discuss") {
    child = <Discuss idsong=""></Discuss>;
  }
  if (pageMobie == "Mess") {
    child = <BoxChat></BoxChat>;
  }
  return (
    <div className="h-full w-full sm:w-[400px]  self-stretch">{child}</div>
  );
}
