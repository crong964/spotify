import React from "react";
import { useDispatch } from "react-redux";
import Navi from "./Navi";
import { HomeFillIcon, HomeIcon } from "@/icon/Icon";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <Link to={"/"}>
      <Navi
        namepage="Trang chủ"
        onclick={() => {}}
        ortherpage={
          <HomeIcon className="size-[25px] sm:size-[40%] fill-white"></HomeIcon>
        }
        samepage={
          <HomeFillIcon className="size-[25px] sm:size-[40%] fill-white"></HomeFillIcon>
        }
        page="/"
      />
    </Link>
  );
}
