import ContainModel from "../model/ContainModel";

import { Request, Response } from "express";
import { containService, playListService } from "../services";

class ContainController {
    static contain = containService
    static playlist = playListService
    async Add(req: Request, res: Response) {
        var d = new ContainModel()
        d.setAll(req.body)
        var check = await ContainController.contain.Add(d)
        res.json({
            err: check == undefined
        })
    }
    async AddC(req: Request, res: Response) {
        var d = new ContainModel()
        let id = req.cookies.id
        d.setAll(req.body)
        let playlist = await ContainController.playlist.Get(d.PlayList_id)
        if (playlist?.User_id == id) {
            var check = await ContainController.contain.Add(d)
            res.json({
                err: check?.affectedRows == 0
            })
            return
        }

        res.json({
            err: true
        })
    }
    async Delete(req: Request, res: Response) {
        var d = new ContainModel()
        d.setAll(req.body)
        var check = await ContainController.contain.Delete(d.Song_id, d.PlayList_id)
        res.json({
            err: check == undefined
        })
    }
    async DeleteC(req: Request, res: Response) {
        var d = new ContainModel()
        let id = req.cookies.id
        d.setAll(req.body)
        var check = await ContainController.contain.DeleteC(d.Song_id, d.PlayList_id, id)
        res.json({
            err: check?.affectedRows == 0
        })
    }
}


var containController = new ContainController()

export default containController
