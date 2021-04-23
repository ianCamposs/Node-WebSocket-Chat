import { Repository, EntityRepository } from "typeorm";
import { Setting } from "../entities/setting";


@EntityRepository(Setting)
class SettingRepository extends Repository<Setting>{

}

export {SettingRepository}