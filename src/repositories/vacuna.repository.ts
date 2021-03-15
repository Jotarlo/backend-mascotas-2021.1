import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Vacuna, VacunaRelations} from '../models';

export class VacunaRepository extends DefaultCrudRepository<
  Vacuna,
  typeof Vacuna.prototype.id,
  VacunaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Vacuna, dataSource);
  }
}
