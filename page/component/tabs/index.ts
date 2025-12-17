import React from "react";

export const TabsInput = React.lazy(
  () => import("@/page/component/tabs/TabsInput")
);
export const Tab = React.lazy(() => import("@/page/component/tabs/Tab"));
export const TabsSelect = React.lazy(
  () => import("@/page/component/tabs/TabsSelect")
);
