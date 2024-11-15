import "dotenv/config"
import { createReadStream } from "fs"
import { google } from "googleapis"
const Type = process.env.TypeGGDrive
const Client_id = process.env.Client_idGGDrive
const Client_secret = process.env.Client_secretGGDrive
const Refresh_token = process.env.Refresh_tokenGGDrive

class GoogleDrive {
    private static service = google.drive({
        version: "v3", auth: google.auth.fromJSON({
            "type": Type,
            "client_id": Client_id,
            "client_secret": Client_secret,
            "refresh_token": Refresh_token
        }) as any
    })
    constructor() {

    }
    DownloadStreamFile(id: string) {
        return GoogleDrive.service.files.get({ fileId: id || "12", alt: "media" }, { responseType: "stream" })
    }
    DownloadFile(id: string) {
        return GoogleDrive.service.files.get({ fileId: id, alt: "media" })
    }
    async SearchNameFile(name: string): Promise<string[]> {
        return new Promise((res, rej) => {
            GoogleDrive.service.files.list({ q: `name contains '${name}'` })
                .then((v) => {
                    let ls: string[] = []
                    let files = v.data.files
                    if (files) {
                        for (let i = 0; i < files.length; i++) {
                            const element = files[i];
                            if (element.id) {
                                ls.push(element.id)
                            }
                        }
                    }
                    res(ls)

                })
                .catch((v) => {
                    console.log(v);
                    res([])
                })
        })

    }
    CreateFoder(name: string): Promise<{ id: string | undefined | null, err: string | undefined }> {
        return new Promise((res, rej) => {
            GoogleDrive.service.files.create({
                requestBody: {
                    name: name,
                    mimeType: "application/vnd.google-apps.folder"
                },
                fields: "id"
            }).then((v) => {
                res({ id: v.data.id, err: undefined })
            }).catch((v) => {
                res({ id: undefined, err: v })
            })
        })

    }
    CreateTxt(name: string, idparent: string, data: string): Promise<{ id: string | undefined | null, err: string | undefined }> {
        return new Promise((res, rej) => {
            GoogleDrive.service.files.create({
                requestBody: {
                    name: name,
                    parents: [idparent]
                },
                media: {
                    body: data,
                    mimeType: "text/txt"
                },
                fields: "id"
            }).then((v) => {
                res({ id: v.data.id, err: undefined })
            }).catch((v) => {
                res({ id: undefined, err: v })
            })
        })

    }
    async UploadStream(path: string, name: string, idparent: string): Promise<string | null | undefined> {
        return new Promise((res, rej) => {
            GoogleDrive.service.files.create({
                requestBody: {
                    name: name,
                    parents: [idparent]
                }, media: {
                    body: createReadStream(path),
                    mimeType: "application/octet-stream"
                }
            })
                .then((v) => {
                    res(v.data.id)
                })
                .catch((v) => {
                    res(undefined)
                })
        })

    }
    async SearchNameFolder(name: string): Promise<string[]> {
        return new Promise((res, rej) => {
            GoogleDrive.service.files.list({ q: `trashed = false and mimeType = 'application/vnd.google-apps.folder' and name = '${name}'` })
                .then((v) => {
                    let ls: string[] = []
                    let files = v.data.files
                    if (files) {
                        for (let i = 0; i < files.length; i++) {
                            const element = files[i];
                            if (element.id) {
                                ls.push(element.id)
                            }
                        }
                    }
                    res(ls)

                })
                .catch((v) => {
                    console.log(v);
                    res([])
                })
        })

    }
    async Trashed(idfolder: string): Promise<boolean> {
        return new Promise((res, rej) => {
            GoogleDrive.service.files.update({
                fileId: idfolder,
                requestBody: { "trashed": true }
            })
                .then((v) => {
                    res(true)
                })
                .catch((v) => {
                    res(false)
                    console.log();

                })
        })
    }
}

const googleDrive = new GoogleDrive()

export default googleDrive