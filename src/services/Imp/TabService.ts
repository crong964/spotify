import { normalize } from "path"
import Mysql2 from "../../config/Config"
import TabModel from "../../model/TabModel"

class TabService {
    private static s: any = {

    }
    async Add(id: string, nameTab: string) {
        let sql = "INSERT INTO tab(id,nameTab) VALUES(?,?)"
        let check = await Mysql2.query(sql, [id, nameTab])
        return this.SetLs(check)
    }
    async Delete(id: string) {
        let sql = "DELETE FROM tab WHERE id=?"
        let check = await Mysql2.query(sql, [id])
        return check
    }
    async GetById(id: string) {
        let sql = "SELECT * FROM tab WHERE id = ?"
        let check = await Mysql2.query(sql, [id])
        return this.SetLs(check)
    }
    async GetAll() {
        let sql = "SELECT * FROM tab"
        let check = await Mysql2.query(sql, [])
        return this.SetLs(check)
    }
    async GetbyName(nameTab: string) {
        let sql = "SELECT * FROM tab WHERE nameTab LIKE ?"
        let check = await Mysql2.query(sql, [`%${nameTab}%`])
        return this.SetLs(check)
    }
    SetLs(check: any) {
        if (check == undefined) {
            return []
        }
        var ls: TabModel[] = []
        for (let i = 0; i < check.length; i++) {
            const element = check[i];
            var tabModel = new TabModel()
            tabModel.setAll(element)
            ls.push(tabModel)
        }
        return ls
    }
    RemoveAccents(str: string) {
        return str
            .normalize("NFD") // Chuẩn hóa Unicode dạng NFD (Normalization Form Decomposition)
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự tổ hợp (dấu)
            .replace(/đ/g, "d") // Thay 'đ' thành 'd'
            .replace(/Đ/g, "D")
            .replace(/ /g, "") // Thay 'Đ' thành 'D'
    }
}


var tabServiceImp = new TabService()

export default tabServiceImp