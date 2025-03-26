import React, { useState } from "react";

import UserSearchList, {
  Users,
  UsersRespond,
} from "@/page/component/friend/UserSearchList";
import { Search, Searching } from "@/page/component/boxchat/Search";
import { Title } from "@/page/component/boxchat/Title";

import { Link } from "react-router-dom";
import { HomeIcon } from "@/icon/Icon";

export default function BoxChat(p: { children: React.JSX.Element }) {
  const [search, SetSearch] = useState(false);
  const [order, SetOrder] = useState(0);

  return (
    <div className="bg-[#121212] relative overflow-y-auto px-0 sm:px-2 h-full w-full">
      <div className="  p-2">
        <>
          <div className="text-[20px] flex items-center justify-around sticky top-0 left-0 bg-[#121212] z-40  py-2 cursor-pointer">
            <Link to={"/"}>
              <HomeIcon className="size-[20px] block sm:hidden  fill-white"></HomeIcon>
            </Link>
            <Title Order={order} Select={SetOrder} value={0} data="Đoạn chat" />
            <Title Order={order} Select={SetOrder} value={1} data="Bạn bè" />
            <Title
              Order={order}
              Select={SetOrder}
              value={2}
              data="Lời Kết bạn"
            />
          </div>
          <>
            {order == 0 ? (
              <>
                {search ? (
                  <>
                    <Searching set={SetSearch} />
                    <UserSearchList />
                  </>
                ) : (
                  <>
                    <Search set={SetSearch} />
                    {p.children}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </>
          <>
            {order == 1 ? (
              <>
                <Users />
              </>
            ) : (
              <></>
            )}
          </>
          <>
            {order == 2 ? (
              <>
                <UsersRespond />
              </>
            ) : (
              <></>
            )}
          </>
        </>
      </div>
    </div>
  );
}
