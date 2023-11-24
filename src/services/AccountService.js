import mongoose from "mongoose";
import { modelAccounts } from "../models/accountsMo.js";

export class AccountService {
  constructor() {}
  validateID(id) {
     if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("el id ingresado no existe");
    }
  }
  async singupAccount(data) {
    let account = new modelAccounts(data);
    return await account.save();
  }
  async deleteAccount(id) {       
   this.validateID(id)
   await modelAccounts.findByIdAndDelete(id);   
  }
  async updateAccount(id, data) {
    this.validateID(id)
    await modelAccounts.findByIdAndUpdate(id, data);
  }
  async searchAccount(id) {
    this.validateID(id)
    return await modelAccounts.findById(id);
  }
  async searchAccounts() {
    let accounts = modelAccounts.find();
    return accounts;
  }
}
