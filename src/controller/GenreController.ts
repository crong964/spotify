import { Request, Response } from "express";
import genreService, { GenreService } from "../services/GenreService";
import GenreModel from "../model/GenreModel";
import { v4 as uuidv4 } from 'uuid';


class GenreController {
    static service: GenreService = genreService

    constructor() {
    }

    async Add(req: Request, res: Response) {
        var genre = new GenreModel()
        genre.setAll(req.body)
        var check = await GenreController.service.Add(genre)

        if (check == undefined) {
            res.json({
                err: true
            })
            return
        }
        res.json({
            err: false
        })
    }
    async GetAll(req: Request, res: Response) {
        var check = await GenreController.service.GetAll()
        if (check == undefined) {
            res.json({
                err: true,
                ls: []
            })
            return
        }
        res.json({
            err: false,
            ls: check
        })
    }
    async UpdateName(req: Request, res: Response) {
        var Name = req.body.Name
        var Id = req.body.id
        var check = await GenreController.service.UpdateName(Name, Id)

        if (check) {
            res.json({
                err: false
            })
            return
        }
        res.json({
            err: true
        })
    }
    async Delete(req: Request, res: Response) {
        var id = req.body.id
        var check = await GenreController.service.Delete(id)
        if (check) {
            res.json({
                err: false
            })
            return
        }

        res.json({
            err: true
        })
    }
}


var genreController = new GenreController()

export default genreController