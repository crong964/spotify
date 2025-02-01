import React, { useState } from "react";
import { Pop } from "@/page/component/pop";
import NotificationPage from "./NotificationList";
import { useDispatch } from "react-redux";
import { SetNotificationPage, SetNotificationPageIdSong } from "@/page/Route/home/RootRedux";

export default function Ring() {
  const dispatch = useDispatch();
  const [showNotification, SetShowNotification] = useState(false);
  const [xy, XY] = useState({ x: 0, y: 0 });
  return (
    <button
      onBlur={(e) => {
        if (showNotification) {
          SetShowNotification(false);
        }
      }}
    >
      <div className="bg-[#2A2A2A] p-2 rounded-full cursor-pointer ">
        <svg
          onClick={(e) => {
            SetShowNotification(!showNotification);
            if (showNotification == false) {
              dispatch(SetNotificationPage("list"));
              dispatch(SetNotificationPageIdSong(""));
              let x = e.currentTarget.getBoundingClientRect().right;
              let y = e.currentTarget.getBoundingClientRect().bottom;
              XY({ x: x, y: y });
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
        {showNotification ? (
          <Pop left={xy.x} top={xy.y}>
            <NotificationPage />
          </Pop>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
}
