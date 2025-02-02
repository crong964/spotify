import React, { useState } from "react";
import { Pop } from "@/page/component/pop";
import { iPopEditPlaylis, PlaylistForm } from "./interface";
import { MusicNoteBeamedIcon, XIcon } from "@/icon/Icon";
import { Avatar } from "@/page/component/avatar";
import { post } from "@/page/config/req";

export default function PopEditPlaylis(p: iPopEditPlaylis) {
  const [file, SetFile] = useState<File>();
  const [playlistform, SetPlaylistForm] = useState<PlaylistForm>({
    Discripition: "",
    id: "",
    ImagePath: "",
    PlayListName: "",
  });
  return (
    <Pop left={0} top={0}>
      <div className="  relative">
        <div className="w-screen h-[100vh] opacity-20 bg-black absolute top-0 left-0 z-0"></div>
        <div
          onClick={() => {
            p.onShow(false);
          }}
          className="w-screen h-[100vh] absolute top-0 left-0 z-10 flex justify-center items-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              p.onShow(true);
            }}
            className="w-[524px] min-h-[384px] bg-[#282828] rounded-lg"
          >
            <div className="p-6 flex items-center">
              <div className="flex-1 text-[24px] font-bold">Edit details</div>
              <div
                onClick={() => {
                  p.onShow(false);
                }}
              >
                <XIcon className="fill-white size-8 hover:fill-green-400 cursor-pointer" />
              </div>
            </div>
            <div className="min-h-[170px] px-6 grid grid-cols-8 grid-rows-8 gap-4">
              <input
                onChange={(e) => {
                  var files = e.currentTarget.files;
                  if (files != null && files.length > 0) {
                    var file = URL.createObjectURL(files[0]);
                    SetFile(files[0]);
                    SetPlaylistForm({
                      ...playlistform,
                      ImagePath: file,
                    });
                  }
                }}
                type="file"
                className="hidden"
                id="file"
                name="file"
              />
              <label
                htmlFor="file"
                className="col-span-3 row-span-8 bg-[#3E3E3E] flex justify-center items-center"
              >
                {playlistform.ImagePath ? (
                  <Avatar className="size-full" src={playlistform.ImagePath} />
                ) : (
                  <MusicNoteBeamedIcon className="size-16 fill-white" />
                )}
              </label>
              <div className=" col-span-5 row-span-8 grid grid-rows-8 grid-cols-1 gap-4">
                <input
                  onChange={(v) => {
                    let name = v.currentTarget.value;
                    SetPlaylistForm({
                      ...playlistform,
                      PlayListName: name,
                    });
                  }}
                  value={playlistform.PlayListName}
                  placeholder="Tên danh sách"
                  className="col-span-1 focus:outline-none row-span-2 bg-[#3E3E3E]"
                />

                <div
                  onChange={(v) => {
                    let name = v.currentTarget.innerText;
                    SetPlaylistForm({
                      ...playlistform,
                      Discripition: name,
                    });
                  }}
                  contentEditable={true}
                  className="col-span-1 focus:outline-none row-span-6 bg-[#3E3E3E]"
                >
                  {playlistform.Discripition}
                </div>
              </div>
            </div>
            <div className="flex justify-end py-2 px-6">
              <button
                onClick={() => {
                  let form = new FormData();
                  form.set("PlayListName", playlistform.PlayListName);
                  form.set("id", playlistform.id);
                  form.set("Discripition", playlistform.Discripition);
                  if (file) {
                    form.set("avatar", file);
                  }
                  post("/playlist/update", form, (v: any) => {
                    if (!v.err) {
                      p.onChange(playlistform);
                    }
                  });
                }}
                className="bg-white text-[18px] px-3 py-2 text-black rounded-full"
              >
                Save
              </button>
            </div>
            <div className="line-clamp-2 text-[12px] font-bold px-6">
              By proceeding, you agree to give Spotify access to the image you
              choose to upload. Please make sure you have the right to upload
              the image.
            </div>
          </div>
        </div>
      </div>
    </Pop>
  );
}
