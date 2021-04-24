import { Request, Response } from "express";
import { SettingsService } from '../services/SettingsService'


class SettingsController {

  async create(request: Request, response: Response) {
    const { chat, username } = request.body

    const settingsService = new SettingsService()

    try {
      const setting = await settingsService.create({chat, username})
  
      return response.status(200).json(setting)
      
    } catch (error) {
      return response.status(400).json({
        message: error.message
      })
    }
  }

  async findByUsername(request: Request, response: Response) {
    const {username} = request.params

    const settingsService = new SettingsService()

    const setting = await settingsService.findByUsername(username)

    return response.status(200).json(setting)
  }

  async update(request: Request, response: Response) {
    const {username} = request.params
    const {chat} = request.body

    const settingsService = new SettingsService()

    const settings = await settingsService.update(username, chat)

    return response.status(200).json(settings)
  }
}

export {SettingsController}