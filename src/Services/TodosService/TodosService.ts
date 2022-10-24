import {TodoModel} from "../../Model/TodoModel";

export class TodosService{
    public async GetUserTodos(login: string, token: string): Promise<Array<TodoModel>>{
        const arr = new Array<TodoModel>()

        return arr
    }
}