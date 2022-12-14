import {Tag} from "../../Model/TagModel";
import {TagRepo, TodoRepo, UserRepo} from "../../Database/Repos";
import {ActionResultModel} from "../../Model/ActionResultModel";
import {Tags} from "../../Database/Entity/Tags";

export class TagsService{
    public async GetAllUserTags(login: string): Promise<Array<Tag> | ActionResultModel>{
        try{
            const arr = new Array<Tag>()

            const user = await UserRepo.findOne({
                where: {
                    login: login
                }
            })

            if(!user){
                return new ActionResultModel("404", "user with this login dont found")
            }

            const tags = await TagRepo.find({
                where:{
                    author: {
                        login: login
                    }
                }
            })

            for (let i = 0; i < tags.length; i++) {
                const t = new Tag(tags[i].id, tags[i].tag)
                arr.push(t)
            }

            return arr
        }catch{
            return new ActionResultModel("400", "some error, sory:(")
        }
    }

    public async CreateTag(login: string, token: string, tagMessage: string): Promise<boolean | ActionResultModel> {
        try {
            const user = await UserRepo.findOne({
                where: {
                    login: login
                }
            })

            if (!user) {
                return new ActionResultModel("404", "user with this login dont found")
            }

            if (user.token !== token) {
                return new ActionResultModel("402", "token is invalid")
            }

            const tag = TagRepo.create({
                tag: tagMessage,
                author: user
            })

            await tag.save()

            return true
        } catch {
            return new ActionResultModel("400", "some error, sory:(")
        }
    }

    public async GetTagById(tagId: number): Promise<Tag | ActionResultModel>{
        try{
            const tag = await TagRepo.findOne({
                where: {
                    id: tagId
                }
            })

            if(!tag){
                return new ActionResultModel("404", "dont find any tag witth this id")
            }

            return new Tag(tag.id, tag.tag)
        }catch{
            return new ActionResultModel("404", "dont find any tag witth this id")
        }
    }

    public async GetTagsById(tags: Array<number>): Promise<Array<Tags>>{
        try{
            const arr = new Array<Tags>()

            for (let i = 0; i < tags.length; i++) {
                const t = await TagRepo.findOne({
                    where: {
                        id: tags[i]
                    },
                    relations: {
                        author: true
                    }
                })

                //@ts-ignore
                arr.push(t)

                // if(t){
                //     const tm = new Tag(t.id, t.tag)
                //     arr.push(tm)
                // }
            }

            return arr
        }catch{
            return new Array<Tags>()
        }
    }

    public async GetTagsByTodoId(todoId: number): Promise<Array<Tag>>{
        try{
            const arr = new Array<Tag>()

            const todo = await TodoRepo.findOne({
                where: {
                    id: todoId
                }
            })

            if(!todo){
                return arr
            }

            const tags = await TagRepo.find({
                where: {
                    todos:{
                        id: todoId
                    }
                }
            })

            for (let i = 0; i < tags.length; i++) {
                const t = new Tag(tags[i].id, tags[i].tag)
                arr.push(t)
            }

            return arr
        }catch{
            return new Array<Tag>()
        }
    }
}