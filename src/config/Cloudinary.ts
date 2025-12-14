import "dotenv/config";
import { readFileSync } from "fs";
import sharp from "sharp";
import cloudinary from "cloudinary";

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
                  res(cloudinary_res.secure_url);
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
                  res(cloudinary_res.secure_url);
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
              res(cloudinary_res.secure_url);
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
        (cloudinary_err, cloudinary_res) => {}
      );
    });
  }
}

const firebase = new Firebase();

export default firebase;
