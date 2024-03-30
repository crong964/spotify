import React from "react";
import { useDispatch } from "react-redux";
import { Page } from "./Redux";

export default function Navi() {
  const dispatch = useDispatch();

  return (
    <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
          Admin
        </a>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <a
          onClick={() => {
            dispatch(Page("genre"));
          }}
          className="flex items-center  hover:opacity-100 text-white py-4 pl-6 nav-item cursor-pointer "
        >
          <i className="fas fa-sticky-note mr-3"></i>
          Thể loại
        </a>

        <a
          onClick={() => {
            dispatch(Page("songlist"));
          }}
          className="flex items-center active-nav-link text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          Danh sách nhạc
        </a>

        <a
          onClick={() => {
            dispatch(Page("playlist"));
          }}
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
        >
          <i className="fas fa-align-left mr-3"></i>
          Playlist
        </a>
        <a
          href="tabs.html"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
        >
          <i className="fas fa-tablet-alt mr-3"></i>
          Tabbed Content
        </a>
        <a
          href="calendar.html"
          className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
        >
          <i className="fas fa-calendar mr-3"></i>
          Calendar
        </a>
      </nav>
    </aside>
  );
}
