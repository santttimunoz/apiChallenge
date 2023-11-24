import { AccountService } from "../services/AccountService.js"

export class AccountControl {
    constructor() {

    }
    async signupAccount(request, response) {
        try {
            let accountService = new AccountService()
            let data = request.body
            let newAccount = await accountService.singupAccount(data)
            response.status(200).json({
                mensaje: "exito registrando la cuenta",
                data: newAccount
            })
        } catch (error) {
            response.status(400).json({
                mensaje: "error al registrar la cuenta",
                data: null
            })
        }

    }
    async deleteAccount(request, response) {
        try {
            let accountService = new AccountService()
            let id = request.params.id
            await accountService.deleteAccount(id)
            response.status(200).json({
                mensaje: "exito en la eliminacion de la cuenta",
                data: "id de la cuenta eliminada " + id
            })
        } catch (error) {
            response.status(400).json({
                message: "error en la eliminacion de la cuenta: "+error.message,
                data: null
            })
        }
    }
    async updateAccount(request, response) {
        try {
            let accountService = new AccountService()
            let id = request.params.id
            let data = request.body
            await accountService.updateAccount(id, data)
            response.status(200).json({
                mesaje: "exito actualizando la cuenta",
                data: data
            })
        } catch (error) {
            response.status(400).json({
                mensaje: "error en la acualizacion de la cuenta: "+error.message,
                data: null
            })
        }
    }
    async searchAccount(request, response) {
        try {
            let accountService = new AccountService()
            let id = request.params.id            
            let account = await accountService.searchAccount(id)
            response.status(200).json({
                mensaje: "exito buscando la informacion de la cuenta",
                data: account
            })
        } catch (error) {
            response.status(400).json({
                mensaje: "error al buscar la informacion de la cuenta: "+error.message,
                data: null
            })
        }

    }
    async searchAccounts(request, response){
        try {
            let accountService = new AccountService()
            let accounts = await accountService.searchAccounts()
            let info = accounts.map((account) => {
                return{
                    id: account.id,
                    accountName: account.accountName,
                    accountClient: account.clientName,
                    operationResponsible: account.operationResponsible
                }
            })            
            response.status(200).json({
              message: "exito trayendo la lista de cuentas",
              accounts :  info
            })
        } catch (error) {
            console.log("error debido a: "+error)
            response.status(400).json({
                message: "error buscando la lista de cuentas",
                accounts :  null
              })
        }
    }
}