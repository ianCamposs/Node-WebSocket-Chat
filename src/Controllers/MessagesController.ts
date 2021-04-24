import { Request, Response } from "express";
import {MessagesService} from '../services/messagesService'

class MessagesController {
  async create(request: Request, response: Response) {
    const {admin_id, user_id, text} = request.body

    const messagesService = new MessagesService()

    const message = await messagesService.create({
      admin_id,
      user_id,
      text
    })

    return response.status(200).json(message)
  }

  async showByUser(request: Request, response: Response) {
    const {id} = request.params

    const messageService = new MessagesService()

    try {
      const messages = await messageService.listByUser(id)
      return response.status(200).json(messages)
    } catch (error) {
      return response.status(400).json({message: error.message})
    }
  
    
  }
}

export {MessagesController}