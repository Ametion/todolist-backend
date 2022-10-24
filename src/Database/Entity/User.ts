import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Todo} from "./Todo";
import {Tags} from "./Tags";

@Entity("user")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
        //@ts-ignore
    id: number;

    @Column({
        nullable: false
    })
    firstName: string;

    @Column({
        nullable: false
    })
    secondName: string;

    @Column({
        nullable: false,
        unique: true
    })
    login: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        nullable: true,
        default: null
    })
    token: string;

    @OneToMany(() => Todo, (t) => t.author)
    //@ts-ignore
    todos: Todo[]

    @OneToMany(() =>  Tags, (t) => t.author)
    //@ts-ignore
    tags: Tags[]
}