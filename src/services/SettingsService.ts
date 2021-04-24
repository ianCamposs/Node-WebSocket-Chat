import {getCustomRepository, Repository} from 'typeorm'
import { Setting } from '../entities/setting'
import {SettingRepository} from '../repositories/SettingRepository'

interface ISettingsCreate {
  chat: boolean
  username: string
}

class SettingsService {

  private settingRepository: Repository<Setting>

  constructor() {
    this.settingRepository = getCustomRepository(SettingRepository)
  }

  async create({chat, username} : ISettingsCreate) {


    const userAlreadyExists = await this.settingRepository.findOne({ username })

    if (userAlreadyExists) {
      throw new Error("User already registered, please register another one");
    }

    const setting = this.settingRepository.create({
      chat,
      username
    })

    await this.settingRepository.save(setting)
    
    return setting 
  }


  async findByUsername(username: string) {
    const settings = await this.settingRepository.findOne({username})
    
    return settings
  }

  async update(username: string, chat: boolean) {
    await this.settingRepository
      .createQueryBuilder()
      .update(Setting)
      .set({chat})
      .where('username = :username', {username})
      .execute()
    }

}


export {SettingsService}