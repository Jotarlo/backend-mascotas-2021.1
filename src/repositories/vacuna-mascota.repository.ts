import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {VacunaMascota, VacunaMascotaRelations} from '../models';

export class VacunaMascotaRepository extends DefaultCrudRepository<
  VacunaMascota,
  typeof VacunaMascota.prototype.id,
  VacunaMascotaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(VacunaMascota, dataSource);
  }
}
