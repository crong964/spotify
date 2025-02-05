import { LegacyRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootHome, SetCurName } from "@/page/Route/home/RootRedux";
import { artist } from "../PlayListPage/PlayListPage";
import { SongList } from "@/page/component/Song/Index";
import { useParams } from "react-router-dom";
import { get, post } from "@/page/config/req";
import React from "react";
import PlayButtom from "@/page/component/PlayButtom";
import { CheckCircleIcon, PlusCircleIcon } from "@/icon/Icon";
import TypeFriend from "@/page/component/friend/TypeFriend";
import { SongInPlayList } from "@/page/component/Song/interface";
import { Avatar } from "@/page/component/avatar";
import { iPlayList } from "@/page/component/Playlist/interface";
import PlayLists from "@/page/component/Playlist/Playlist";

export default function ArtistPage() {
  const Right = useSelector((state: RootHome) => state.rootHome.Right);
  const [lsartist, SetLsAtist] = useState<iPlayList[]>([]);
  const [artist, SetaAtist] = useState<artist>();
  const [isfriend, SetIsfriend] = useState<"-1" | "0" | "1" | "2">();
  const [songs, SetSongS] = useState<SongInPlayList[]>([]);
  const [like, SetLike] = useState(false);
  const refPage = useRef<HTMLDivElement>(null);
  const refText = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLogin = useSelector(
    (state: RootHome) => state.rootauth.login.IsLogin
  );
  const [fontsize, SetFontSire] = useState(96);
  useEffect(() => {
    get(`/user/artistpage/${id}`, (v: any) => {
      if (!v || v.err) {
        return;
      }
      SetIsfriend(v.isfriend);
      SetaAtist(v.atist);
      SetSongS(v.lsong);
      SetLsAtist(v.lsplaylistartist);
      dispatch(SetCurName(v.atist.ChanalName));
      SetLike(v.like);
      if (refPage.current) {
        refPage.current.scrollIntoView();
      }
    });
  }, [id]);

  useEffect(() => {
    let leg = refText.current?.innerText;
    if (leg && Right != "") {
      let width = leg.length * 46;
      let limit = 650;
      if (width > limit) {
        let fs = Math.floor(96 * (1 - (width - limit) / width));
        SetFontSire(fs);
      }
    } else {
      SetFontSire(96);
    }
  }, [Right]);
  return (
    <div className="relative " ref={refPage}>
      {artist?.Banner !== "" ? (
        <div
          className="hidden sm:block bg-no-repeat bg-cover bg-blend-color rounded-t-lg absolute top-0 left-0 w-full h-[340px] "
          style={{
            backgroundImage: `url(${artist?.Banner || ""})`,
          }}
        ></div>
      ) : (
        <>
          <div
            className="hidden sm:block bg-no-repeat bg-cover rounded-t-lg absolute top-0 left-0 w-full h-[340px] "
            style={{
              backgroundImage: `url(${artist?.pathImage || ""})`,
            }}
          ></div>
        </>
      )}

      <div
        className="block sm:hidden bg-no-repeat bg-cover rounded-t-lg absolute top-0 left-0 w-full h-[320px]"
        style={{ backgroundImage: `url(${artist?.pathImage || ""})` }}
      ></div>
      <div className="opacity-25 bg-black absolute top-0 left-0 w-full h-[340px]"></div>
      <div className="flex items-end p-2">
        {artist?.Banner !== "" ? (
          <></>
        ) : (
          <Avatar
            className="size-[250px] hidden sm:block  rounded-full"
            src={artist?.pathImage || ""}
          />
        )}
        <div className="flex flex-col justify-end h-[320px] z-10 p-4">
          <div className="flex items-center">
            <svg
              fill="blue"
              aria-hidden="true"
              className="fill-blue-600 size-[20px]"
              viewBox="0 0 24 24"
            >
              <path d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"></path>
            </svg>
            <span className="font-normal text-[14px] text-white">
              Nghệ sĩ được xác minh
            </span>
          </div>
          <h1>
            <span
              style={{ fontSize: artist?.Banner == "" ? fontsize : 96 }}
              ref={refText}
              onClick={() => {
                alert(refText.current?.innerText.length);
              }}
              className="text-white ChanalName hidden sm:block font-bol text-[40px] line-clamp-1  font-black"
            >
              {artist?.ChanalName}
            </span>
            <span className="text-white ChanalName block sm:hidden font-bol text-[40px] line-clamp-1  font-black">
              {artist?.ChanalName}
            </span>
          </h1>
          <span className="text-[16px] font-bold text-white">
            1.235.194 người nghe hằng tháng
          </span>
        </div>
      </div>

      <div className="sm:px-4">
        <div className="flex items-center py-4 space-x-4">
          <PlayButtom id={id || ""} page="artist" />
          {isLogin ? (
            <>
              {like ? (
                <button
                  className="font-bold cursor-pointer text-[14px] border-2 border-white text-white rounded-full px-2 py-1"
                  onClick={() => {
                    post(
                      "/likePlaylist/delete",
                      { idPlaylist: id },
                      (v: any) => {
                        if (v) {
                          SetLike(!like);
                        }
                      }
                    );
                  }}
                >
                  Đang Theo dõi
                </button>
              ) : (
                <button
                  className="font-bold cursor-pointer text-[14px] border-2 border-white text-white rounded-full px-2 py-1"
                  onClick={() => {
                    post("/likePlaylist/add", { idPlaylist: id }, (v: any) => {
                      if (v) {
                        SetLike(!like);
                      }
                    });
                  }}
                >
                  Theo dõi
                </button>
              )}
            </>
          ) : (
            <></>
          )}
          <div className="cursor-pointer">
            <svg
              className="fill-[#C7C7C7] hover:fill-white size-[45px] "
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
            </svg>
          </div>
          <TypeFriend idFriend={artist?.id} type={isfriend} />
        </div>
        <div className="py-3 font-bold text-[24px]  text-white">
          Các bài hát
        </div>
        <SongList data={songs} type="artist" />
        <PlayLists d={lsartist} title="Nghệ sĩ xuất hiện"></PlayLists>
        <footer className="h-5"></footer>
      </div>
    </div>
  );
}
