import express from "express";
import {ActionResultModel} from "../../Model/ActionResultModel";
import {TodosService} from "../../Services/TodosService/TodosService";

const router = express.Router();

router.post("/todo", async (req, res) => {
    try{
        const {login, token, todoTitle, todoDescription, tags} = req.body

        if(!login || !token || !todoTitle || !todoDescription){
            res.send(new ActionResultModel("204", "dont have enough body parameters for login account"))
            return
        }

        res.send(await new TodosService().CreateTodo(login, token, todoTitle, todoDescription, tags))
        return
    }catch{
        res.send(new ActionResultModel("400", "error while searching todo"));
        return;
    }
})

export {
    router as todoRouter
}