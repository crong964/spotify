import React from "react";
type icon = {
  className: string;
};
export function ArtistIcon(d: icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={d.className}
      viewBox="0 -960 960 960"
    >
      <path d="M746-601h128v82h-74v258q0 37.08-26.66 63.54Q746.67-171 708.06-171q-39.46 0-66.76-26.44-27.3-26.45-27.3-63Q614-297 639.96-323t62.08-26q14.96 0 26.46 5t17.5 9v-266ZM124-171v-83q0-26 14.5-51t43.5-39q60-29 119.5-43.5T422-402q41 0 76.5 5t67.5 17q-16 6-30 15.5T513-341q-19-4-43.52-5.5Q444.96-348 422-348q-56 0-110 13.5T207-296q-16 7-22.5 19t-6.5 23v29h321q2 17 6.38 30.67Q509.75-180.67 517-171H124Zm298-353q-54.55 0-92.27-37.72Q292-599.45 292-654q0-54.55 37.73-92.28Q367.45-784 422-784t92.28 37.72Q552-708.55 552-654q0 54.55-37.72 92.28Q476.55-524 422-524Zm0-54q32 0 54-22t22-54q0-32-22-54t-54-22q-32 0-54 22t-22 54q0 32 22 54t54 22Zm0-76Zm0 429Z" />
    </svg>
  );
}
export function HumanIcon(d: icon) {
  return (
    <svg
      className={d.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export function SongIcon(d: icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={d.className}
      viewBox="0 -960 960 960"
    >
      <path d="M491.08-360q36.92 0 62.42-25.56T579-448v-230h116v-70H545v234q-11.12-11-25.06-16.5T491-536q-36.88 0-62.44 25.58Q403-484.83 403-447.92q0 36.92 25.58 62.42 25.59 25.5 62.5 25.5ZM335-262q-36.73 0-61.36-24.64Q249-311.27 249-348v-424q0-36.72 24.64-61.36Q298.27-858 335-858h424q36.72 0 61.36 24.64T845-772v424q0 36.73-24.64 61.36Q795.72-262 759-262H335Zm0-54h424q12 0 22-10t10-22v-424q0-12-10-22t-22-10H335q-12 0-22 10t-10 22v424q0 12 10 22t22 10ZM201-128q-36.73 0-61.36-24.64Q115-177.27 115-214v-478h54v478q0 12 10 22t22 10h478v54H201Zm102-676v488-488Z" />
    </svg>
  );
}
export function GenresIcon(d: icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={d.className}
    >
      <path d="M401.76-254q45.74 0 77.99-32.08Q512-318.17 512-364v-252h112v-82H470v250q-15-9-32.28-17.5Q420.43-474 402-474q-45.83 0-77.92 32.01Q292-409.97 292-364.24q0 45.74 32.01 77.99Q356.03-254 401.76-254Zm78.41 154q-78.81 0-148.21-29.91T211.23-211.1q-51.34-51.28-81.28-120.59Q100-401.01 100-479.83q0-79.07 29.97-148.69t81.35-121.13q51.38-51.5 120.59-80.92Q401.13-860 479.83-860q79.06 0 148.67 29.39 69.62 29.39 121.13 80.85 51.52 51.46 80.94 121.02Q860-559.18 860-480.09t-29.39 148.15q-29.39 69.06-80.84 120.49-51.44 51.44-120.98 81.45-69.55 30-148.62 30Zm-.17-54q136.51 0 231.26-94.74Q806-343.49 806-480t-94.74-231.26Q616.51-806 480-806t-231.26 94.74Q154-616.51 154-480t94.74 231.26Q343.49-154 480-154Zm0-326Z" />
    </svg>
  );
}
export function QueueIcon(d: icon) {
  return (
    <svg
      data-encore-id="icon Queue"
      role="img"
      className={d.className}
      aria-hidden="true"
      viewBox="0 0 16 16"
    >
      <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
    </svg>
  );
}
export function MuteVolumeIcon(d: icon) {
  return (
    <svg
      data-encore-id="icon"
      role="presentation"
      aria-label="Đang tắt tiếng"
      aria-hidden="true"
      id="volume-icon"
      viewBox="0 0 16 16"
      className={d.className}
    >
      <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
      <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
    </svg>
  );
}
export function SmallVolumeIcon(d: icon) {
  return (
    <svg
      data-encore-id="icon"
      role="presentation"
      aria-label="Âm lượng thấp"
      aria-hidden="true"
      id="volume-icon"
      viewBox="0 0 16 16"
      className={d.className}
    >
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    </svg>
  );
}
export function MediumVolumeIcon(d: icon) {
  return (
    <svg
      data-encore-id="icon"
      role="presentation"
      aria-label="Âm lượng trung bình"
      aria-hidden="true"
      id="volume-icon"
      viewBox="0 0 16 16"
      className={d.className}
    >
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
    </svg>
  );
}
export function BigVolumeIcon(d: icon) {
  return (
    <svg
      data-encore-id="icon"
      role="presentation"
      aria-label="Âm lượng cao"
      aria-hidden="true"
      id="volume-icon"
      viewBox="0 0 16 16"
      className={d.className}
    >
      <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
      <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
    </svg>
  );
}
export function PlaySoundIcon(d: icon) {
  return (
    <svg
      className={d.className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
    </svg>
  );
}
export function PauseSoundIcon(d: icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={d.className}
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z" />
    </svg>
  );
}
export function DiscussIcon(d: icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      className={d.className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    </svg>
  );
}
export function SkipPreviousIcon(d: icon) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={d.className}>
      <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
    </svg>
  );
}
export function SkipNextIcon(d: icon) {
  return (
    <svg className={d.className} aria-hidden="true" viewBox="0 0 16 16">
      <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
    </svg>
  );
}
export function RepeatSongIcon(d: icon) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={d.className}>
      <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"></path>
      <path d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>
    </svg>
  );
}
export function RepeatPlaylistIcon(d: icon) {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={d.className}
    >
      <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
    </svg>
  );
}
export function NoRepeat(d: icon) {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={d.className}
    >
      <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
    </svg>
  );
}
export function RandomPlayIcon(d: icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={d.className}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
      />
      <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
    </svg>
  );
}
export function HomeIcon(params: icon) {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      className={params.className}
      viewBox="0 0 24 24"
    >
      <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
    </svg>
  );
}
export function HomeFillIcon(params: icon) {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      className={params.className}
      viewBox="0 0 24 24"
    >
      <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
    </svg>
  );
}
export function MessIcon(params: icon) {
  return (
    <svg
      viewBox="0 0 12 13"
      width="20"
      height="20"
      className={params.className}
    >
      <g fillRule="evenodd" transform="translate(-450 -1073)">
        <path d="m459.603 1077.948-1.762 2.851a.89.89 0 0 1-1.302.245l-1.402-1.072a.354.354 0 0 0-.433.001l-1.893 1.465c-.253.196-.583-.112-.414-.386l1.763-2.851a.89.89 0 0 1 1.301-.245l1.402 1.072a.354.354 0 0 0 .434-.001l1.893-1.465c.253-.196.582.112.413.386M456 1073.5c-3.38 0-6 2.476-6 5.82 0 1.75.717 3.26 1.884 4.305.099.087.158.21.162.342l.032 1.067a.48.48 0 0 0 .674.425l1.191-.526a.473.473 0 0 1 .32-.024c.548.151 1.13.231 1.737.231 3.38 0 6-2.476 6-5.82 0-3.344-2.62-5.82-6-5.82"></path>
      </g>
    </svg>
  );
}
