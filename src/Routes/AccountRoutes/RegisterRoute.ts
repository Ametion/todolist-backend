import express from "express";
import {ActionResultModel} from "../../Model/ActionResultModel";
import {AccountService} from "../../Services/AccountService/AccountService";

const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const {firstName, secondName, login, password} = req.body

        if(!firstName || !secondName || !login || !password){
            res.send(new ActionResultModel("204", "dont have enough body parameters for register new account"))
            return
        }

        res.send(await new AccountService().Register(firstName, secondName, login, password))
        return
    }catch{
        res.send(new ActionResultModel("400", "cant create account"))
        return
    }
})

export {
    router as registerRouter
}