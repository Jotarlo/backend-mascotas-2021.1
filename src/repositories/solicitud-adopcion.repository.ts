import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudAdopcion, SolicitudAdopcionRelations} from '../models';

export class SolicitudAdopcionRepository extends DefaultCrudRepository<
  SolicitudAdopcion,
  typeof SolicitudAdopcion.prototype.id,
  SolicitudAdopcionRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(SolicitudAdopcion, dataSource);
  }
}
