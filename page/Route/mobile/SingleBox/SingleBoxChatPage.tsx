import SingleChatBox from "@/page/component/SingleChatBox/SingleChatBox";
import React from "react";
import { useParams } from "react-router-dom";

export function SingleBoxChatPage() {
  const { idbox } = useParams();
  return (
    <div className="absolute bg-black top-0 left-0  z-[90] w-[100vw] h-[100vh]">
      <SingleChatBox idbox={idbox || ""}></SingleChatBox>
    </div>
  );
}
