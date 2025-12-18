import React from "react";
import { NaviRight, RootHome } from "@/page/Route/home/RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { NaviPageMobile } from "./NaviRedux";
import Navi from "./Navi";
import { MessIcon } from "@/icon/Icon";

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
