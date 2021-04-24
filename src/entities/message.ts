import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { User } from "./user";

@Entity('messages')
class Message {

  @PrimaryColumn()
  id: string

  @Column()
  admin_id: string

  @JoinColumn({name: 'user_id'})
  //muitas mensagens para 1 usuário
  @ManyToOne(() => User)
  user: User

  @Column()
  user_id: string

  @Column()
  text: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export {Message}