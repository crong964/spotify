import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NaviPage,
  NaviRight,
  RootHome,
  SetPosition,
} from "@/page/Route/home/RootRedux";

import { get, post } from "@/page/config/req";

const PlayButtom = React.lazy(() => import("@/page/component/PlayButtom"));

import { BackIcon, ForwardIcon, MessIcon } from "@/icon/Icon";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { GenreInHome } from "@/page/Route/IndexHome2";
import { Infor } from "./interface";
import { Avatar, Ring } from "@/page/component/Header";
import { IsLogin } from "@/page/Route/auth/RootAuth";

export default function Header() {
  const curName = useSelector((state: RootHome) => state.rootHome.curName);
  const [search, SetSearch] = useState("");
  const topbarcontent = useSelector(
    (state: RootHome) => state.rootHome.topbarcontent
  );
  const dispathch = useDispatch();
  const navigate = useNavigate();
  const update = useSelector((state: RootHome) => state.rootHome.update);
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const right = useSelector((state: RootHome) => state.rootHome.Right);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let segpath = (pathname: string) => {
    if (pathname.indexOf("artist") >= 0) {
      return "artist";
    }
    if (pathname.indexOf("playlist")) {
      return "playlist";
    }
    return "";
  };

  const [infor, SetInfor] = useState<Infor>({
    Name: "",
    pathImage: "",
    Vertify: "",
  });
  useEffect(() => {
    get("/user", (v: any) => {
      if (v.u) {
        SetInfor(v.u);
        dispatch(IsLogin({ idUser: v.u.id, IsLogin: true }));
        localStorage.setItem("userinfor", JSON.stringify(v.u));
      }
    });
  }, [update]);

  useEffect(() => {}, [search]);
  const { id } = useParams();
  return (
    <div className="b h-max w-full rounded-tl-lg sticky bg-gradient-to-r from-red-500 via-pink-400 to-black top-0 z-10 px-3 p-0 sm:py-2 space-y-2">
      <div className="flex items-center space-x-2 mx-0 sm:mx-3 sm:justify-between">
        <div className="flex space-x-3  items-center">
          <Back />
          <Forward />
          {topbarcontent ? (
            <button className="flex items-center text-white text-2xl font-bold space-x-2 py-1">
              <PlayButtom id={id || ""} page={segpath(pathname)} />
              <div className="">{curName}</div>
            </button>
          ) : (
            <></>
          )}
          <>
            {pathname == "/genre" || pathname.indexOf("/search") >= 0 ? (
              <div className="hidden sm:flex items-center border-white border-2 py-2 px-3 bg-white rounded-3xl">
                <input
                  onChange={(v) => {
                    var value = v.currentTarget.value;
                    if (value.length <= 0) {
                      navigate(`/genre`);
                      return;
                    }
                    dispatch(NaviPage({ page: "search", param: value }));
                    navigate(`/search/${value}`);
                  }}
                  type="text"
                  className="searchname p-1 text-black w-[300px] bg-white border-white  focus:outline-none border-2 rounded-full"
                />
                <svg
                  data-encore-id="icon"
                  fill="black"
                  role="img"
                  aria-hidden="true"
                  className="size-[16px] "
                  viewBox="0 0 16 16"
                >
                  <path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path>
                </svg>
              </div>
            ) : (
              <></>
            )}
          </>
        </div>
        {!topbarcontent ? (
          <>
            {isLogin ? (
              <>
                {pathname == "/" ||
                pathname == "/artist" ||
                pathname == "/section" ||
                pathname.indexOf("mobile/library") >= 0 ? (
                  <div className="flex sm:hidden items-center">
                    <Avatar Name="" Vertify="" pathImage={infor.pathImage} />
                    <GenreInHome />
                  </div>
                ) : (
                  <></>
                )}
                {pathname == "/genre" ? (
                  <div className="flex space-x-3 sm:hidden items-center">
                    <Avatar Name="" Vertify="" pathImage={infor.pathImage} />
                    <div className="font-bold text-[30px]">Tìm kiếm</div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="hidden sm:flex items-center space-x-3 ">
                  <div className="cursor-pointer  text-sm font-bold bg-white text-black rounded-3xl px-2 py-1">
                    Khám phá Premium
                  </div>
                  <div className="cursor-pointer text-sm font-bold bg-black text-white rounded-3xl px-2 py-1">
                    Cài đặt ứng dụng
                  </div>
                  <div
                    className=""
                    onClick={() => {
                      dispatch(NaviRight("Mess"));
                    }}
                  >
                    {right == "Mess" ? (
                      <MessIcon className="fill-[#1FDF64]" />
                    ) : (
                      <MessIcon className="fill-white hover:fill-[#1FDF64]" />
                    )}
                  </div>
                  <Ring />
                  <Avatar Name="" Vertify="" pathImage={infor.pathImage} />
                </div>
              </>
            ) : (
              <>
                <div className="flex  items-center space-x-3 pt-1">
                  <Link
                    to={"/auth/Signup"}
                    className="font-bold hover:text-blue-500 px-3 py-1 rounded-2xl"
                  >
                    đăng ký
                  </Link>
                  <Link
                    to={"/auth"}
                    className="bg-white hover:text-blue-500 font-bold text-black px-3 py-1 rounded-2xl "
                  >
                    đăng nhập
                  </Link>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function Forward() {
  const stack = useSelector((state: RootHome) => state.rootHome.stack);
  const position = useSelector((state: RootHome) => state.rootHome.position);
  const dispatch = useDispatch();
  return (
    <button
      title="forward"
      className={`${
        position < stack.length - 1
          ? "bg-[#2A2A2A]"
          : "bg-black cursor-not-allowed"
      } rounded-full size-[28px] hidden sm:flex justify-center items-center`}
      onClick={() => {
        if (stack.length == 0) {
          return;
        }
        if (position >= stack.length - 1) {
          return;
        }
        history.forward();
        dispatch(SetPosition(1));
      }}
    >
      <ForwardIcon className="fill-white size-4"></ForwardIcon>
    </button>
  );
}

function Back() {
  const position = useSelector((state: RootHome) => state.rootHome.position);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        if (position <= 0) {
          return;
        }
        dispatch(SetPosition(-1));
        history.back();
      }}
      className={`${
        position > 0 ? "bg-[#2A2A2A]" : "bg-black cursor-not-allowed"
      } rounded-full size-[28px] hidden sm:flex justify-center items-center `}
    >
      <BackIcon className="fill-white size-4"></BackIcon>
    </button>
  );
}
