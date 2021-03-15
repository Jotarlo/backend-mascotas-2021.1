import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Raza, RazaRelations} from '../models';

export class RazaRepository extends DefaultCrudRepository<
  Raza,
  typeof Raza.prototype.id,
  RazaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Raza, dataSource);
  }
}
