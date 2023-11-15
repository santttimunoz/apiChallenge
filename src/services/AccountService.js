import { response } from "express";
import { modelAccounts } from "../models/accountsMo.js";

export class AccountService {
    constructor() {

    }
    async singupAccount(data) {
        let account = new modelAccounts(data)
        return await account.save()
    }
    async deleteAccount(id) {
        await modelAccounts.findByIdAndDelete(id)
    }
    async updateAccount(id, data) {
        await modelAccounts.findByIdAndUpdate(id, data)
    }
    async searchAccount(id) {
        await modelAccounts.findById(id)
    }

}