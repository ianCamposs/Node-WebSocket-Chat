import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingRepository } from "../repositories/SettingRepository";



class SettingsController {

  async create(request: Request, response: Response) {
    const { chat, username } = request.body

    const settingRepository = getCustomRepository(SettingRepository)

    const setting = settingRepository.create({
      chat,
      username
    })

    await settingRepository.save(setting)

    return response.status(200).json(setting)
  }
}

export {SettingsController}