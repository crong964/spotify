
import { Request, Response } from "express";
import PlayListLikeService from "../services/Imp/PlayListLikeService";
class PlayListLikeController {
    static playListLikeService = PlayListLikeService
    async Add(req: Request, res: Response) {
        let id = req.cookies.id
        let idPlaylist = req.body.idPlaylist
        let check = await PlayListLikeController.playListLikeService.Add(id, idPlaylist)
        if (check == undefined) {
            res.json({
                err: true
            })
            return
        }
        res.json({
            err: check.affectedRows == 0
        })
    }
    async Delete(req: Request, res: Response) {
        let id = req.cookies.id
        let idPlaylist = req.body.idPlaylist

        let check = await PlayListLikeController.playListLikeService.Delete(id, idPlaylist)
        res.json({
            err: check?.affectedRows == 0
        })
    }
    async GetAll(req: Request, res: Response) {
        let id = req.cookies.id
        let check = await PlayListLikeController.playListLikeService.GetAll(id)
        res.json({
            err: check == undefined,
            ls: check,
            idU: id
        })

    }
}

const playListLikeController = new PlayListLikeController()
export default playListLikeController