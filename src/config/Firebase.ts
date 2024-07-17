import { randomUUID } from "crypto";
import "dotenv/config"
import admin from "firebase-admin"
import { getDownloadURL } from "firebase-admin/storage"
import { createReadStream } from "fs";
import sharp from "sharp";
const cacheControl = 'public, max-age=31536000000,immutable'
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
        let percentOutput = 100
        if (data.length > 40000) {
            percentOutput = parseInt((40000 / data.length) * 100 + "")
        }
        return new Promise((res, rea) => {
            sharp(data).
                jpeg({ force: true, quality: percentOutput, progressive: true })
                .png({ palette: true, quality: 1, compressionLevel: 9, progressive: true, force: false })
                .toBuffer((err, buffer, infor) => {
                    if (err) {
                        rea(err)
                        return
                    }
                    var g = `${name}.jpeg`
                    let w = Firebase.bucket.file(g)
                        .createWriteStream({
                            metadata: {
                                cacheControl: cacheControl,
                            }
                        }).on("finish", async () => {
                            var nameURL = await getDownloadURL(Firebase.bucket.file(g))
                            res(nameURL)
                        })

                    w.write(buffer, (err) => {
                        if (err) {
                            rea(err)
                            return
                        }
                    })
                    w.end()
                })


        })

    }
    async UploadImageBufferNoZip(name: string, data: Buffer) {
        return new Promise((res, rej) => {
            sharp(data).jpeg({ force: true, progressive: true }).png({ palette: true, progressive: true, force: false })
                .toBuffer((err, buffer, infor) => {
                    if (err) {
                        console.log(err);
                        rej("err")
                        return
                    }
                    var g = `${name}.jpeg`
                    let w = Firebase.bucket.file(g)
                        .createWriteStream(
                            {
                                metadata: {
                                    cacheControl: cacheControl,
                                }
                            }
                        ).on("finish", async () => {
                            var nameURL = await getDownloadURL(Firebase.bucket.file(g))
                            res(nameURL)
                        })
                    w.write(buffer, (err) => {
                        if (err) {
                            console.log(err);
                            rej("err")
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
            var w = Firebase.bucket.file(name).createWriteStream({
                metadata: {
                    cacheControl: cacheControl,
                }
            })

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
    async MoveImage(source: string, dist: string) {
        let check
        try {
            check = await Firebase.bucket.file(`${source}.jpeg`).move(`${dist}.jpeg`)
        } catch (error) {
            console.log(error);

        }
        return check
    }
    async Move(source: string, dist: string) {
        let check
        try {
            check = await Firebase.bucket.file(`${source}`).move(`${dist}`)
        } catch (error) {
            console.log(error);

        }
        return check
    }
}

const firebase = new Firebase()

export default firebase