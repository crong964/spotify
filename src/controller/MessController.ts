import { Request, Response } from "express";
import haveListBoxChatService, { HaveListBoxChatService } from "../services/HaveListBoxChatService";
import messService, { MessService } from "../services/MessService";
import BoxModel from "../model/BoxModel";
import MessModel from "../model/MessModel";
import boxService, { BoxService } from "../services/BoxService";
import { v4 } from 'uuid';
import hiddenMessService from "../services/HiddenMessService";
import io from "../server";
export class MessController {

    static haveListBoxChat: HaveListBoxChatService = haveListBoxChatService
    static mess: MessService = messService
    static box: BoxService = boxService
    static hiddenMess = hiddenMessService
    constructor() {

    }
    async GetAllMessInbox(req: Request, res: Response) {
        var id = req.cookies.id;
        var idBox = req.body.idBox;
        MessController.haveListBoxChat.visualBoxChat(id, idBox)

        var ls = await Promise.all([MessController.mess.GetAllContentByidBox(idBox, id),
        MessController.haveListBoxChat.GetInforBoxByidUserAndIdBox(id, idBox)])
        res.json({
            err: false,
            mess: ls[0],
            infor: ls[1],
            myid: id
        })
    }
    async SendMess(req: Request, res: Response) {
        var mess: MessModel = new MessModel()
        mess.setAll(req.body)
        mess.idUser = req.cookies.id
        mess.idMess = `Mess-${v4()}`

        let inbox = await MessController.haveListBoxChat.IsIdUserInBox(mess.idUser, mess.idBox);

        if (inbox == undefined) {
            res.json({
                err: true
            })
            return
        }
        let v = await Promise.all([
            MessController.haveListBoxChat.visualBoxChat(mess.idUser, mess.idBox),
            MessController.haveListBoxChat.SetNotSeenInBox(mess.idUser, mess.idBox),
            MessController.mess.InsertContentIn(mess),
            MessController.box.UpdateLastMessBox(mess.idUser, mess.content, mess.idBox, "mess"),
            MessController.haveListBoxChat.GetIdUserInBox(mess.idUser, mess.idBox)
        ]);

        v[4].map((v) => {
            io.to(v.idUser).emit(mess.idBox, { idMess: mess.idMess, content: mess.content, idBox: mess.idBox, idUser: mess.idUser, ngay: new Date() })
        })

        res.json({
            err: v[2] == undefined
        })
    }
    async HiddenMess(req: Request, res: Response) {
        var idMess = req.body.idMess
        var id = req.cookies.id
        if (idMess == undefined) {
            res.json({})
            return
        }

        var data = await MessController.hiddenMess.GetHiddenMessByidMessidUser(idMess, id)
        if (data) {
            res.json({ err: true })
            return
        }
        MessController.hiddenMess.InsertHiddenmess(idMess, id)
        res.json({ err: false })
    }
    async Remove(req: Request, res: Response) {
        var idmess = req.body.idMess
        var s = req.cookies.id;
        var f = await MessController.mess.GetMessById(idmess)
        var iduser = s.id
        if (f == undefined) {
            res.json({
                err: true,
            })
            return
        }
        if (iduser == (f.idUser + "")) {
            await Promise.all([MessController.hiddenMess.DelHiddenMess(idmess),
            MessController.mess.DelMessById(idmess, iduser)])

            res.json({
                err: false,
            })
            return
        }
        MessController.hiddenMess.InsertHiddenmess(idmess, iduser)
        res.json({
            err: false,
        })
    }
}


const messController = new MessController()

export default messController