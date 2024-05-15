import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NaviPage, NaviRight, RootHome } from "../RootRedux";
import Navi from "./Navi";

export function Home() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootHome) => state.rootHome.command.page);
  return (
    <div
      onClick={() => {
        dispatch(NaviPage({ page: "home", param: "" }));
      }}
      className="w-full h-full grid place-items-center grid-cols-1 sm:h-1/2 sm:flex sm:justify-center sm:items-center"
    >
      {page != "home" ? (
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          className="size-[30px] sm:size-1/2 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
        </svg>
      ) : (
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          className="size-[30px] sm:size-1/2 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
        </svg>
      )}
      <div className="block sm:hidden">Trang chủ</div>
    </div>
  );
}
export function NewHome() {
  const dispatch = useDispatch();
  const curpage = useSelector((state: RootHome) => state.rootHome.command.page);
  const mobiletype = useSelector((state: RootHome) => state.mobile.type);
  return (
    <Navi
      curpage={curpage}
      namepage="Trang chủ"
      onclick={() => {
        dispatch(NaviPage({ page: "home", param: "" }));
        if (mobiletype == "mobile") {
          dispatch(NaviRight(""));
        }
      }}
      ortherpage={
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          className="size-[30px] sm:size-1/2 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
        </svg>
      }
      samepage={
        <svg
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          className="size-[30px] sm:size-1/2 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
        </svg>
      }
      page="home"
    />
  );
}
