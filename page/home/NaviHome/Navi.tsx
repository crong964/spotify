import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "../RootRedux";
import React from "react";
import { useLocation } from "react-router-dom";

type navi = {
  page: string;
  ortherpage: React.JSX.Element;
  samepage: React.JSX.Element;
  onclick(): void;
  namepage: string;
};
export default function Navi(params: navi) {
  const page = useLocation();
  return (
    <div
      onClick={() => {
        params.onclick();
      }}
      className="w-full h-full grid place-items-center grid-cols-1 sm:h-[60px] sm:flex sm:justify-center sm:items-center"
    >
      {params.page == "/" ? (
        <>
          {page.pathname == params.page ? (
            <>{params.samepage}</>
          ) : (
            <>{params.ortherpage}</>
          )}
        </>
      ) : (
        <>
          {page.pathname.indexOf(params.page) >= 0 ? (
            <>{params.samepage}</>
          ) : (
            <>{params.ortherpage}</>
          )}
        </>
      )}

      <div className="block sm:hidden">{params.namepage}</div>
    </div>
  );
}
