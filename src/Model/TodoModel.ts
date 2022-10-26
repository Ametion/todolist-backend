import {Tag} from "./TagModel";
import {Tags} from "../Database/Entity/Tags";

export class TodoModel{
    public readonly todoId: number;
    public readonly todoTitle: string;
    public readonly todoDescription: string;
    public readonly creationDate: Date;
    public readonly todoTags: Array<Tag>;

    constructor(todoId: number, todoTitle: string, todoDescription: string, creationDate: Date, todoTags: Array<Tag>) {
        this.todoId = todoId;
        this.todoTitle = todoTitle;
        this.todoDescription = todoDescription;
        this.creationDate = creationDate;
        this.todoTags = todoTags;
    }
}