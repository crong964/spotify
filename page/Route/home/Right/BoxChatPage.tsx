import React from "react";

import BoxChat from "@/page/component/boxchat/Boxchat";

const BoxListData = React.lazy(
  () => import("@/page/component/boxchat/BoxListData")
);
export default function BoxChatPage() {
  
  return (
    <BoxChat children={<BoxListData/>}/>
  );
}



