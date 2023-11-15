import mongoose from "mongoose"

const Schema = mongoose.Schema

const account = new Schema({
    accountName: {
        type: String,
        required: true,
        // unique : true
    },
    clientName: {
        type: String,
        required: true
    },
    operationResponsible: {
        type: String,
        required: true
    },
    teamQuery: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

export const modelAccounts = mongoose.model('accounts', account)
