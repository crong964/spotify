import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page, RootState } from "./Redux";
import Dropdown from "./componnt/Dropdow";
import { NavLink, Outlet } from "react-router-dom";
import { ArtistIcon, GenresIcon, HumanIcon, SongIcon } from "@/icon/Icon";

export default function Navi() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.navi.page);
  return (
    <aside className="relative bg-sidebar  w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
          Admin
        </a>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <NavLink
          to="/songlist"
          className={({ isActive, isPending }) =>
            [isActive ? "active-nav-link" : "", ""].join(
              " flex items-center hover:opacity-100 text-white py-3 pl-6 nav-item cursor-pointer"
            )
          }
        >
          <SongIcon className="size-6 fill-white mr-3" />
          Danh sách nhạc
        </NavLink>
        <NavLink
          to="/genre"
          end
          className={({ isActive, isPending }) =>
            [isActive ? "active-nav-link" : "", ""].join(
              " flex items-center hover:opacity-100 text-white py-3 pl-6 nav-item cursor-pointer"
            )
          }
        >
          <GenresIcon className="size-6 fill-white mr-3" />
          Thê loại
        </NavLink>

        <Dropdown>
          <a className="flex items-center text-white opacity-75 hover:opacity-100 py-3 pl-6 nav-item cursor-pointer">
            <i className="fas fa-align-left mr-3"></i>
            Playlist
          </a>
          <NavLink
            to="/playlist"
            end
            className={({ isActive, isPending }) =>
              [isActive ? "active-nav-link" : "", ""].join(
                " flex items-center hover:opacity-100 text-white py-3 pl-6 nav-item cursor-pointer"
              )
            }
          >
            <div className="mr-4"></div>
            Danh sách Playlist
          </NavLink>
          <NavLink
            to="/playlist/add"
            end
            className={({ isActive, isPending }) =>
              [isActive ? "active-nav-link" : "", ""].join(
                " flex items-center hover:opacity-100 text-white py-3 pl-6 nav-item cursor-pointer"
              )
            }
          >
            <div className="mr-4"></div>
            Thêm mới play list
          </NavLink>
        </Dropdown>
        <Dropdown>
          <div className="flex items-center text-white opacity-75 hover:opacity-100 py-3 pl-6 nav-item cursor-pointer">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                fillRule="evenodd"
                d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                clipRule="evenodd"
              />
            </svg> */}
            <ArtistIcon className="size-6 fill-white  mr-3" />
            Danh sách ca sĩ
          </div>
          <NavLink
            to="/artist"
            end
            className={({ isActive, isPending }) =>
              [isActive ? "active-nav-link" : "", ""].join(
                " flex items-center hover:opacity-100 text-white py-3 pl-6 nav-item cursor-pointer"
              )
            }
          >
            <div className="mr-6"></div>
            Quản lý ca sĩ
          </NavLink>
        </Dropdown>
        <Dropdown>
          <div className="flex items-center text-white opacity-75 hover:opacity-100 py-3 pl-6 nav-item cursor-pointer">
            <HumanIcon className="size-6 fill-white mr-3" />
            Danh sách tài khoản
          </div>
          <NavLink
            to="/user/userlist"
            end
            className={({ isActive, isPending }) =>
              [isActive ? "active-nav-link" : "", ""].join(
                " flex items-center hover:opacity-100 text-white py-3 pl-6 nav-item cursor-pointer"
              )
            }
          >
            <div className="mr-6"></div>
            Danh sách người dùng
          </NavLink>
          <NavLink
            to="/user/employls"
            end
            className={({ isActive, isPending }) =>
              [isActive ? "active-nav-link" : "", ""].join(
                " flex items-center hover:opacity-100 text-white py-3 pl-6 nav-item cursor-pointer"
              )
            }
          >
            <div className="mr-6"></div>
            Danh sách nhân viên
          </NavLink>
        </Dropdown>
        <NavLink
            to="/cmd"
            end
            className={({ isActive, isPending }) =>
              [isActive ? "active-nav-link" : "", ""].join(
                " flex items-center hover:opacity-100 text-white py-3 pl-6 nav-item cursor-pointer"
              )
            }
          >
            <div className="mr-4"></div>
            Lệnh
          </NavLink>
        <a
          href="/auth/logout"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-3 pl-6 nav-item cursor-pointer"
        >
          <i className="fas fa-calendar mr-3"></i>
          Đăng xuất
        </a>
      </nav>
    </aside>
  );
}
