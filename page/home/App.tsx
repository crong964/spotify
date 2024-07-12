import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./Index";
import { Provider } from "react-redux";
import rootHome from "./RootRedux";
import "../../public/css/Share.css";
import { BrowserRouter } from "react-router-dom";
import IndexTest from "./IndexTest";
//@ts-ignore
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter
    basename="/"
    children={
      <Provider store={rootHome}>
        <IndexTest />
      </Provider>
    }
  />
);
