import { useDispatch, useSelector } from "react-redux";
import { RootHome } from "@/page/Redux/RootRedux";
import React from "react";
import Navi from "./Navi";
import { Link } from "react-router-dom";
import { SearchCircleIcon, SearchIcon } from "@/icon/Icon";

export function SearchButtom() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootHome) => state.rootHome.command.page);

  return (
    <Link to={"/genre"}>
      <div className="w-full h-full grid place-items-center grid-cols-1 sm:h-1/2 sm:flex justify-center items-center">
        {page == "genre" ? (
          <SearchIcon className="size-[32px] sm:size-1/2 fill-white"></SearchIcon>
        ) : (
          <SearchCircleIcon className="size-[32px] sm:size-1/2"></SearchCircleIcon>
        )}
        <div className="block sm:hidden">tìm kiếm</div>
      </div>
    </Link>
  );
}

export function MobileSearchButtom() {
  return (
    <Link to={"/genre"}>
      <Navi
        namepage="Tìm kiếm"
        onclick={() => {}}
        page="genre"
        ortherpage={
          <SearchCircleIcon className="size-[32px] sm:size-1/2"></SearchCircleIcon>
        }
        samepage={
          <SearchIcon className="size-[32px] sm:size-1/2 fill-white"></SearchIcon>
        }
      />
    </Link>
  );
}
