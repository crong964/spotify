import Boxchat from "@/page/component/boxchat/Boxchat";

import React from "react";
const BoxListDataMobile = React.lazy(
  () => import("@/page/component/boxchat/BoxListDataMobile")
);
export function ChatBoxMobliePage() {
  return (
    <div className="absolute bg-black top-0 left-0  z-[90] w-[100vw] h-[100vh]">
      <Boxchat>
        <BoxListDataMobile></BoxListDataMobile>
      </Boxchat>
    </div>
  );
}
