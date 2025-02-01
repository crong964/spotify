import React, { useEffect, useState } from "react";
import { Pop } from ".";
import { iNotification } from "./interface";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetNotification } from "@/page/Route/home/RootRedux";

export default function NotificationF() {
  const no = useSelector((state: RootHome) => state.rootHome.Notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (no == "") {
      return;
    }
    let f = setTimeout(() => {
      dispatch(SetNotification(""));
    }, 2000);
    return () => {
      clearTimeout(f);
    };
  }, [no]);

  return no != "" ? (
    <Pop top={20} left={"50%"}>
      <div>{no}</div>
    </Pop>
  ) : (
    <></>
  );
}
