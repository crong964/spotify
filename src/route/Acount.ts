import axios from "axios";
import { Router, Response, Request } from "express";
import path from "path";
import { Hash } from "../config/Hash";
import userService from "../services/UserService";
import UserModel from "../model/UserModel";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { SignJWT, VerifyGoogleIDtoken, VertifyJWT } from "../config/Helper";
import playListService from "../services/PlayListService";
import { PlayListModel } from "../model/PlayListModel";
import accountService from "../services/AccountService";
import AccountModel from "../model/AccountModel";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { OAuth2Client } from "google-auth-library";
interface google {
  email: string;
  name: string;
  picture: string;
}
const client_secret_si = process.env.CLIENT_SECRET_SI;
const client_id_si = process.env.CLIENT_ID_SI;


const client_secret_su = process.env.CLIENT_SECRET_SU;
const client_id_su = process.env.CLIENT_ID_SU;

const email = process.env.EMAIL
const emailpsapp = process.env.EMAILPSAPP
const secret = process.env.SECRET

const client_id_gg = process.env.Client_ID_GG
const Account = Router();

// Account.get("/", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "/web/auth.html"));
// });
Account.post("/signin", async (req, res) => {
  const account = req.body.account
  const password = req.body.password
  if (password == "") {
    res.redirect("/athu")
    return
  }
  let acc = await accountService.GetAccount(account)
  if (!acc || acc.Password != password) {
    res.json({
      err: true,
      mess: "Tài khoản hoặc mật khẩu không đúng"
    })
    return
  }
  let user = await userService.Get(acc.id)
  if (!user) {
    res.json({
      err: true,
      mess: "Không có người dùng này"
    })
    return
  }
  SetCookie(res, user)
  if (user.role == "master") {
    res.redirect("/admin")
    return
  }
  res.redirect("/")
});//0k 
Account.get("/github", async (req, res) => {
  let code = req.query.code;


  let url = `https://github.com/login/oauth/access_token?client_id=${client_id_si}&client_secret=${client_secret_si}&code=${code}`;

  let r = await axios.post(
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
  let c;
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
    console.log(error);

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
  let acc = await accountService.GetAccount(c[0].data[0].email)


  if (!acc) {
    res.redirect("/auth")
    return
  }

  let user = await userService.Get(acc.id)
  if (!user) {
    res.redirect("/auth")
    return
  }

  SetCookie(res, user)
  res.redirect("/")
});
Account.get("/githubsu", async (req, res) => {
  let code = req.query.code;
  let url = `https://github.com/login/oauth/access_token?client_id=${client_id_su}&client_secret=${client_secret_su}&code=${code}`;

  let r = await axios.post(
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
  // {
  //      login: 'crong964',
  //      id: 71593544,
  //      node_id: 'MDQ6VXNlcjcxNTkzNTQ0',
  //      avatar_url: 'https://avatars.githubusercontent.com/u/71593544?v=4',
  //      gravatar_id: '',
  //      url: 'https://api.github.com/users/crong964',
  //      html_url: 'https://github.com/crong964',
  //      followers_url: 'https://api.github.com/users/crong964/followers',
  //      following_url: 'https://api.github.com/users/crong964/following{/other_user}',
  //      gists_url: 'https://api.github.com/users/crong964/gists{/gist_id}',
  //      starred_url: 'https://api.github.com/users/crong964/starred{/owner}{/repo}',
  //      subscriptions_url: 'https://api.github.com/users/crong964/subscriptions',
  //      organizations_url: 'https://api.github.com/users/crong964/orgs',
  //      repos_url: 'https://api.github.com/users/crong964/repos',
  //      events_url: 'https://api.github.com/users/crong964/events{/privacy}',
  //      received_events_url: 'https://api.github.com/users/crong964/received_events',
  //      type: 'User',
  //      site_admin: false,
  //      name: null,
  //      company: null,
  //      blog: '',
  //      location: null,
  //      email: null,
  //      hireable: null,
  //      bio: null,
  //      twitter_username: null,
  //      public_repos: 16,
  //      public_gists: 0,
  //      followers: 0,
  //      following: 0,
  //      created_at: '2020-09-20T12:19:07Z',
  //      updated_at: '2024-03-30T02:12:41Z'
  //    }
  let c
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

  let acc = await accountService.GetAccount(c[0].data[0].email)


  if (acc) {
    res.redirect("/auth")
    return
  }
  let hash = Hash.CreateHas({
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
  res.cookie("idgithug", c[1].data.id)
  res.cookie("type", "githug")

  res.redirect("/auth");
});
Account.post("/ggin", async (req, res) => {
  let g_csrf_token1 = req.body.g_csrf_token;
  let g_csrf_token2 = req.cookies.g_csrf_token;

  if (g_csrf_token1 != g_csrf_token2) {
    res.redirect("/auth");
    return;
  }

  let s = req.body.credential as string;

  let payload = await VerifyGoogleIDtoken(s)
  if (payload == undefined || payload.email == undefined) {
    res.redirect("/auth/Signup");
    return
  }
  let acc = await accountService.GetAccount(payload.email)


  if (!acc) {
    res.redirect("/auth")
    return
  }

  let user = await userService.Get(acc.id)
  if (!user) {
    res.redirect("/auth")
    return
  }

  SetCookie(res, user)
  res.redirect("/")

});
//đăng ký gg
Account.post("/ggup", async (req, res) => {
  let g_csrf_token1 = req.body.g_csrf_token;
  let g_csrf_token2 = req.cookies.g_csrf_token;
  let profi: google = { email: "", name: "", picture: "" };

  if (g_csrf_token1 != g_csrf_token2) {
    res.redirect("/auth");
    return;
  }

  let s = req.body.credential as string;

  let payload = await VerifyGoogleIDtoken(s)

  if (payload == undefined || payload.email == undefined) {
    res.redirect("/auth/Signup?dk=khongthanhcong");
    return
  }
  let acc = await accountService.GetAccount(payload.email)

  if (acc) {
    res.redirect("/auth/Signup?dk=taikhoantontai");
    return
  }
  let id = `user-${uuidv4()}-${Date.now()}`

  let u = new UserModel()
  u.id = id
  u.pathImage = payload.picture || ""
  u.ChanalName = payload.name || ""
  u.Name = payload.name || ""

  let ac = new AccountModel()
  ac.Account = payload.email
  ac.Password = ""
  ac.id = u.id
  let pl = new PlayListModel()

  pl.User_id = u.id
  pl.ImagePath = u.pathImage
  pl.id = u.id
  pl.Status = "0"
  pl.Type = "user"
  pl.PlayListName = u.ChanalName

  await playListService.AddArtists(pl)

  u.id = id
  ac.id = id
  let check = await userService.AddAccount(u)

  if (check) {
    check = await accountService.Add(ac.id, ac.Account, ac.Password)
  } else {
    userService.Delete(u.id)
    playListService.DeletePlaylist(pl.id)
  }

  res.redirect("/auth");
});
Account.get("/logout", (req, res) => {
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
  let time = parseInt(req.cookies.time);
  let time1 = new Date().getTime();
  if (time1 - time > 60000) {
    res.json({
      err: true,
    });
    return;
  }

  res.clearCookie("name")
  res.clearCookie("image")
  res.clearCookie("email")

  let sign = SignJWT(JSON.stringify({
    Name: req.cookies.name,
    pathImage: req.cookies.image,
    Account: req.cookies.email,
  }))
  res.json({
    err: false,
    Name: req.cookies.name,
    pathImage: req.cookies.image,
    Account: req.cookies.email,
    Sign: sign
  });
});
Account.post("/create", async (req, res) => {
  let acc = new AccountModel()
  let user = new UserModel()
  acc.setAll(req.body)
  user.setAll(req.body)
  acc.Account = req.body.Account
  acc.Password = req.body.Password

  let id = `user-${uuidv4()}-${Date.now()}`


  if (VertifyJWT(req.body.sign) == undefined) {
    res.json({
      err: true
    })
    return
  }

  user.id = id
  acc.id = id



  let check = await userService.AddAccount(user)
  if (!check) {
    res.json({
      err: true
    })
  }
  check = await accountService.Add(acc.id, acc.Account, acc.Password)
  let pl = new PlayListModel()

  pl.User_id = user.id
  pl.ImagePath = user.pathImage
  pl.id = user.id
  pl.Status = "0"
  pl.PlayListName = user.Name

  await playListService.AddArtists(pl)
  res.json({
    err: false
  })
});
Account.post("/sendcode", async (req, res) => {
  let account = req.body.account


  let acc = await accountService.GetAccount(account)

  if (acc == undefined) {
    res.json({
      err: true,
      mess: "không tồn tại"
    })
    return
  }

  let code = new Date().getTime() % 100000
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: emailpsapp,
    },
  });
  const info = await transporter.sendMail({
    from: 'spotify@gmail.com.com',
    to: account,
    subject: "Mã Xác thực đổi mật khẩu",
    text: "Đây là mã xác thực của bạn đừng chia sẻ cho ai",
    html: `<h1>${code}</h1>`,
  });

  let hash = Hash.CreateHas({ a1: `${code} ${account}`, outNumber: 20, salt: undefined })
  hash.a1 = account
  let token = Buffer.from(JSON.stringify({
    f1: account,
    f2: hash.a2,
    timef: hash.time
  })).toString("base64")
  res.cookie("f1", account, { httpOnly: true, sameSite: "strict", secure: true })
  res.cookie("f2", hash.a2, { httpOnly: true, sameSite: "strict", secure: true })
  res.cookie("timef", hash.time, { httpOnly: true, sameSite: "strict", secure: true })
  res.json({
    err: false,
    token: token
  })
})//0k
Account.post("/vertifycode", async (req, res) => {
  let code = req.body.code
  let token = req.body.token
  if (token != undefined) {
    req.cookies = JSON.parse(Buffer.from(token, "base64").toString())
  }


  let account = req.cookies.f1
  let f2 = req.cookies.f2
  let timef = req.cookies.timef

  let verified = Hash.vertify({ a1: `${code} ${account}`, a2: f2, createTime: timef, outNumber: 20, salt: undefined })
  if ((new Date().getTime()) - parseInt(timef) > 60000) {
    res.json({
      err: true,
      mess: "Quá hạn"
    })
    return
  }


  if (verified) {
    let acc = new AccountModel()
    acc.Account = account
    acc.Password = req.body.Password

    let check = await accountService.UpdatePassword(acc.Account, acc.Password)

    res.json({
      err: check == undefined,
      mess: "thành công"
    })
    return
  }

  res.json({
    err: true,
    mess: "Mã không chính xác"
  })
});//0k
Account.post("/apikey", async (req, res) => {
  const account = req.body.account
  const password = req.body.password
  let acc = await accountService.GetAccount(account)

  if (!acc || acc.Password != password) {
    res.json({
      err: true,
      mess: "Tài khoản hoặc mật khẩu không đúng"
    })
    return
  }
  let user = await userService.Get(acc.id)
  if (!user) {
    res.json({
      err: true,
      mess: "Tài khoản hoặc mật khẩu không đúng"
    })
    return
  }
  let apikey = jwt.sign({ role: user.role, id: acc.id }, secret || "1", { expiresIn: "2 days" })
  res.json({
    err: false,
    apikey: apikey
  })
});//0k

Account.post("/sendCodeVertifyEmail", async (req, res) => {
  let account = req.body.account
  let acc = await accountService.GetAccount(account)

  if (account == undefined) {
    res.json({
      err: true,
      mess: "chưa nhập tài khoản"
    })
    return
  }
  if (acc != undefined) {
    res.json({
      err: true,
      mess: "tài khoản đã tồn tại"
    })
    return
  }

  let code = new Date().getTime() % 100000
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: emailpsapp,
    },
  });

  let info: SMTPTransport.SentMessageInfo | undefined = undefined
  try {
    info = await transporter.sendMail({
      from: 'spotify@gmail.com.com',
      to: account,
      subject: "Mã Xác thực email",
      text: "Đây là mã xác thực của bạn đừng chia sẻ cho ai",
      html: `<h1>${code}</h1>`,
    })
  } catch (error) {

  }


  let token = jwt.sign({ Account: account }, code + (secret || "888"), {
    expiresIn: "3h"
  })
  res.json({
    err: info == undefined,
    token: token
  })
})//0k
Account.post("/createACC", async (req, res) => {
  let Account = req.body.Account
  let code = req.body.code
  let token = req.body.token

  let id = `user-${uuidv4()}-${Date.now()}`

  let decode = VertifyJWT(token, code + (secret || "888"))
  if (decode == undefined) {
    res.json({
      err: true,
      mess: "MÃ KO ĐÚNG"
    })
    return
  }


  if (decode.Account != Account) {
    res.json({
      err: true,
      mess: "GMAIL KHÔNG ĐÚNG"
    })
    return
  }
  let acc_check = await accountService.GetAccount(Account)
  if (acc_check != undefined) {
    res.json({
      err: true,
      mess: "tài khoản đã tồn tại"
    })
    return
  }

  let u = new UserModel()
  u.setAll(req.body)
  let acc = new AccountModel()
  acc.setAll(req.body)
  let pl = new PlayListModel()

  pl.User_id = u.id
  pl.ImagePath = u.pathImage
  pl.id = u.id
  pl.Status = "0"
  pl.PlayListName = u.Name

  await playListService.AddArtists(pl)

  u.id = id
  acc.id = id
  let check = await userService.AddAccount(u)
  if (!check) {
    check = await accountService.Add(acc.id, acc.Account, acc.Password)
  }
  res.json({
    err: check == undefined,
  })
})//0k

function SetCookie(res: Response, acc: UserModel) {
  let apikey = jwt.sign({ role: acc.role, id: acc.id }, secret || '1', { expiresIn: "10 days" })
  res.cookie("apikey", apikey, { maxAge: 900000000, httpOnly: true })
}
function SetApiKey(res: Response, acc: UserModel) {
  let hash = Hash.CreateHas({ a1: acc.id, outNumber: undefined, salt: undefined })
  return hash
}
function clearCookie(res: Response) {
  res.clearCookie("id")
  res.clearCookie("a2")
  res.clearCookie("timeSIN")
  res.clearCookie("apikey")
}
export function VerifyCookie(req: Request) {
  let id = req.cookies.id
  let a2 = req.cookies.a2
  let timeSIN = req.cookies.timeSIN


  if (!id || !a2 || !timeSIN) {
    return false
  }


  return Hash.vertify({ a1: id, a2: a2, createTime: timeSIN, outNumber: undefined, salt: undefined })
}
export default Account;


