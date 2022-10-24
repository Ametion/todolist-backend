import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";
import {Todo} from "./Todo";
@Entity("tags")
export class Tags extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @ManyToOne(() => User, (user) => user.tags)
    @JoinColumn()
    author: User;

    @ManyToMany(() => Todo, (t) => t.author)
    todos: Todo[]
}