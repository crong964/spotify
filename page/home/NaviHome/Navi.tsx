import { useDispatch, useSelector } from "react-redux";
import { NaviPage, RootHome } from "../RootRedux";
import React from "react";

type navi = {
  page: string;
  ortherpage: React.JSX.Element;
  samepage: React.JSX.Element;
  onclick(): void;
  namepage: string;
  curpage: string;
};
export default function Navi(params: navi) {
  return (
    <div
      onClick={() => {
        params.onclick();
      }}
      className="w-full h-full grid place-items-center grid-cols-1 sm:h-1/2 sm:flex sm:justify-center sm:items-center"
    >
      {params.curpage != params.page ? params.ortherpage : params.samepage}
      <div className="block sm:hidden">{params.namepage}</div>
    </div>
  );
}
