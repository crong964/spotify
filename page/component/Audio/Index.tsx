import React from "react";

export const ModPlay = React.lazy(
  () => import("@/page/component/Audio/ModPlay")
);
export const ButtonRandomPlay = React.lazy(
  () => import("@/page/component/Audio/ButtonRandomPlay")
);
export const PlayingBar = React.lazy(
  () => import("@/page/component/Audio/PlayingBar")
);
export const Volume = React.lazy(() => import("@/page/component/Audio/Volume"));
export const Audio2 = React.lazy(() => import("@/page/component/Audio/Audio2"));
