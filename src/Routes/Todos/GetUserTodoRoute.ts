import express from "express";
import {ActionResultModel} from "../../Model/ActionResultModel";
import {TodosService} from "../../Services/TodosService/TodosService";

const router = express.Router();

router.get("/todo", async (req, res) => {
    try{
        const {login, token} = req.body

        if(!login || !token){
            res.send(new ActionResultModel("204", "dont have enough body parameters for login account"))
            return
        }

        res.send(await new TodosService().GetUserTodos(login, token))
        return
    }catch{
        res.send(new ActionResultModel("400", "error while longing"));
        return;
    }
})

export {
    router as getTodoRouter
}