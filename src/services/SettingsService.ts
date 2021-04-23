import {getCustomRepository} from 'typeorm'
import {SettingRepository} from '../repositories/SettingRepository'

interface ISettingsCreate {
  chat: boolean
  username: string
}

class SettingsService {

  async create({chat, username} : ISettingsCreate) {

    const settingRepository = getCustomRepository(SettingRepository)

    const userAlreadyExists = await settingRepository.findOne({ username })

    if (userAlreadyExists) {
      throw new Error("User already registered, please register another one");
    }

    const setting = settingRepository.create({
      chat,
      username
    })

    await settingRepository.save(setting)
    
    return setting 
  }

}


export {SettingsService}