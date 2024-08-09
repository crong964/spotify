import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Check,
  IsLogin,
  NaviPage,
  NaviRight,
  RootHome,
  SetNotificationPage,
  SetNotificationPageIdSong,
  SetPosition,
} from "@/page/home/RootRedux";

import { get, post } from "@/page/config/req";

const NotificationPage = React.lazy(
  () => import("@/page/home/Header/NotificationList")
);
const PlayButtom = React.lazy(() => import("@/page/component/PlayButtom"));

import { GenreInHome } from "@/page/home/IndexHome";
import { BackIcon, ForwardIcon, MessIcon } from "@/icon/Icon";
import { useLocation, useNavigate } from "react-router-dom";

interface Infor {
  pathImage: string;
  Name: string;
  Vertify: string;
}
export default function Header() {
  const curName = useSelector((state: RootHome) => state.rootHome.curName);
  const [search, SetSearch] = useState("");
  const topbarcontent = useSelector(
    (state: RootHome) => state.rootHome.topbarcontent
  );
  const dispathch = useDispatch();
  const [showNotification, SetShowNotification] = useState(false);
  const navigate = useNavigate();
  const update = useSelector((state: RootHome) => state.rootHome.update);
  const isLogin = useSelector((state: RootHome) => state.rootHome.isLogin);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [infor, SetInfor] = useState<Infor>({
    Name: "",
    pathImage: "",
    Vertify: "",
  });
  useEffect(() => {
    get("/user", (v: any) => {
      dispatch(IsLogin(v.u != undefined));
      if (v.u) {
        SetInfor(v.u);
        localStorage.setItem("userinfor", JSON.stringify(v.u));
      }
    });
  }, [update]);

  useEffect(() => {}, [search]);

  return (
    <div
      className={`h-max w-full sticky bg-black top-0 z-10 px-3 py-2 space-y-2`}
    >
      <div className="flex items-center space-x-2 mx-0 sm:mx-3 sm:justify-between">
        <div className="flex space-x-3  items-center">
          <Back />
          <Forward />
          {topbarcontent ? (
            <button className="flex items-center text-white text-2xl font-bold space-x-2">
              <PlayButtom id="" page="" />
              <div className="">{curName}</div>
            </button>
          ) : (
            <></>
          )}
          <>
            {pathname == "/genre" || pathname.indexOf("/search") >= 0 ? (
              <div className="hidden sm:flex items-center border-white border-2 py-2 px-3 bg-[#2A2A2A] rounded-3xl">
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
                  className="searchname p-1 text-white w-[300px] bg-[#2A2A2A] border-[#2A2A2A]  focus:outline-none border-2 rounded-full"
                />
                <svg
                  data-encore-id="icon"
                  fill="white"
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
                {pathname == "/" || pathname == "/artist" ? (
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
                    <MessIcon className="fill-white hover:fill-[#1FDF64]"></MessIcon>
                  </div>
                  <div className="bg-[#2A2A2A] p-2 rounded-full relative cursor-pointer">
                    <svg
                      onClick={() => {
                        SetShowNotification(!showNotification);
                        if (showNotification == false) {
                          dispathch(SetNotificationPage("list"));
                          dispathch(SetNotificationPageIdSong(""));
                        }
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="fill-white hover:fill-[#1FDF64]"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                    </svg>
                    {showNotification ? <NotificationPage /> : <></>}
                  </div>
                  <Avatar Name="" Vertify="" pathImage={infor.pathImage} />
                </div>
              </>
            ) : (
              <>
                <div className="flex  items-center space-x-3">
                  <button
                    onClick={() => {
                      window.location.href = "/auth?dk=yes";
                    }}
                    className="font-bold hover:text-blue-500 px-3 py-1 rounded-2xl"
                  >
                    đăng ký
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = "/auth";
                    }}
                    className="bg-white hover:text-blue-500 font-bold text-black px-3 py-1 rounded-2xl "
                  >
                    đăng nhập
                  </button>
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

function Avatar(p: Infor) {
  const [show, SetShow] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="relative cursor-pointer">
      <div
        onClick={() => {
          SetShow(!show);
        }}
        className="text-[14px]"
      >
        <img
          className="size-[40px] rounded-full cursor-pointer"
          src={p.pathImage}
          alt=""
          srcSet=""
        />
      </div>
      {show ? (
        <div className="bg-[#3E3E3E] z-[20] rounded-lg min-w-[200px] text-[16px] absolute top-full  sm:right-0">
          <div className="text-white  cursor-pointer hover:bg-black">
            <div
              onClick={() => {
                dispatch(NaviPage({ page: "profile", param: "" }));
                SetShow(!show);
              }}
              className="p-2"
            >
              Tài khoản
            </div>
          </div>

          <div
            onClick={() => {
              get("/auth/logout", (e: any) => {
                window.location.replace("/auth");
              });
            }}
            className="text-white cursor-pointer hover:bg-black"
          >
            <div className="p-2">Đăng xuất </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
