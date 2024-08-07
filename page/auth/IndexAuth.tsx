import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Infor, Page } from "./RootAuth";
import { post } from "@/page/config/req";

import { Route, Routes } from "react-router-dom";

const SignIn = React.lazy(() => import("./SignIn"));
const Signup = React.lazy(() => import("./Signup"));
const CreateAccount = React.lazy(() => import("./CreateAccount"));
const Forgot = React.lazy(() => import("./Forgot"));
const ChangePassword = React.lazy(() => import("./ChangePassword"));
const CenterShare = React.lazy(() => import("./CenterShare"));

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
    <Route path="auth" element={<CenterShare></CenterShare>}>
      <Route index element={<SignIn />}></Route>
      <Route path="CreateAccount" element={<CreateAccount />}></Route>
      <Route path="Signup" element={<Signup />}></Route>
      <Route path="Forgot" element={<Forgot />}></Route>
      <Route path="ChangePassword" element={<ChangePassword />}></Route>
    </Route>
  );
}
