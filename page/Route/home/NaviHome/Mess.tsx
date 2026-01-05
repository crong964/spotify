import React from "react";
import { useDispatch } from "react-redux";
import Navi from "./Navi";
import { MessIcon } from "@/icon/Icon";
import { NaviRight } from "@/page/Redux/HomeRedux";

export function MobileMessButtom() {
  const dispatch = useDispatch();
  return (
    <Navi
      namepage="Tin nhắn"
      onclick={() => {
        dispatch(NaviRight("Mess"));
      }}
      page="Mess"
      ortherpage={
        <MessIcon className="fill-white size-[32px] sm:size-[20px]"></MessIcon>
      }
      samepage={
        <MessIcon className="fill-green-600 size-[32px] sm:size-[20px]"></MessIcon>
      }
    />
  );
}
