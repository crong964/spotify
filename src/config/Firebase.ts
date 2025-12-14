import { randomUUID } from "crypto";
import "dotenv/config";
import admin from "firebase-admin";
import { getDownloadURL } from "firebase-admin/storage";
import { createReadStream } from "fs";
import "dotenv/config";
import { readFileSync } from "fs";
import sharp from "sharp";
import cloudinary from "cloudinary";

const cacheControl = "public, max-age=31536000000,immutable";
const PROJECTID = process.env.PROJECTID;
const CLIENTMAIL = process.env.CLIENTMAIL;
const PRIVATEKEY = process.env.PRIVATEKEY;
const DATABASEURL = process.env.DATABASEURL;
const STORAGEBUCKET = process.env.STORAGEBUCKET;

const defaultApp = admin.initializeApp({
  databaseURL: DATABASEURL,
  credential: admin.credential.cert({
    clientEmail: CLIENTMAIL,
    privateKey: PRIVATEKEY,
    projectId: PROJECTID,
  }),
});
const metadata = {
  cacheControl: cacheControl,
  customMetadata: {
    "access-control-allow-origin": "*",
  },
};
//class Firebase {
//  private static bucket = defaultApp.storage().bucket(STORAGEBUCKET);
//  constructor() {}
//  /*
//   **/
//  async UploadImageBuffer(name: string, data: Buffer, q?: number) {
//    let percentOutput = 20;
//    let quality = q || 40000;

//    if (data.length > quality) {
//      percentOutput = parseInt((quality / data.length) * 100 + "");
//    }
//    return new Promise((res, rea) => {
//      sharp(data)
//        .jpeg({ force: true, quality: percentOutput, progressive: true })
//        .png({
//          palette: true,
//          quality: 1,
//          compressionLevel: 9,
//          progressive: true,
//          force: false,
//        })
//        .toBuffer((err, buffer, infor) => {
//          if (err) {
//            rea(err);
//            return;
//          }
//          var g = `${name}.jpeg`;
//          let w = Firebase.bucket
//            .file(g)
//            .createWriteStream({
//              metadata,
//            })
//            .on("finish", async () => {
//              var nameURL = await getDownloadURL(Firebase.bucket.file(g));
//              res(nameURL);
//            });

//          w.write(buffer, (err) => {
//            if (err) {
//              rea(err);
//              return;
//            }
//          });
//          w.end();
//        });
//    });
//  }

//  async UploadImageBufferNoZip(name: string, data: Buffer) {
//    return new Promise((res, rej) => {
//      sharp(data)
//        .jpeg({ force: true, progressive: true })
//        .png({ palette: true, progressive: true, force: false })
//        .toBuffer((err, buffer, infor) => {
//          if (err) {
//            console.log(err);
//            rej("err");
//            return;
//          }
//          var g = `${name}.jpeg`;
//          let w = Firebase.bucket
//            .file(g)
//            .createWriteStream({
//              metadata,
//            })
//            .on("finish", async () => {
//              var nameURL = await getDownloadURL(Firebase.bucket.file(g));
//              res(nameURL);
//            });
//          w.write(buffer, (err) => {
//            if (err) {
//              console.log(err);
//              rej("err");
//              return;
//            }
//          });
//          w.end();
//        });
//    });
//  }
//  async UploadStream(path: string, name: string) {
//    return new Promise((res, rej) => {
//      var r = createReadStream(path);
//      var w = Firebase.bucket.file(name).createWriteStream({
//        metadata,
//      });

//      w.on("finish", async () => {
//        var nameURL = await getDownloadURL(Firebase.bucket.file(name));
//        res(nameURL);
//      });
//      r.on("error", (err) => {
//        rej(err);
//      });
//      r.pipe(w);
//    });
//  }
//  async GetMeta(name: string) {
//    var meta;
//    try {
//      meta = await Firebase.bucket.file(name).getMetadata();
//    } catch (error) {
//      console.log(error);
//    }
//    return meta?.[0];
//  }
//  DownloadStreamFile(name: string, start: number, end: number) {
//    return Firebase.bucket
//      .file(name)
//      .createReadStream({ start: start, end: end });
//  }
//  async MoveImage(source: string, dist: string) {
//    let check;
//    try {
//      check = await Firebase.bucket.file(`${source}.jpeg`).move(`${dist}.jpeg`);
//    } catch (error) {
//      console.log(error);
//    }
//    return check;
//  }
//  async Move(source: string, dist: string) {
//    let check;
//    try {
//      check = await Firebase.bucket.file(`${source}`).move(`${dist}`);
//    } catch (error) {
//      console.log(error);
//    }
//    return check;
//  }
//  DownloadFile(name: string) {
//    return Firebase.bucket.file(name).createReadStream();
//  }
//}

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  force_version: false,
});

class Firebase {
  constructor() {}
  /*
   **/
  async UploadImageBuffer(folder_name: string, data: Buffer, q?: number) {
    let percentOutput = 20;
    let quality = q || 40000;

    if (data.length > quality) {
      percentOutput = parseInt((quality / data.length) * 100 + "");
    }
    return new Promise((res, rea) => {
      sharp(data)
        .jpeg({ force: true, quality: percentOutput, progressive: true })
        .png({
          palette: true,
          quality: 1,
          compressionLevel: 9,
          progressive: true,
          force: false,
        })
        .toBuffer((err, buffer, infor) => {
          if (err) {
            rea(err);
            return;
          }
          var g = folder_name.split("/");
          let folder = g[0];
          let name = g[1];
          cloudinary.v2.uploader
            .upload_stream(
              {
                access_mode: "public",
                folder: folder,
                public_id: name,
              },
              (cloudinary_err, cloudinary_res) => {
                if (cloudinary_res) {
                  res(cloudinary_res.url);
                  return;
                }
                rea(cloudinary_err);
              }
            )
            .end(buffer);
        });
    });
  }

  async UploadImageBufferNoZip(folder_name: string, data: Buffer) {
    return new Promise((res, rej) => {
      sharp(data)
        .jpeg({ force: true, progressive: true })
        .png({ palette: true, progressive: true, force: false })
        .toBuffer((err, buffer, infor) => {
          if (err) {
            console.log(err);
            rej("err");
            return;
          }
          var g = folder_name.split("/");
          let folder = g[0];
          let name = g[1];
          cloudinary.v2.uploader
            .upload_stream(
              {
                access_mode: "public",
                folder: folder,
                public_id: name,
              },
              (cloudinary_err, cloudinary_res) => {
                if (cloudinary_res) {
                  res(cloudinary_res.url);
                  return;
                }
                rej(cloudinary_err);
              }
            )
            .end(buffer);
        });
    });
  }
  async UploadStream(path_file: string, folder_name: string) {
    return new Promise((res, rej) => {
      var r = readFileSync(path_file);
      var g = folder_name.split("/");
      let folder = g[0];
      let name = g[1];
      cloudinary.v2.uploader
        .upload_stream(
          {
            folder: folder,
            access_mode: "public",
            public_id: name,
          },
          (cloudinary_err, cloudinary_res) => {
            if (cloudinary_res) {
              res(cloudinary_res.url);
              return;
            }
            rej(cloudinary_err);
          }
        )
        .end(r);
    });
  }
  async DeleteFile(folder_name: string) {
    return new Promise((res, rej) => {
      cloudinary.v2.api.delete_resources(
        [folder_name],
        (cloudinary_err, cloudinary_res) => {
          if (cloudinary_err) {
            rej(cloudinary_err);
            return;
          }
          res(cloudinary_res);
        }
      );
    });
  }
}
const firebase = new Firebase();

export default firebase;
