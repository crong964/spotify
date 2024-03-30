import React, { useEffect } from "react";

interface SignButtom {
  children: React.JSX.Element;
}
function SignButtom(d: SignButtom) {
  return (
    <div className="w-full my-5 text-white ">
      <div className="w-[60%]  border-2 px-3 py-2 rounded-full border-white mx-auto space-y-2">
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
  });
  return (
    <SignButtom>
      <div id="loadjs" className="flex justify-center items-center ">
      <div
          id="g_id_onload"
          data-client_id="814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com"
          data-context="signup"
          data-login_uri="http://localhost:8000/auth/ggin"
        >
          
        </div>
        <div
          className="g_id_signin"
          data-type="icon"
          data-shape="pill"
          data-theme="filled_black"
          data-text="signup_with"
          data-size="large"
          data-logo_alignment="right"
        ></div>
        <div>Đăng ký với Google</div>
      </div>
    </SignButtom>
  );
}

export function SignInGitHubButtom() {
  return (
    <SignButtom>
      <div className=" flex justify-center items-center">
        <svg
          className="size-[36px] me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
            clipRule="evenodd"
          />
        </svg>
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
          data-login_uri="http://localhost:8000/auth/ggup"
        >
          
        </div>
        <div
          className="g_id_signin"
          data-type="icon"
          data-shape="pill"
          data-theme="filled_black"
          data-text="signup_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
        <div>Đăng ký với Google</div>
      </div>
    </SignButtom>
  );
}

export function SignUpGitHubButtom() {
  return (
    <SignButtom>
      <div className=" flex justify-center items-center">
        <svg
          className="size-[36px] me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
            clipRule="evenodd"
          />
        </svg>
        <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=499fd7cb01fc989f8bc1">
          Đăng ký cùng GitHub
        </a>
      </div>
    </SignButtom>
  );
}
