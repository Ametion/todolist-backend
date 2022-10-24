import {myDataSource} from "./dataSource";
import {Todo} from "./Entity/Todo";
import {Tags} from "./Entity/Tags";
import {User} from "./Entity/User";

export const TodoRepo = myDataSource.getRepository<Todo>(Todo);
export const TagRepo = myDataSource.getRepository<Tags>(Tags);
export const UserRepo = myDataSource.getRepository<User>(User);