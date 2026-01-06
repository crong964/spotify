import React from "react";

const PlaylistLoading = () => {
  return (
    <div className="relative animate-pulse">
      <div className="bg-gray-400 rounded-t-lg absolute top-0 left-0 w-full h-[320px] flex flex-col justify-end "></div>
      <div className="h-[320px]"></div>
      <div className="sm:px-4 py-2">
        <div className="flex items-center py-0 py-4 gap-5 max-sm:px-1 ">
          <div className="rounded bg-gray-400 w-[120px] h-[30px]"></div>
          <div className="rounded bg-gray-400 w-[120px] h-[30px]"></div>
          <div className="rounded bg-gray-400 w-[120px] h-[30px]"></div>
        </div>
        <div className="rounded w-[480px] h-[30px] bg-gray-400"></div>
        {Array.from({ length: 1 }).map((_, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-7  py-2 cursor-pointer  text-white font-bold rounded-sm items-center"
            >
              <div className="col-span-5 grid grid-cols-5 items-center">
                <div className="col-span-5 sm:col-span-3 flex items-center space-x-2">
                  <div className="size-12 sm:size-9 bg-gray-400 rounded"></div>
                  <div className="flex-col bg-gray-400 flex-1 h-12 sm:h-9 rounded"></div>
                </div>
                <div className="sm:block hidden rounded col-span-2  mx-2 h-12 sm:h-9 bg-gray-400"></div>
              </div>
              <div className="col-span-2  items-center h-12 sm:h-9 mx-2 bg-gray-400 rounded space-x-4"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistLoading;
