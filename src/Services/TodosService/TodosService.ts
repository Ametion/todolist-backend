import {TodoModel} from "../../Model/TodoModel";
import {TodoRepo, UserRepo} from "../../Database/Repos";
import {ActionResultModel} from "../../Model/ActionResultModel";
import {Tag} from "../../Model/TagModel";
import {TagsService} from "../TagsService/TagsService";

export class TodosService{

    private readonly tagService: TagsService;

    constructor() {
        this.tagService = new TagsService();
    }

    public async GetUserTodos(login: string, token: string): Promise<Array<TodoModel> | ActionResultModel>{
        try{
            const arr = new Array<TodoModel>()

            const author = await UserRepo.findOne({
                where: {
                    login: login
                }
            })

            if(!author){
                return new ActionResultModel("404", "user with this login dont found")
            }

            if(author.token !== token){
                return new ActionResultModel("402", "token is invalid")
            }

            const todos = await TodoRepo.find({
                relations: {
                    author: true,
                    tags: true
                },
                //@ts-ignore
                where:{
                    author: author
                },
                select:{
                    id: true,
                    todoTitle: true,
                    todoDescription: true,
                    createdDate: true,
                    tags: {
                        id: true,
                        tag: true
                    }
                }
            })

            for (let i = 0; i < todos.length; i++) {
                const tagArr = new Array<Tag>()
                for (let j = 0; j < todos[i].tags.length; j++) {
                    const t = new Tag(todos[i].tags[j].id, todos[i].tags[j].tag)
                    tagArr.push(t)
                }
                const t = new TodoModel(todos[i].id, todos[i].todoTitle, todos[i].todoDescription, todos[i].createdDate, tagArr)
                arr.push(t)
            }

            return arr
        }catch{
            return new ActionResultModel("400", "some error, sory:(")
        }
    }

    public async CreateTodo(login: string, token: string, todoTitle: string, todoDescription: string, tags?: Array<number>): Promise<boolean | ActionResultModel>{
        try{
            const user = await UserRepo.findOne({
                where: {
                    login: login
                }
            })

            if(!user){
                return new ActionResultModel("404", "user with this login dont found")
            }

            if(user.token !== token){
                return new ActionResultModel("402", "token is invalid")
            }

            const _tags = await this.tagService.GetTagsById(tags!)

            const todo = TodoRepo.create({
                todoTitle: todoTitle,
                todoDescription: todoDescription,
                author: user,
                createdDate: new Date(),
                tags: _tags
            })

            await todo.save()

            return true
        }catch{
            return new ActionResultModel("400", "some error, sory:(")
        }
    }

    public async GetTodosFromTag(login: string, token: string, tagId: number): Promise<Array<TodoModel> | ActionResultModel>{
        try{
            const arr = new Array<TodoModel>()

            const user = await UserRepo.findOne({
                where: {
                    login: login
                }
            })

            if(!user){
                return new ActionResultModel("404", "user with this login dont found")
            }

            if(user.token !== token){
                return new ActionResultModel("402", "token is invalid")
            }

            const tag = await this.tagService.GetTagById(tagId);

            const todos = await TodoRepo.find({
                // @ts-ignore
                where:{
                    author: user
                },
                relations: {
                    tags: true
                }
            });

            for (let i = 0; i < todos.length; i++) {
                // @ts-ignore
                if(todos[i].tags.includes(tag)){
                    const t = new TodoModel(todos[i].id, todos[i].todoTitle, todos[i].todoDescription, todos[i].createdDate, await this.tagService.GetTagsByTodoId(todos[i].id))
                    arr.push(t)
                }
            }

            return arr
        }catch{
            return new ActionResultModel("400", "some error, sory:(")
        }
    }
}