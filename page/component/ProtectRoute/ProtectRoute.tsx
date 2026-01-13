import { RootHome } from "@/page/Redux/RootRedux";
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
    if (isLogin == undefined) {
      return;
    }
    if (!isLogin) {
      return navigate("/auth");
    }

    return () => {};
  }, [isLogin]);
  return <>{children}</>;
}
