import express from "express";
import {ActionResultModel} from "../../Model/ActionResultModel";
import {TagsService} from "../../Services/TagsService/TagsService";

const router = express.Router();

router.post("/createTag", async (req, res) => {
    try{
        const {login, token, tagMsg} = req.body

        if(!login || !token || !tagMsg){
            res.send(new ActionResultModel("204", "dont have enough body parameters for login account"))
            return
        }

        res.send(await new TagsService().CreateTag(login, token, tagMsg))
        return
    }catch{
        res.send(new ActionResultModel("400", "error while searching tags"));
        return;
    }
})

export {
    router as createTagRouter
}