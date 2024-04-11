import React, { useEffect, useState } from "react";
import { post } from "../../config/req";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetBoxList } from "../RootRedux";
interface user {
  Name: string;
  pathImage: string;
  id: string;
}

function User(d: user) {
  const dcp = useDispatch();
  return (
    <>
      <div className="px-2 h-18 py-2 flex hover:bg-[#2A2A2A] cursor-pointer content-center">
        <div className="w-14 h-14 overflow-hidden">
          <img
            className="rounded-full w-full h-auto"
            src={d.pathImage}
            alt=""
            srcSet=""
          />
        </div>
        <div
          className="ml-4"
          onClick={() => {
            post("box/chat", { idFriend: d.id }, (data: any) => {
              dcp(SetBoxList(data.idbox));
            });
          }}
        >
          <div className="w-full px-3 font-sans">
            <div className="">{d.Name}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default function UserSearchList() {
  const [user, SetUser] = useState<user[]>([]);
  const SearchName = useSelector(
    (state: RootHome) => state.rootHome.SearchName
  );
  useEffect(() => {
    if (SearchName.length <= 0) {
      return;
    }
    post("/search/user", { name: SearchName }, (v: any) => {
      SetUser(v.ls);
    });
  }, [SearchName]);

  return (
    <>
      {user.map((v) => {
        return (
          <User Name={v.Name} id={v.id} pathImage={v.pathImage} key={v.id} />
        );
      })}
    </>
  );
}

export function UsersRespond() {
  const [user, SetUser] = useState<user[]>([]);

  useEffect(() => {
    post("/friend/Reponse", {}, (v: any) => {
      SetUser(v.ls);
    });
  }, []);

  return (
    <>
      {user.map((v) => {
        return (
          <User Name={v.Name} id={v.id} pathImage={v.pathImage} key={v.id} />
        );
      })}
    </>
  );
}
export function Users() {
  const [user, SetUser] = useState<user[]>([]);

  useEffect(() => {
    post("/friend/", {}, (v: any) => {
      SetUser(v.ls);
    });
  }, []);

  return (
    <>
      {user.map((v) => {
        return (
          <User Name={v.Name} id={v.id} pathImage={v.pathImage} key={v.id} />
        );
      })}
    </>
  );
}