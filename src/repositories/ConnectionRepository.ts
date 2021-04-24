import { EntityRepository, Repository } from "typeorm";
import { Connection } from '../entities/connections'

@EntityRepository(Connection)
class ConnectionRepository extends Repository<Connection>{
}

export {ConnectionRepository} 