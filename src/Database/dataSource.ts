import { DataSource } from "typeorm"
import {Todo} from "./Entity/Todo";
import {User} from "./Entity/User";
import {Tags} from "./Entity/Tags";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "todo",
    entities: [Todo, User, Tags],
    synchronize: true,
})