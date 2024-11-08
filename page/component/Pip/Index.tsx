import React from "react";

export const Pip = React.lazy(
    () => import("@/page/component/Pip/Pip")
);
export const PiPWindow = React.lazy(
    () => import("@/page/component/Pip/PiPWindow")
);