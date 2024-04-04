import React, { useEffect, useRef, useState } from "react";
import { RootHome, ShowRecentList } from "../RootRedux";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../config/req";

interface MainDiscuss {
  Discuss_Id: string;
  Replay_quality: number;
  Content: string;
  Name: string;
  pathImage: string;
}
interface Replay {
  Parent_discuss_Id: string;
  Content: string;
  Discuss_Id: string;
  Name: string;
  pathImage: string;
}
export default function Discuss() {
  const recentList = useSelector((s: RootHome) => s.rootHome.recentList);
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  const [mainDiscussList, SetMainDiscussList] = useState<MainDiscuss[]>([]);
  const idsong = useSelector((state: RootHome) => state.rootHome.idSong);
  const [content, SetContent] = useState("");

  useEffect(() => {
    post("/discuss/", { SongId: idsong }, (v: any) => {
      SetMainDiscussList(v.ls);
      console.log(v);
    });
  }, [idsong]);
  return (
    <div className="">
      {recentList && Right == "Discuss" ? (
        <div className="bg-[#121212] space-y-4 h-full w-[400px]">
          <div className="text-white rounded-lg h-[90%] overflow-y-scroll">
            <HeaderDiscuss num={mainDiscussList.length}></HeaderDiscuss>
            <MainDiscussList list={mainDiscussList} />
          </div>
          <div className=" bg-white py-2 px-1 w-full flex justify-between">
            <div className="overflow-y-hidden w-[70%]">
              <textarea
                onChange={(v) => {
                  SetContent(v.currentTarget.value);
                }}
                className="w-full over p-3 focus:outline-none border-b border-black"
                id=""
                cols={30}
                rows={1}
              ></textarea>
            </div>
            <button
              onClick={() => {
                var song = localStorage.getItem("song");
                if (!song) {
                  return;
                }
                if (content.length <= 0) {
                  alert("chưa nhập ");
                  return;
                }
                post(
                  "/discuss/add",
                  { Song_Id: JSON.parse(song).Id, Content: content },
                  (v: any) => {}
                );
              }}
              className={`${
                content.length <= 0 ? "bg-black" : "bg-[#1FDF64]"
              } text-white px-2 py-1 rounded-3xl`}
            >
              Bình luận
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function MainDiscuss(d: MainDiscuss) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [clamped, SetClamped] = useState(false);
  const [isExpand, SetIsExpand] = useState(false);
  const [replay, SetReplay] = useState(true);
  const [showReplay, SetShowReplay] = useState(false);
  const [content, SetContent] = useState("");
  const [replaylist, SetReplayList] = useState<Replay[]>([]);
  async function handle() {
    if (contentRef && contentRef.current) {
      console.log(contentRef);
      SetClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }

  function HandleSetShowOrtherDiscuss() {
    SetShowReplay(!showReplay);
  }
  useEffect(() => {
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return (
    <div className="grid grid-cols-7  text-[16px] mt-1">
      <img
        src={d.pathImage}
        alt=""
        className="col-span-1 size-[50px] rounded-full"
        srcSet=""
      />
      <div className=" space-y-2 col-span-6">
        <div>{d.Name}</div>
        <div ref={contentRef} className={`${clamped ? "line-clamp-3" : ""}`}>
          {d.Content}
        </div>
        <div className="xem them neu cos">
          {clamped ? (
            <>
              {isExpand ? (
                <strong
                  className="cursor-pointer"
                  onClick={() => {
                    SetIsExpand(!clamped);
                  }}
                >
                  xem thêm
                </strong>
              ) : (
                <strong
                  className="cursor-pointer"
                  onClick={() => {
                    SetIsExpand(!clamped);
                  }}
                >
                  ẩn bớt
                </strong>
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        {replay ? (
          <div
            onClick={() => {
              SetReplay(!replay);
            }}
            className="text-[12px] text-[#1FDF64]  hover:text-white cursor-pointer rounded-full w-max px-2 py-2 hover:border-1 border border-black hover:border-white"
          >
            Phản hồi
          </div>
        ) : (
          <></>
        )}
      </div>

      {!replay ? (
        <div className="input replay col-span-full my-1">
          <div className="grid grid-cols-8 text-[16px] mt-1">
            <div className="col-span-1"></div>
            <img
              src="https://yt3.ggpht.com/EkVoaVZHZczMS4hz6NFPI1xdzmdFwh9PT8canS92TvtmZp3tHUEdNVem55RQIeFQsYUlextLzw=s88-c-k-c0x00ffffff-no-rj"
              alt=""
              className="col-span-1 size-[25px] rounded-full"
              srcSet=""
            />
            <div className=" space-y-2 col-span-6">
              <textarea
                onChange={(e) => {
                  SetContent(e.currentTarget.value);
                  if (
                    e.currentTarget.scrollHeight > e.currentTarget.clientHeight
                  ) {
                    e.currentTarget.rows += 1;
                  }
                }}
                name=""
                id=""
                cols={30}
                rows={1}
                className="bg-[#121212] focus:outline-none w-full py-2 text-white border-b border-white"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end items-center space-x-2 px-2">
            <div
              onClick={() => {
                SetReplay(!replay);
              }}
              className="text-[#ef506d] cursor-pointer hover:text-white"
            >
              Hủy
            </div>
            <div
              onClick={() => {
                post(
                  "/discuss/replay",
                  {
                    Replay_Discuss_Id: d.Discuss_Id,
                    Parent_discuss_Id: d.Discuss_Id,
                    Content: content,
                  },
                  (v: any) => {}
                );
              }}
              className="text-[#1FDF64] cursor-pointer hover:text-white"
            >
              Bình luận
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {d.Replay_quality == 0 ? (
        <></>
      ) : (
        <div>
          {showReplay ? (
            <div className="grid grid-cols-8 my-1">
              <div
                onClick={() => {
                  HandleSetShowOrtherDiscuss();
                }}
                className="text-[#1FDF64]  hover:text-white col-end-7 w-max cursor-pointer"
              >
                ẩn phản hồi
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-8 my-1">
              <div
                onClick={() => {
                  HandleSetShowOrtherDiscuss();
                  post(
                    "/discuss/ReplayList",
                    { ParentId: d.Discuss_Id },
                    (v: any) => {
                      SetReplayList(v.ls);
                      console.log(v);
                    }
                  );
                }}
                className="text-[#1FDF64]  hover:text-white col-end-7 w-max cursor-pointer"
              >
                {d.Replay_quality} phản hồi
              </div>
            </div>
          )}
        </div>
      )}

      {showReplay ? <ReplayList list={replaylist} /> : <></>}
    </div>
  );
}

interface MainDiscussList {
  list: MainDiscuss[];
}

function MainDiscussList(d: MainDiscussList) {
  return (
    <div className="">
      {d.list.map((v) => {
        return (
          <MainDiscuss
            Content={v.Content}
            Discuss_Id={v.Discuss_Id}
            Name={v.Name}
            Replay_quality={v.Replay_quality}
            pathImage={v.pathImage}
            key={v.Discuss_Id}
          />
        );
      })}
    </div>
  );
}

interface HeaderDiscuss {
  num: number;
}
function HeaderDiscuss(d: HeaderDiscuss) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center p-3">
      <div className="text-[20px]">{d.num} Thảo luận</div>
      <div
        onClick={() => {
          dispatch(ShowRecentList(false));
        }}
        className=" cursor-pointer font-bold w-max text-white flex justify-end text-[14px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          className="size-7"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </div>
    </div>
  );
}

interface ReplayList {
  list: Replay[];
}
function Replay(d: Replay) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [replay, SetReplay] = useState(false);
  const [clamped, SetClamped] = useState(false);
  const [content, SetContent] = useState("");
  const [isExpand, SetIsExpand] = useState(false);
  async function handle() {
    if (contentRef && contentRef.current) {
      SetClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return (
    <div className="grid grid-cols-8 text-[16px] mt-1">
      <div className="col-span-1"></div>
      <img
        src={d.pathImage}
        alt=""
        className="col-span-1 size-[25px] rounded-full"
        srcSet=""
      />
      <div className=" space-y-2 col-span-6">
        <div>{d.Name}</div>
        <div ref={contentRef} className={`${clamped ? "line-clamp-3" : ""}`}>
          {d.Content}
        </div>

        {clamped ? (
          <div>
            {isExpand ? (
              <strong
                className="cursor-pointer"
                onClick={() => {
                  SetIsExpand(!isExpand);
                }}
              >
                xem thêm
              </strong>
            ) : (
              <strong
                className="cursor-pointer"
                onClick={() => {
                  SetIsExpand(!isExpand);
                }}
              >
                ẩn bớt
              </strong>
            )}
          </div>
        ) : (
          <></>
        )}

        {!replay ? (
          <div
            onClick={() => {
              SetReplay(true);
            }}
            className="text-[12px] cursor-pointer border-black rounded-full w-max px-2 py-2 hover:border-1 hover:border-white border "
          >
            Phản hồi
          </div>
        ) : (
          <></>
        )}
        {replay ? (
          <div className="input replay col-span-full my-1">
            <div className="grid grid-cols-8 text-[16px] mt-1">
              <img
                src={d.pathImage}
                alt=""
                className="col-span-1 size-[25px] rounded-full"
                srcSet=""
              />
              <div className=" space-y-2 col-span-7">
                <textarea
                  wrap="on"
                  onChange={(e) => {
                    SetContent(e.currentTarget.value);
                    if (
                      e.currentTarget.scrollHeight >
                      e.currentTarget.clientHeight
                    ) {
                      e.currentTarget.rows += 1;
                    }
                  }}
                  name=""
                  id=""
                  cols={30}
                  rows={1}
                  value={content}
                  className="bg-[#121212] focus:outline-none w-full py-2 text-white border-b border-white"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-2 px-2">
              <div
                onClick={() => {
                  SetReplay(!replay);
                }}
                className="text-[#ef506d] cursor-pointer hover:text-white"
              >
                Hủy
              </div>
              <div
                onClick={() => {
                  if (content == "") {
                    return;
                  }
                  post(
                    "/discuss/replay",
                    {
                      Replay_Discuss_Id: d.Discuss_Id,
                      Parent_discuss_Id: d.Parent_discuss_Id,
                      Content: content,
                    },
                    (v: any) => {
                      if (v.err) {
                        alert("thaats baij");
                      } else {
                        alert("thanh cong");
                        SetContent("");
                      }
                    }
                  );
                }}
                className={`${
                  content.length == 0 ? "text-black" : "text-[#1FDF64]"
                } cursor-pointer hover:text-white`}
              >
                Bình luận
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function ReplayList(d: ReplayList) {
  return (
    <div className="col-span-full">
      {d.list.map((v) => {
        return (
          <Replay
            Content={v.Content}
            Discuss_Id={v.Discuss_Id}
            Name={v.Name}
            pathImage={v.pathImage}
            key={v.Discuss_Id}
            Parent_discuss_Id={v.Parent_discuss_Id}
          />
        );
      })}
    </div>
  );
}
