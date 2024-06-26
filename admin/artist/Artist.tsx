import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get, post } from "../../page/config/req";
type Artist = {
  Nationality: string;
  ChanalName: string;
  Name: string;
  description: string;
  pathImage: string;
  Banner: string;
  id: string;
  Vertify: string;
};
type Toggle = {
  status: string;
  idArtist: string;
};
export default function Artist() {
  const navigate = useNavigate();
  const [ls, SetLs] = useState<Artist[]>([]);

  useEffect(() => {
    post("/admin/artist/", {}, (v: any) => {
      if (v && v.err != undefined && !v.err) {
        SetLs(v.ls);
      }
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/artist/add");
        }}
        className="px-3 py-2 bg-blue-400 text-white hover:bg-blue-500 rounded-lg my-4"
      >
        Thêm tài khoản
      </button>
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
                  {i}
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
                <th scope="col" className="px-6 py-3 flex items-center">
                  <Link to={`/artist/${v.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-eye cursor-pointer size-[30px] hover:fill-green-600"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  </Link>
                  <Link to={`/artist/songlist/${v.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-eye cursor-pointer size-[30px] hover:fill-green-600"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                      <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
                      <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                    </svg>
                  </Link>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function AddArtist() {
  const navigate = useNavigate();
  const [banner, SetBanner] = useState<File>();
  const [avatar, SetAvatar] = useState<File>();
  const [load, SetLoad] = useState(false);
  const [inforArtist, SetInforArtist] = useState<Artist>({
    Banner: "",
    ChanalName: "",
    description: "Đây là nghệ sĩ tài năng",
    Name: "",
    Nationality: "Việt Nam",
    pathImage: "",
    id: "",
    Vertify: "",
  });

  const submit = (e: any) => {
    if (load == true) {
      return;
    }
    e.preventDefault();
    var form = new FormData();
    const myObj: { [key: string]: any } = inforArtist;

    for (const key in myObj) {
      form.set(key, myObj[key]);
    }
    if (banner != undefined) {
      form.set("Banner", banner);
    } else {
      alert("chưa có banner");
      return;
    }
    if (avatar != undefined) {
      form.set("pathImage", avatar);
    } else {
      alert("chưa có banner");
      return;
    }
    SetLoad(true);
    post("/admin/artist/add", form, (v: any) => {
      SetLoad(false);
    });
  };
  return (
    <>
      <button
        onClick={() => {
          navigate("/user/artist/");
        }}
        className="px-3 py-2 bg-blue-400 text-white hover:bg-blue-500 rounded-lg my-4"
      >
        Quay lại
      </button>
      <form className="w-full min-h-[1000px]" onSubmit={submit}>
        <label
          htmlFor="banner"
          className="w-full cursor-pointer flex justify-center space-x-4 h-[320px] rounded-xl border-black border-2 items-center "
        >
          <input
            type="file"
            onChange={(e) => {
              var files = e.currentTarget.files;
              if (files != null && files.length > 0) {
                var file = URL.createObjectURL(files[0]);
                SetBanner(files[0]);
                SetInforArtist({
                  ...inforArtist,
                  Banner: file,
                });
              }
            }}
            name=""
            className="hidden"
            id="banner"
          />
          {inforArtist.Banner == "" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-cloud-arrow-up size-[100px]"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              <div className="text-5xl">tải banner</div>
            </>
          ) : (
            <div
              className=" bg-no-repeat bg-cover rounded-t-lg w-full h-[320px] "
              style={{ backgroundImage: `url(${inforArtist.Banner})` }}
            ></div>
          )}
        </label>
        <div className="flex mt-2">
          <label
            htmlFor="avatar"
            className="flex justify-center rounded-xl items-center size-[250px] border-black border-2"
          >
            <input
              onChange={(e) => {
                var files = e.currentTarget.files;
                if (files != null && files.length > 0) {
                  var file = URL.createObjectURL(files[0]);
                  SetAvatar(files[0]);
                  SetInforArtist({
                    ...inforArtist,
                    pathImage: file,
                  });
                }
              }}
              required
              type="file"
              className="hidden"
              id="avatar"
            />
            {inforArtist.pathImage == "" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-cloud-arrow-up size-[20px]"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                  />
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                <div className="text-2xl">tải ảnh</div>
              </>
            ) : (
              <img
                src={inforArtist.pathImage}
                alt=""
                className="w-[250px] h-auto"
                srcSet=""
              />
            )}
          </label>
          <div className="p-2 flex-1">
            <div contentEditable className="text-3xl text-center p-2 mb-6">
              thông tin nghệ sĩ
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Tên nghệ sĩ
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  onChange={(e) => {
                    var value = e.currentTarget.value;
                    SetInforArtist({
                      ...inforArtist,
                      Name: value,
                    });
                  }}
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="ChanalName"
                >
                  Tên kênh
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  onChange={(e) => {
                    var value = e.currentTarget.value;
                    SetInforArtist({
                      ...inforArtist,
                      ChanalName: value,
                    });
                  }}
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="ChanalName"
                  type="text"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="Nationality"
                >
                  Quốc tịch
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  onChange={(e) => {
                    var value = e.currentTarget.value;
                    SetInforArtist({
                      ...inforArtist,
                      Nationality: value,
                    });
                  }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="Nationality"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="description"
                >
                  Mô tả
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  onChange={(e) => {
                    var value = e.currentTarget.value;
                    SetInforArtist({
                      ...inforArtist,
                      description: value,
                    });
                  }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="description"
                  type="text"
                  value="Đây là nghệ sĩ tài năng"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className={`px-3 py-2 rounded-xl bg-blue-500 text-white ${
            load == true ? "cursor-wait" : "cursor-pointer"
          }`}
        >
          Thêm
        </button>
      </form>
    </>
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
export function ArtistDetail() {
  const [load, SetLoad] = useState(false);
  const [banner, SetBanner] = useState<File>();
  const [avatar, SetAvatar] = useState<File>();
  const [inforArtist, SetInforArtist] = useState<Artist>({
    Banner: "",
    ChanalName: "",
    description: "Việt Nam",
    Name: "",
    Nationality: "Việt Nam",
    pathImage: "",
    id: "",
    Vertify: "",
  });
  let { idArtist } = useParams();
  useEffect(() => {
    post("/admin/artist/Get", { idArtist: idArtist }, (v: any) => {
      if (!v.err) {
        SetInforArtist(v.ls);
      }
    });
  }, []);
  const h = "";
  const submit = (e: any) => {
    if (load == true) {
      return;
    }
    SetLoad(true);
    e.preventDefault();
    var form = new FormData();
    const myObj: { [key: string]: any } = inforArtist;

    for (const key in myObj) {
      form.set(key, myObj[key]);
    }
    if (banner != undefined) {
      form.set("Banner", banner);
    }
    if (avatar != undefined) {
      form.set("pathImage", avatar);
    }
    post("/admin/artist/update", form, (v: any) => {
      SetLoad(false);
    });
  };
  return (
    <>
      <div className="p-2">
        <Link
          to={"/artist"}
          className="px-3 py-2 bg-blue-400 text-white hover:bg-blue-500 rounded-lg my-4"
        >
          Trở về
        </Link>
      </div>
      <form className="w-full min-h-[1000px]" onSubmit={submit}>
        <label
          htmlFor="banner"
          className="w-full cursor-pointer flex justify-center space-x-4 h-[320px] rounded-xl border-black border-2 items-center "
        >
          <input
            type="file"
            onChange={(e) => {
              var files = e.currentTarget.files;
              if (files != null && files.length > 0) {
                var file = URL.createObjectURL(files[0]);
                SetBanner(files[0]);
                SetInforArtist({
                  ...inforArtist,
                  Banner: file,
                });
              }
            }}
            name=""
            className="hidden"
            id="banner"
          />
          {inforArtist.Banner == "" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-cloud-arrow-up size-[100px]"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              <div className="text-5xl">tải banner</div>
            </>
          ) : (
            <div
              className=" bg-no-repeat bg-cover rounded-t-lg w-full h-[320px] "
              style={{ backgroundImage: `url(${inforArtist.Banner})` }}
            ></div>
          )}
        </label>
        <div className="flex mt-2">
          <label
            htmlFor="avatar"
            className="flex justify-center rounded-xl items-center size-[250px] border-black border-2"
          >
            <input
              onChange={(e) => {
                var files = e.currentTarget.files;
                if (files != null && files.length > 0) {
                  var file = URL.createObjectURL(files[0]);
                  SetAvatar(files[0]);
                  SetInforArtist({
                    ...inforArtist,
                    pathImage: file,
                  });
                }
              }}
              type="file"
              className="hidden"
              id="avatar"
            />
            {inforArtist.pathImage == "" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-cloud-arrow-up size-[20px]"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                  />
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                <div className="text-2xl">tải ảnh</div>
              </>
            ) : (
              <img
                src={inforArtist.pathImage}
                alt=""
                className="w-[250px] h-auto"
                srcSet=""
              />
            )}
          </label>
          <div className="p-2 flex-1">
            <div contentEditable className="text-3xl text-center p-2 mb-6">
              thông tin nghệ sĩ
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Tên nghệ sĩ
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  onChange={(e) => {
                    var value = e.currentTarget.value;
                    SetInforArtist({
                      ...inforArtist,
                      Name: value,
                    });
                  }}
                  value={inforArtist.Name}
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="ChanalName"
                >
                  Tên kênh
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  onChange={(e) => {
                    var value = e.currentTarget.value;
                    SetInforArtist({
                      ...inforArtist,
                      ChanalName: value,
                    });
                  }}
                  value={inforArtist.ChanalName}
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="ChanalName"
                  type="text"
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="Nationality"
                >
                  Quốc tịch
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  onChange={(e) => {
                    var value = e.currentTarget.value;
                    SetInforArtist({
                      ...inforArtist,
                      Nationality: value,
                    });
                  }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="Nationality"
                  type="text"
                  value={inforArtist.Nationality}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/5 ">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="description"
                >
                  Mô tả
                </label>
              </div>
              <div className="md:w-4/5">
                <input
                  onChange={(e) => {
                    var value = e.currentTarget.value;
                    SetInforArtist({
                      ...inforArtist,
                      description: value,
                    });
                  }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="description"
                  type="text"
                  value={inforArtist.description}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className={`px-3 py-2 rounded-xl bg-blue-500 text-white ${
            load == true ? "cursor-wait" : "cursor-pointer"
          }`}
        >
          Chỉnh sửa
        </button>
      </form>
    </>
  );
}
