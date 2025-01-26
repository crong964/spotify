import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get, post } from "@/page/config/req";
import { Eye, MusicNoteBeamedIcon } from "@/icon/Icon";
import { Artist, Toggle } from "./interface";

export default function Artist() {
  const navigate = useNavigate();
  const [ls, SetLs] = useState<Artist[]>([]);
  const [count, SetCount] = useState(0);
  const [name, SetName] = useState("");

  useEffect(() => {
    post("/admin/artist/", {}, (v: any) => {
      if (v && v.err != undefined && !v.err) {
        SetLs(v.ls);
        SetCount(v.count);
      }
    });
  }, []);
  useEffect(() => {
    if (name == "") {
      return;
    }
    let s = setTimeout(() => {
      post("/search/NameArtist", { name: name }, (res: any) => {
        SetLs(res.ls);
      });
    }, 1000);
    return () => {
      clearTimeout(s);
    };
  }, [name]);

  return (
    <div>
      <div className="flex space-x-3 my-4">
        <button
          onClick={() => {
            navigate("/artist/add");
          }}
          className="px-3 py-2 bg-blue-400 text-white hover:bg-blue-500 rounded-lg "
        >
          Thêm tài khoản
        </button>
        <button
          onClick={() => {
            post("/admin/artist/getWithout", {}, (v: any) => {
              if (v && v.err != undefined && !v.err) {
                SetLs(v.ls);
              }
            });
          }}
          className="px-3 py-2 bg-blue-400 text-white hover:bg-blue-500 rounded-lg "
        >
          Danh sách ca sĩ ngoài
        </button>
        <button
          onClick={() => {
            post("/admin/artist/", {}, (v: any) => {
              if (v && v.err != undefined && !v.err) {
                SetLs(v.ls);
              }
            });
          }}
          className="px-3 py-2 bg-blue-400 text-white hover:bg-blue-500 rounded-lg "
        >
          Danh sách ca sĩ
        </button>
      </div>
      <div className="border-2 border-black p-2 rounded-xl">
        <div className="text-[20px]">Tìm tên ca sĩ</div>
        <input
          value={name}
          onChange={(v) => {
            let name = v.currentTarget.value;
            SetName(name);
          }}
          className="px-1 py-2 w-full bg-none focus:outline-none"
        />
        <button
          className="px-1 py-2 bg-blue-500 text-white rounded-lg mt-2"
          onClick={() => {
            SetName("");
            post("/admin/artist/", {}, (v: any) => {
              if (v && v.err != undefined && !v.err) {
                SetLs(v.ls);
                SetCount(v.count);
              }
            });
          }}
        >
          Reset
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3">
              thứ tự
            </th>
            <th scope="col" className="px-6 py-3">
              Ảnh
            </th>
            <th scope="col" className="px-6 py-3">
              Tên
            </th>
            <th scope="col" className="px-6 py-3">
              Xác thực
            </th>
            <th scope="col" className="px-6 py-3">
              Tháo tác
            </th>
          </tr>
        </thead>
        <tbody className="">
          {ls.map((v, i) => {
            return (
              <tr key={v.id}>
                <th scope="col" className="px-6 py-3 ">
                  {i + 1}
                </th>
                <th scope="col" className="px-6 py-3">
                  <img className="size-[100px]" src={v.pathImage} alt="" />
                </th>
                <th scope="col" className="px-6 py-3">
                  {v.Name}
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <Toggle idArtist={v.id} status={v.Vertify}></Toggle>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 flex flex-col space-y-2 items-center"
                >
                  <Link to={`/artist/${v.id}`}>
                    <Eye className="cursor-pointer size-[30px] hover:fill-green-600" />
                  </Link>
                  <Link to={`/artist/songlist/${v.id}`}>
                    <MusicNoteBeamedIcon className="cursor-pointer size-[30px] hover:fill-green-600" />
                  </Link>
                  <button
                    onClick={() => {
                      post("/admin/artist/delete", { id: v.id }, () => {
                        alert("tc");
                      });
                    }}
                  >
                    Xóa
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
        {count > ls.length ? (
          <>
            <button
              onClick={() => {
                post("/admin/artist/", { start: ls.length }, (v: any) => {
                  if (v && v.err != undefined && !v.err) {
                    SetLs([...ls, ...v.ls]);
                    SetCount(v.count);
                  }
                });
              }}
            >
              Tiếp
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function Toggle(d: Toggle) {
  const [show, SetShow] = useState(d.status == "1" ? true : false);
  const han = () => {
    post(
      "/admin/artist/VertifyArtist",
      { idArtist: d.idArtist, status: d.status == "1" ? "0" : "1" },
      (v: any) => {
        if (!v.err) {
          SetShow(!show);
        }
      }
    );
  };
  return (
    <div onClick={han} className="flex justify-center cursor-pointer">
      <div
        className={`h-5 p-1 w-[20%] rounded-full ${
          show ? "bg-green-700" : "bg-black"
        }`}
      >
        {show ? (
          <div className="size-3  float-right bg-white rounded-full"></div>
        ) : (
          <div className="size-3 float-left bg-white rounded-full"></div>
        )}
      </div>
    </div>
  );
}
