import { IconGitHub, IconGoogle } from "@/icon/Icon";
import React, { useEffect } from "react";

interface SignButtom {
  children: React.JSX.Element;
}
function SignButtom(d: SignButtom) {
  return (
    <div className="w-full my-5 text-white ">
      <div className="w-[90%] sm:w-[300px]  border-2 px-3 py-2 rounded-full border-white mx-auto space-y-2">
        {d.children}
      </div>
    </div>
  );
}

export function SignInGoogleButtom() {
  useEffect(() => {
    async function load() {
      var scr = document.createElement("script");
      scr.src = "https://accounts.google.com/gsi/client";
      scr.id = "js";
      document.getElementById("loadjs")?.appendChild(scr);
    }
    load();
    return document.getElementById("js")?.remove();
  }, []);
  return (
    <SignButtom>
      <div id="loadjs" className="flex justify-center items-center ">
        <div
          id="g_id_onload"
          data-client_id="814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com"
          data-context="signup"
          data-login_uri="/auth/ggin"
        ></div>
        <div
          className="g_id_signin hidden"
          data-type="icon"
          data-shape="pill"
          data-theme="filled_black"
          data-text="signup_with"
          data-size="large"
          data-logo_alignment="right"
        ></div>
        <div
          className="flex justify-center items-center me-2 cursor-pointer"
          onClick={() => {
            (
              document.querySelector(".g_id_signin div[role=button]") as any
            ).click();
          }}
        >
          <IconGoogle className="size-[36px] me-2" />
          Đăng nhập với Google
        </div>
      </div>
    </SignButtom>
  );
}

export function SignInGitHubButtom() {
  return (
    <SignButtom>
      <div className=" flex justify-center items-center">
        <IconGitHub className="size-[36px] me-2" />
        <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=50e42ef1515d9e670365">
          Đăng nhập cùng github
        </a>
      </div>
    </SignButtom>
  );
}

export function SignUpGoogleButtom() {
  useEffect(() => {
    async function load() {
      var scr = document.createElement("script");
      scr.src = "https://accounts.google.com/gsi/client";
      scr.id = "js";
      document.getElementById("loadjs")?.appendChild(scr);
    }
    load();
    return document.getElementById("js")?.remove();
  });
  return (
    <SignButtom>
      <div id="loadjs" className="flex justify-center items-center ">
        <div
          id="g_id_onload"
          data-client_id="814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com"
          data-context="signup"
          data-login_uri="/auth/ggup"
        ></div>
        <div
          className="g_id_signin hidden"
          data-type="icon"
          data-shape="pill"
          data-theme="filled_black"
          data-text="signup_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
        <div
          className="flex justify-center items-center me-2 cursor-pointer"
          onClick={() => {
            (
              document.querySelector(".g_id_signin div[role=button]") as any
            ).click();
          }}
        >
          <IconGoogle className="size-[36px] me-2" />
          Đăng ký với Google
        </div>
      </div>
    </SignButtom>
  );
}

export function SignUpGitHubButtom() {
  return (
    <SignButtom>
      <div className=" flex justify-center items-center">
        <IconGitHub className="size-[36px] me-2" />
        <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=499fd7cb01fc989f8bc1">
          Đăng ký cùng GitHub
        </a>
      </div>
    </SignButtom>
  );
}
