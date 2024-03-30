import axios from "axios";
import { Router, Response, Request } from "express";
import path from "path";
import { Hash } from "../config/Hash";
import userService from "../services/UserService";
import UserModel from "../model/UserModel";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer"
import "dotenv/config"
interface google {
  email: string;
  name: string;
  picture: string;
}
const client_secret_si = process.env.CLIENT_SECRET_SI;
const client_id_si = process.env.CLIENT_ID_SI;
console.log("npm i dotenv",client_id_si);

const client_secret_su = process.env.CLIENT_SECRET_SU;
const client_id_su = process.env.CLIENT_ID_SU;
const Account = Router();

Account.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/web/auth.html"));
});
Account.post("/signin", async (req, res) => {
  const account = req.body.account
  const password = req.body.password
  var acc = await userService.GetByAccount(account)

  if (!acc || acc.Password != password) {
    res.redirect("/auth")
    return
  }
  SetCookie(res, acc)
});
Account.get("/github", async (req, res) => {
  var code = req.query.code;
  var url = `https://github.com/login/oauth/access_token?client_id=${client_id_si}&client_secret=${client_secret_si}&code=${code}`;

  var r = await axios.post(
    url,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  // {
  //   "access_token": "",
  //   "token_type": "",
  //   "scope": ""
  // }
  var c;
  try {
    c = await Promise.all([
      axios.get("https://api.github.com/user/emails", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${r.data.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }),
      axios.get("https://api.github.com/user", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${r.data.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }),
    ]);
  } catch (error) {
    console.log("loo");
    res.redirect("/auth");
    return
  }
  // [
  //   {
  //     email: "huy91027@gmail.com",
  //     primary: true,
  //     verified: true,
  //     visibility: "private",
  //   },
  //   {
  //     email: "71593544+crong964@users.noreply.github.com",
  //     primary: false,
  //     verified: true,
  //     visibility: null,
  //   },
  // ];


  //avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4'
  var acc = await userService.GetByAccount(c[0].data[0].email)
  if (!acc) {
    res.redirect("/auth")
    return
  }

  SetCookie(res, acc)

});
Account.get("/githubsu", async (req, res) => {
  var code = req.query.code;
  var url = `https://github.com/login/oauth/access_token?client_id=${client_id_su}&client_secret=${client_secret_su}&code=${code}`;

  var r = await axios.post(
    url,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  // {
  //   "access_token": "",
  //   "token_type": "",
  //   "scope": ""
  // }
  var c
  try {
    c = await Promise.all([
      axios.get("https://api.github.com/user/emails", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${r.data.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }),
      axios.get("https://api.github.com/user", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${r.data.access_token}`,
          Accept: "application/vnd.github+json",
        },
      }),
    ]);
  } catch (error) {


    res.end()
    return
  }

  // [
  //   {
  //     email: "huy91027@gmail.com",
  //     primary: true,
  //     verified: true,
  //     visibility: "private",
  //   },
  //   {
  //     email: "71593544+crong964@users.noreply.github.com",
  //     primary: false,
  //     verified: true,
  //     visibility: null,
  //   },
  // ];



  //avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4'


  var hash = Hash.CreateHas({
    outNumber: undefined,
    salt: undefined,
    a1: c[0].data[0].email,
  });
  res.cookie("a1", hash.a1);
  res.cookie("a2", hash.a2);
  res.cookie("time", hash.time);

  res.cookie("email", c[0].data[0].email);
  res.cookie("image", c[1].data.avatar_url);
  res.cookie("name", "");

  res.redirect("/auth");
});
Account.post("/ggin", async (req, res) => {
  var g_csrf_token1 = req.body.g_csrf_token;
  var g_csrf_token2 = req.cookies.g_csrf_token;
  var profi: google = { email: "", name: "", picture: "" };

  if (g_csrf_token1 != g_csrf_token2) {
    res.redirect("/auth");
    return;
  }

  var s = req.body.credential as string;
  s.split(".").forEach((v, i) => {
    if (i == 1) {
      profi = JSON.parse(Buffer.from(v, "base64").toString()) as any as google;
    }
  });
  // {
  //      iss: 'https://accounts.google.com',
  //      azp: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
  //      aud: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
  //      sub: '104614040852490738418',
  //      email: 'huy91027@gmail.com',
  //      email_verified: true,
  //      nbf: 1711446780,
  //      name: 'Huy Nguyễn',
  //      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNfMWE2gocEli3yYxs-95uRjnX_8PeHAtb3gtpFr8S_g=s96-c',
  //      given_name: 'Huy',
  //      family_name: 'Nguyễn',
  //      iat: 1711447080,
  //      exp: 1711450680,
  //      jti: 'e17866e1397730421a8823d244726469f9ea63bd'
  //    }

  var acc = await userService.GetByAccount(profi.email)
  if (!acc) {
    res.redirect("/auth")
    return
  }

  SetCookie(res, acc)
});
Account.post("/ggup", (req, res) => {
  var g_csrf_token1 = req.body.g_csrf_token;
  var g_csrf_token2 = req.cookies.g_csrf_token;
  var profi: google = { email: "", name: "", picture: "" };

  if (g_csrf_token1 != g_csrf_token2) {
    res.redirect("/auth");
    return;
  }

  var s = req.body.credential as string;
  s.split(".").forEach((v, i) => {
    if (i == 1) {
      profi = JSON.parse(Buffer.from(v, "base64").toString()) as any as google;
    }
  });
  // {
  //      iss: 'https://accounts.google.com',
  //      azp: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
  //      aud: '814286348049-ehu28te266lohvbgsgu6mcgroe3qihcr.apps.googleusercontent.com',
  //      sub: '104614040852490738418',
  //      email: 'huy91027@gmail.com',
  //      email_verified: true,
  //      nbf: 1711446780,
  //      name: 'Huy Nguyễn',
  //      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNfMWE2gocEli3yYxs-95uRjnX_8PeHAtb3gtpFr8S_g=s96-c',
  //      given_name: 'Huy',
  //      family_name: 'Nguyễn',
  //      iat: 1711447080,
  //      exp: 1711450680,
  //      jti: 'e17866e1397730421a8823d244726469f9ea63bd'
  //    }
  var hash = Hash.CreateHas({
    outNumber: undefined,
    salt: undefined,
    a1: profi.email,
  });
  console.log(profi);

  res.cookie("a1", hash.a1);
  res.cookie("a2", hash.a2);
  res.cookie("time", hash.time);

  res.cookie("email", profi.email);
  res.cookie("image", profi.picture);
  res.cookie("name", profi.name);
  res.redirect("/auth");
});
Account.post("/logout", (req, res) => {
  clearCookie(res)
  res.redirect("/auth")
})





Account.post("/getdata", (req, res) => {
  if (req.cookies.name == undefined) {
    res.json({
      err: true,
    });
    return;
  }
  var time = parseInt(req.cookies.time);
  var time1 = new Date().getTime();
  if (time1 - time > 60000) {
    res.json({
      err: true,
    });
    return;
  }

  res.clearCookie("Name")
  res.clearCookie("image")
  res.clearCookie("email")

  res.json({
    err: false,
    page: "signup",
    Name: req.cookies.name,
    pathImage: req.cookies.image,
    Account: req.cookies.email,
  });
});
Account.post("/create", async (req, res) => {
  var d = new UserModel()
  d.setAll(req.body)
  d.Account = req.body.Account
  d.Password = req.body.Password

  d.id = uuidv4()
  await userService.AddAccount(d)
  res.json({
    err: false
  })
});
Account.post("/sendcode", async (req, res) => {
  var account = req.body.account
  console.log(account);

  var d = await userService.GetByAccount(account)

  if (d == undefined) {
    res.json({
      err: true,
      mess: "không tồn tại"
    })
    return
  }

  var code = new Date().getTime() % 100000
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "huy91027@gmail.com",
      pass: "tltl bfzr txhs uvav",
    },
  });
  const info = await transporter.sendMail({
    from: 'spotify@gmail.com.com',
    to: account,
    subject: "Mã Xác thực",
    text: "Hello world?",
    html: `<h1>${code}</h1>`,
  });

  var hash = Hash.CreateHas({ a1: `${code} ${account}`, outNumber: 20, salt: undefined })
  res.cookie("f1", account, { httpOnly: true, sameSite: "strict", secure: true })
  res.cookie("f2", hash.a2, { httpOnly: true, sameSite: "strict", secure: true })
  res.cookie("timef", hash.time, { httpOnly: true, sameSite: "strict", secure: true })
  res.json({
    err: false
  })
})
Account.post("/vertifycode", async (req, res) => {
  console.log(req.cookies);
  console.log(req.body);

  var code = req.body.code
  var account = req.cookies.f1
  var f2 = req.cookies.f2
  var timef = req.cookies.timef

  var verified = Hash.vertify({ a1: `${code} ${account}`, a2: f2, createTime: timef, outNumber: 20, salt: undefined })
  if ((new Date().getTime()) - parseInt(timef) > 60000) {
    res.json({
      err: true,
      mess: "Quá hạn"
    })
    return
  }
  if (verified) {
    var d = new UserModel()
    d.Account = account
    d.Password = req.body.Password

    var check = await userService.UpdatePassword(d)

    res.json({
      err: check == undefined
    })
    return
  }

  res.json({
    err: true,
    mess: "Mã không chính xác"
  })
})


Account.post("/updatePW", async (req, res) => {
  var Password = req.body.Password
  var Account = req.body.Account
  var d = new UserModel()
  d.Account = Account
  d.Password = Password

  var check = await userService.UpdatePassword(d)

  res.json({
    err: check == undefined
  })


})


function SetCookie(res: Response, acc: UserModel) {
  var hash = Hash.CreateHas({ a1: acc.id, outNumber: undefined, salt: undefined })
  res.cookie("id", acc.id, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true })
  res.cookie("a2", hash.a2, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true })
  res.cookie("timeSIN", hash.time, { maxAge: 1000 * 60 * 60 * 24 * 356, httpOnly: true })
  res.redirect("/")
}
function clearCookie(res: Response) {
  res.clearCookie("id")
  res.clearCookie("a2")
  res.clearCookie("timeSIN")
}
export function VerifyCookie(req: Request) {
  var id = req.cookies.id
  var a2 = req.cookies.a2
  var timeSIN = req.cookies.timeSIN


  if (!id || !a2 || !timeSIN) {
    return false
  }


  return Hash.vertify({ a1: id, a2: a2, createTime: timeSIN, outNumber: undefined, salt: undefined })
}
export default Account;


