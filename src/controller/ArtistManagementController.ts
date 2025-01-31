import { Request, Response } from "express";
import artistManagementService from "../services/ArtistManagementService";
import userService, { UserService } from "../services/UserService";
import { Multer } from "multer";
import firebase from "../config/Firebase";
import { randomUUID } from "crypto";
import UserModel from "../model/UserModel";
import playListService, { PlayListService } from "../services/PlayListService";
import { PlayListModel } from "../model/PlayListModel";
import { v4 } from "uuid";
import processImage from "../config/ProcessImage";
import { unlink } from "fs/promises";
import songService from "../services/SongService";

class ArtistManagementController {
    static user = userService
    static artistManagement = artistManagementService
    static playlist = playListService
    static processImg = processImage
    static song = songService
    constructor() {

    }
    //bỏ
    async Add(req: Request, res: Response) {
        let files = req.files as any
        if (!files || !files["Banner"] || !files["pathImage"]) {
            res.json({

                err: true
            })
            return
        }

        let id = `artist-${randomUUID()}-${Date.now()}`
        let BannerFile = files["Banner"][0] as Express.Multer.File
        let pathImageFile = files["pathImage"][0] as Express.Multer.File
        let name: any[] = []
        try {
            name = await Promise.all([
                firebase.UploadImageBuffer(`Banner/${id}`, BannerFile.buffer),
                firebase.UploadImageBuffer(`PathImageFile/${id}`, pathImageFile.buffer)]
            )
        } catch (error) {
            console.log(error);

        }
        if (name.length < 2) {
            res.json({
                err: true
            })
            return
        }

        let user = new UserModel()
        let d = new PlayListModel()
        user.setAll(req.body)
        user.id = id
        user.Banner = name[0]
        user.pathImage = name[1]



        d.User_id = user.id
        d.ImagePath = user.pathImage
        d.id = user.id

        d.Status = "0"
        d.PlayListName = user.ChanalName

        let check = await Promise.all([
            ArtistManagementController.user.Add(user),
            ArtistManagementController.artistManagement.Add(id),
            ArtistManagementController.playlist.AddArtists(d)
        ])


        res.json({
            err: false,
            mess: ""
        })
    }
    async Add2(req: Request, res: Response) {
        let files = req.files as any
        let id = `artist-${randomUUID()}-${Date.now()}`

        if (!files || !files["pathImage"]) {
            res.json({
                err: true
            })
            return
        }
        let user = new UserModel()
        let d = new PlayListModel()
        user.setAll(req.body)
        user.id = id




        d.User_id = user.id
        d.ImagePath = user.pathImage
        d.id = user.id

        d.Status = "0"
        d.PlayListName = user.ChanalName
        let pathImageFile = files["pathImage"][0] as Express.Multer.File
        if (files["Banner"]) {
            let BannerFile = files["Banner"][0] as Express.Multer.File

            let check = await Promise.all([
                ArtistManagementController.processImg.ConvertImgToWebp(BannerFile.path, `${BannerFile.path}.webp`),
                ArtistManagementController.processImg.ConvertImgToWebp(pathImageFile.path, `${pathImageFile.path}.webp`)
            ])
            if (check[0] && check[1]) {
                let name = await Promise.all([firebase.UploadStream(check[0], `Banner/${id}.webp`),
                firebase.UploadStream(check[1], `PathImageFile/${id}.webp`)])
                try {
                    unlink(check[0])
                    unlink(check[1])
                    unlink(BannerFile.path)
                    unlink(pathImageFile.path)
                } catch (error) {

                }
                user.Banner = name[0] as string
                user.pathImage = name[1] as string
            }



        } else {
            let check = await ArtistManagementController.processImg.ConvertImgToWebp(pathImageFile.path, `${pathImageFile.path}.webp`)
            if (check) {
                let name = await firebase.UploadStream(check, `PathImageFile/${id}.webp`)
                unlink(pathImageFile.path)
                unlink(check)
                user.pathImage = name as string
            }
        }
        d.ImagePath = user.pathImage
        let check = await Promise.all([
            ArtistManagementController.user.Add(user),
            ArtistManagementController.artistManagement.Add(id),
            ArtistManagementController.playlist.AddArtists(d)
        ])


        res.json({
            err: false,
            mess: ""
        })
    }
    async AddQickly(req: Request, res: Response) {


        let id = `artist-${randomUUID()}-${Date.now()}`

        let user = new UserModel()
        let d = new PlayListModel()
        user.setAll(req.body)
        user.id = id
        d.User_id = user.id
        d.ImagePath = user.pathImage
        d.Type="playlist"
        d.id = id
        user.Vertify = "1"
        d.Status = "1"
        d.PlayListName = user.ChanalName

        try {
            await Promise.all([
                ArtistManagementController.user.Add(user),
                ArtistManagementController.artistManagement.Add(id),
                ArtistManagementController.playlist.AddArtists(d)
            ])
        } catch (error) {
            console.log(error);

        }

        res.json({
            err: false,
            data: {
                id: user.id,
                ChanalName: user.ChanalName
            }
        })
    }
    async GetAll(req: Request, res: Response) {
        let start = req.body.start || 0
        let count = (req.body.page || 1) * 10
        let ls = await Promise.all([ArtistManagementController.artistManagement.GetAll(start, count), ArtistManagementController.artistManagement.GetCount()])
        res.json({
            ls: ls[0],
            count: ls[1].count,
            err: false
        })
    }
    async GetWithout(req: Request, res: Response) {
        let start = req.body.start || 0
        let count = (req.body.page || 1) * 10
        let ls = await ArtistManagementController.artistManagement.GetWithout(start, count)
        res.json({
            ls: ls,
            err: false
        })
    }
    async Get(req: Request, res: Response) {
        let idArtist = req.body.idArtist
        let user = await ArtistManagementController.user.Get(idArtist)
        res.json({
            err: user == undefined,
            ls: user
        })
    }
    async Update(req: Request, res: Response) {
        let files = req.files as any

        let old = await ArtistManagementController.user.Get(req.body.id)
        let user = new UserModel()
        if (!old) {
            res.json({
                err: true
            })
            return
        }

        user.setAll(req.body)
        user.Banner = old.Banner
        user.pathImage = old.pathImage
        let id = user.id
        if (files) {
            let date = Date.now() + ""
            try {
                if (files["Banner"]) {
                    let BannerFile = files["Banner"][0] as Express.Multer.File
                    if (old.Banner.length > 0) {
                        await firebase.MoveImage(`Banner/${id}`, `delete/Banner/${id}_${date}`)
                    }
                    let path = await ArtistManagementController.processImg.ConvertImgToWebp(BannerFile.path, `${BannerFile.path}.webp`)
                    if (path) {
                        user.Banner = await firebase.UploadStream(path, `Banner/${id}.webp`) as string
                        try {
                            unlink(path)
                            unlink(BannerFile.path)
                        } catch (error) {

                        }
                    }


                }
                if (files["pathImage"]) {
                    let pathImageFile = files["pathImage"][0] as Express.Multer.File
                    if (old.pathImage.length > 0) {
                        await firebase.MoveImage(`PathImageFile/${id}`, `delete/PathImageFile/${id}_${date}`)
                    }
                    let path = await ArtistManagementController.processImg.ConvertImgToWebp(pathImageFile.path, `${pathImageFile.path}.webp`)
                    if (path) {
                        user.pathImage = await firebase.UploadStream(path, `PathImageFile/${id}.webp`) as string
                        try {
                            unlink(path)
                            unlink(pathImageFile.path)
                        } catch (error) {

                        }
                    }
                }
            } catch (error) {
                console.log(error);

            }
        }

        let d = await ArtistManagementController.playlist.GetArtistsByUserid(user.id)


        d.PlayListName = user.ChanalName
        d.ImagePath = user.pathImage
        let check = await Promise.all([
            ArtistManagementController.user.Update(user),
            ArtistManagementController.playlist.Update(d)
        ])


        res.json({
            err: false,
            mess: ""
        })
    }
    async VertifyArtist(req: Request, res: Response) {
        var idArtist = req.body.idArtist
        var status = req.body.status || "1"
        var check = await ArtistManagementController.user.VertifyAccount(idArtist, status)
        let check1 = await ArtistManagementController.playlist.VertifyPlaylist(idArtist, status)

        res.json({
            err: check == undefined
        })
    }
    async Delete(req: Request, res: Response) {
        let id = req.body.id
        let date = Date.now() + ""
        let song = await ArtistManagementController.song.GetAll(id)
        if (song.length == 0) {
            ArtistManagementController.user.DeleteArtist(id)
            ArtistManagementController.playlist.DeletePlaylist(id)
            ArtistManagementController.artistManagement.Delete(id)
            firebase.Move(`Banner/${id}.webp`, `delete/Banner/${id}_${date}.webp`)
            firebase.Move(`PathImageFile/${id}.webp`, `delete/PathImageFile/${id}_${date}.webp`)
        }
        res.json({
            err: false
        })

    }
}

const artistManagementController = new ArtistManagementController()

export default artistManagementController 