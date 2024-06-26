import Mysql2 from "../config/Config"
import AccountModel from "../model/AccountModel"

export class AccountService {
    constructor() {

    }
    async GetAccount(account: string) {
        var sql = "SELECT * FROM account WHERE Account=?"
        var check = await Mysql2.query(sql, [account])
        return this.SetLs(check)[0]
    }
    async Add(id: string, Account: string, Password: string) {
        var sql = 'INSERT INTO account(id, Account, Password) VALUES (?,?,?)'
        var check = await Mysql2.query(sql, [id, Account, Password])
        return check
    }
    private SetLs(any: any) {
        var list: AccountModel[] = []
        if (any == undefined) {
            return []
        }

        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            var acc = new AccountModel();
            acc.setAll(element);
            list.push(acc);
        }
        return list
    }
    async UpdatePassword(Account: string, Password: string) {
        var sql = "UPDATE account SET Password= ? WHERE Account=?"
        var check
        check = await Mysql2.query(sql, [Password, Account])
        return check
    }
}

var accountService = new AccountService()

export default accountService