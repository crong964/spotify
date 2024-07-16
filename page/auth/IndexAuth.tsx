import React, { useEffect, useState } from "react";
import SignIn from "./SignIn";
import { useDispatch, useSelector } from "react-redux";
import { Infor, Page, RootAuth } from "./RootAuth";
import Signup from "./Signup";
import { post } from "@/page/config/req";
import CreateAccount from "./CreateAccount";
import Forgot from "./Forgot";
import ChangePassword from "./ChangePassword";
import { Route, Routes } from "react-router-dom";
import CenterShare from "./CenterShare";

export default function IndexAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    post("/auth/getdata", {}, (v: any) => {
      if (!v.err) {
        dispatch(Page("createAccount"));
        dispatch(Infor(v));
        console.log(v);
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="auth" element={<CenterShare></CenterShare>}>
        <Route index element={<SignIn />}></Route>
        <Route path="CreateAccount" element={<CreateAccount />}></Route>
        <Route path="Signup" element={<Signup />}></Route>
        <Route path="Forgot" element={<Forgot />}></Route>
        <Route path="ChangePassword" element={<ChangePassword />}></Route>
      </Route>
    </Routes>
  );
}
