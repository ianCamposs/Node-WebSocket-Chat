import { getCustomRepository, Repository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagensRepository"
import {Message} from '../entities/message'

interface IMessageCreate {
  admin_id?: string, //setando como valor opicional, pode vir preenchido ou não
  user_id: string,
  text: string
}

class MessagesService {
  private messagesRepository: Repository<Message>

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  async create({admin_id, user_id, text} : IMessageCreate) {

    const message =  this.messagesRepository.create({
      admin_id,
      user_id,
      text
    })

    await this.messagesRepository.save(message)
    
    return message
  }

  async listByUser(user_id: string) {

    const messages = await this.messagesRepository.find({
      where: {user_id},
      relations: ['user']
    })

    if (!messages) {
      throw new Error("Messages not found");
    }

    return messages
  }
}

export {MessagesService}