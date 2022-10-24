import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";
import {Tags} from "./Tags";

@Entity("todo")
export class Todo extends BaseEntity{
    @PrimaryGeneratedColumn()
    //@ts-ignore
    id: number;

    @Column()
    //@ts-ignore
    todoTitle: string;

    @Column()
    //@ts-ignore
    todoDescription: string;

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn()
    //@ts-ignore
    author: User;

    @Column()
    //@ts-ignore
    createdDate: Date;

    @ManyToMany(() => Tags, (t) => t.todos)
    @JoinTable()
    //@ts-ignore
    tags: Tags[];
}