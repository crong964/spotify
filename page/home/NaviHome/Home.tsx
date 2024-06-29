import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, NaviRight, RootHome } from "../RootRedux";
import Navi from "./Navi";
import { HomeFillIcon, HomeIcon } from "../../../icon/Icon";

export default function Home() {
  const dispatch = useDispatch();
  const curpage = useSelector((state: RootHome) => state.rootHome.command.page);

  return (
    <Navi
      curpage={curpage}
      namepage="Trang chủ"
      onclick={() => {
        dispatch(NaviPage({ page: "home", param: "" }));
      }}
      ortherpage={
        <HomeIcon className="size-[25px] sm:size-[40%] fill-white"></HomeIcon>
      }
      samepage={
        <HomeFillIcon className="size-[25px] sm:size-[40%] fill-white"></HomeFillIcon>
      }
      page="home"
    />
  );
}
