import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Index from "./Index";

//@ts-ignore
createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/test">
    <Routes>
      <Route path="*" element={<Outlet />}>
        <Route path="" element={<Index></Index>} />
        <Route path="dashboard" element={<Dashboard></Dashboard>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
