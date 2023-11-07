import { modelAccounts } from "../models/accountsMo.js";

export class AccountService{
    constructor(){

    }
    async singupAccount(data){
        let account = new modelAccounts(data)
        await account.save()
        return account
    }
    async deleteAccount(id){            
        await modelAccounts.findByIdAndDelete(id)
    }
    async updateAccount(id, data){        
        await modelAccounts.findByIdAndUpdate(id, data)        
    }
    async searchAccount(id){
        await modelAccounts.findById(id)
    }
}