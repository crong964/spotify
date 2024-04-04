import { Request, Response } from "express";
import discussService, { DiscussService } from "../services/DiscussService";
import DiscussModel from "../model/DiscussModel";
import { v4 as uuidv4 } from 'uuid';
class DiscussController {
    static disscuss: DiscussService = discussService

    async PostDisscus(req: Request, res: Response) {
        var d = new DiscussModel()


        d.setAll(req.body)
        d.Type = "0"
        d.Discuss_Id = `discuss-${uuidv4()}`
        d.User_Id = req.cookies.id


        var check = await DiscussController.disscuss.Add(d)

        res.json({
            err: check == undefined
        })
    }
    async PostReplay(req: Request, res: Response) {
        var d = new DiscussModel()
        d.setAll(req.body)
        d.Type = "1"
        d.Discuss_Id = `discuss-${uuidv4()}`
        d.User_Id = req.cookies.id
        var check1 = await DiscussController.disscuss.Increase(d.Parent_discuss_Id)
        if (check1) {
            var check2 = await DiscussController.disscuss.Add(d)
        }

        res.json({
            err: check1 == undefined
        })
    }
    async GetMainDiscuss(req: Request, res: Response) {
        var SongId = req.body.SongId
        var ls = await DiscussController.disscuss.GetMainDiscussBySong_Id(SongId)

        res.json({
            ls: ls,
            err: false
        })
    }
    async GetReplayDiscuss(req: Request, res: Response) {
        var Parent_discuss_Id = req.body.ParentId
        var ls = await DiscussController.disscuss.GetReplayDiscussByParentDiscussId(Parent_discuss_Id)

        res.json({
            ls: ls,
            err: false
        })
    }

}


const discussController = new DiscussController()


export default discussController