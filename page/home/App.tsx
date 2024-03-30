import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./Index";
import { Provider } from "react-redux";
import rootHome from "./RootRedux";

//@ts-ignore
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={rootHome}>
    <Index />
  </Provider>
);
