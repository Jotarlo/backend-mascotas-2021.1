import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {HistoriaMedica, HistoriaMedicaRelations} from '../models';

export class HistoriaMedicaRepository extends DefaultCrudRepository<
  HistoriaMedica,
  typeof HistoriaMedica.prototype.id,
  HistoriaMedicaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(HistoriaMedica, dataSource);
  }
}
