import { useEffect, useState } from "react";
import { boxdata } from "./Interface";
import { post } from "@/page/config/req";

export function useBoxList() {
  const [data, SetData] = useState<boxdata[]>([]);
  useEffect(() => {
    post("/box/", {}, (v: any) => {
      SetData(v.ls);
    });
  }, []);

  return {
    data,
  };
}
