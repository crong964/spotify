import axios from "axios";
import React from "react";

export function post(url: string, body: any, cb: any) {
  axios
    .post(url, body, {
      headers: {
        type: "web",
      },
    })
    .then((v) => {
      if (v.data) {
        cb(v.data);
      }
    })
    .catch((v) => {
      cb(null);
    });
}

export function get(url: string, cb: any) {
  axios
    .get(url, { headers: { api: true, type: "web" } })
    .then((v) => {
      cb(v.data);
    })
    .catch((v) => {
      console.log(v);

      cb(null);
    });
}
export async function get2(url: string) {
  try {
    let data = await axios.get(url, { headers: { api: true, type: "web" } });
    return data.data;
  } catch (error) {
    return undefined;
  }
}
export async function post2(url: string, body: any) {
  try {
    let data = await axios.post(url, body, {
      headers: {
        type: "web",
      },
    });
    return data.data;
  } catch (error) {
    return undefined;
  }
}
interface Duration {
  Duration: string;
}
export function Duration(d: Duration) {
  var da = parseInt(d.Duration + "");
  var minutes = Math.floor(da / 60);
  var second = da % 60;
  return (
    <>
      {minutes}:{second}
    </>
  );
}
export function streaming(url: string, body: any, cb: any) {
  axios
    .post(url, body, {
      headers: {
        type: "web",
        api: true,
      },
      responseType: "arraybuffer",
    })
    .then((v) => {
      if (v.data) {
        cb(v.data);
      }
    })
    .catch((v) => {
      cb(null);
    });
}
