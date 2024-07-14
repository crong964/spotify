import React, { useEffect, useState } from "react";
import { post } from "@/page/config/req";
interface User {
  pathImage: string;
  Account: string;
  Name: string;
  id: string;
}
function User(d: User) {
  return (
    <tr className="bg-white hover:bg-[#ECECEC] cursor-pointer">
      <th className="w-1/4">{d.id}</th>
      <th className="flex justify-start w-2/4">
        <img className="size-[100px]" src={d.pathImage} alt="" srcSet="" />
      </th>
      <th className="w-1/3">{d.Name}</th>
    </tr>
  );
}
export default function UserList() {
  const [vertify, SetVertify] = useState("");
  const [userList, SetUserList] = useState<User[]>([]);
  useEffect(() => {
    post("/admin/UserRouteAdmin/userlist", { Vertify: vertify }, (v: any) => {
      SetUserList(v.ls);
    });
  }, [vertify]);
  var children = userList.map((v, i) => {
    return (
      <User
        Account={v.Account}
        Name={v.Name}
        id={i + ""}
        pathImage={v.pathImage}
        key={v.id}
      />
    );
  });
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center my-2">
        <Buttom Set={SetVertify} curva={vertify} title="Tất cả" va="" />
        <Buttom Set={SetVertify} curva={vertify} title="Đã xác thực" va="1" />

        <Buttom Set={SetVertify} curva={vertify} title="Chưa xác thực" va="0" />
      </div>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="w-1/4">Số thứ tự</th>
            <th className="w-2/4">Ảnh</th>
            <th className="w-1/4">Tên</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

interface Buttom {
  title: string;
  va: string;
  Set(v: any): void;
  curva: string;
}
function Buttom(p: Buttom) {
  return (
    <div
      className={`flex-1 p-1  rounded-2xl text-center text-[20px] cursor-pointer ${
        p.curva == p.va ? "bg-[#3D68FF] text-white" : ""
      }`}
      onClick={() => {
        p.Set(p.va);
      }}
    >
      {p.title}
    </div>
  );
}
