import { RootHome } from "@/page/Route/home/RootRedux";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ProtectRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      return navigate("/auth");
    }
    return () => {};
  }, [isLogin]);
  return <>{children}</>;
}
