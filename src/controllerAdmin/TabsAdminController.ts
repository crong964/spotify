import { Request, Response } from "express";

import tabService from "../services/TabService";


class TabsAdminController {
    static tab = tabService

    async Add(req: Request, res: Response) {
        let nameTab = req.body.nameTab
        let id = TabsAdminController.tab.RemoveAccents(nameTab)
        let check = await TabsAdminController.tab.Add(id, nameTab)
        let ls = await TabsAdminController.tab.GetAll()
        res.json({
            err: false,
            ls: ls
        })
    }
    async GetAll(req: Request, res: Response) {
        let ls = await TabsAdminController.tab.GetAll()
        res.json({
            ls
        })
    }

}

const tabsAdminController = new TabsAdminController()

export default tabsAdminController