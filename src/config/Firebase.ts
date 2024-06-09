import { randomUUID } from "crypto";
import "dotenv/config"
import admin from "firebase-admin"
import { getDownloadURL } from "firebase-admin/storage"
import { createReadStream } from "fs";
import sharp from "sharp";

const PROJECTID = process.env.PROJECTID;
const CLIENTMAIL = process.env.CLIENTMAIL;
const PRIVATEKEY = process.env.PRIVATEKEY;
const DATABASEURL = process.env.DATABASEURL;
const STORAGEBUCKET = process.env.STORAGEBUCKET
const defaultApp = admin.initializeApp(

    {
        databaseURL: DATABASEURL,
        credential: admin.credential.cert({
            clientEmail: CLIENTMAIL,
            privateKey: PRIVATEKEY,
            projectId: PROJECTID
        })
    }
)
class Firebase {
    private static bucket = defaultApp.storage().bucket(STORAGEBUCKET)
    constructor() {

    }
    /*
    https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/g%2Fa.png?alt=media&token=51ef5ff0-f858-4adc-a7f5-9bba021c0131
    **/
    async UploadImageBuffer(name: string, data: Buffer) {
        return new Promise((res, rea) => {
            sharp(data).
                jpeg({ force: true, quality: 10, progressive: true })
                .png({ palette: true, quality: 1, compressionLevel: 9, progressive: true, force: false })
                .toBuffer((err, buffer, infor) => {
                    if (err) {
                        rea(err)
                        return
                    }
                    var g = `${name}.jpeg`
                    let w = Firebase.bucket.file(g || "image")
                        .createWriteStream().on("finish", async () => {
                            var nameURL = await getDownloadURL(Firebase.bucket.file(g))
                            res(nameURL)
                        })

                    w.write(buffer, (err) => {
                        console.log(err);
                        if (err) {
                            rea(err)
                            return
                        }
                    })
                    w.end()
                })


        })

    }
    async UploadStream(path: string, name: string) {
        return new Promise((res, rej) => {
            var r = createReadStream(path)
            var w = Firebase.bucket.file(name).createWriteStream()

            w.on("finish", () => {
                res(name)
            })
            r.on("error", (err) => {
                rej(err)
            })
            r.pipe(w)
        })
    }
    async GetMeta(name: string) {
        var meta
        try {
            meta = await Firebase.bucket.file(name).getMetadata()
        } catch (error) {
            console.log(error);
        }
        return meta?.[0]
    }
    DownloadStreamFile(name: string, start: number, end: number) {
        return Firebase.bucket.file(name).createReadStream({ start: start, end: end })
    }
}

const firebase = new Firebase()

export default firebase