import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {TipoMascota, TipoMascotaRelations} from '../models';

export class TipoMascotaRepository extends DefaultCrudRepository<
  TipoMascota,
  typeof TipoMascota.prototype.id,
  TipoMascotaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(TipoMascota, dataSource);
  }
}
