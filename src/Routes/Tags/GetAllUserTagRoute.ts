import express from "express";
import {ActionResultModel} from "../../Model/ActionResultModel";
import {TagsService} from "../../Services/TagsService/TagsService";

const router = express.Router();

router.get("/getUserTags", async (req, res) => {
    try {
        const login = req.body.login

        if(!login){
            res.send(new ActionResultModel("402", "u must choose user to find hes tag"))
        }

        res.send(await new TagsService().GetAllUserTags(login))
    }catch{
        res.send(new ActionResultModel("400", "error while searching tags"));
        return;
    }
})

export {
    router as getUserTagRouter
}