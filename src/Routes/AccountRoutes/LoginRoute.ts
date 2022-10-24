import express from "express";
import {ActionResultModel} from "../../Model/ActionResultModel";
import {AccountService} from "../../Services/AccountService/AccountService";

const router = express.Router();

router.post("/login", async (req, res) => {
    try{
        const {login, password} = req.body

        if(!login || !password){
            res.send(new ActionResultModel("204", "dont have enough body parametrs for login account"))
            return
        }

        res.send(await new AccountService().Login(login, password))
        return
    }catch{
        res.send(new ActionResultModel("400", "error while longing"));
        return;
    }
})

export {
    router as loginRouter
}