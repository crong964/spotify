import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <Outlet></Outlet>
      <Link to={"dashboard"}>dddđ</Link>Hello testd
    </div>
  );
}
