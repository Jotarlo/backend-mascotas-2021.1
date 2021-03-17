import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {TipoMascota, TipoMascotaRelations, Raza} from '../models';
import {RazaRepository} from './raza.repository';

export class TipoMascotaRepository extends DefaultCrudRepository<
  TipoMascota,
  typeof TipoMascota.prototype.id,
  TipoMascotaRelations
> {

  public readonly razas: HasManyRepositoryFactory<Raza, typeof TipoMascota.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('RazaRepository') protected razaRepositoryGetter: Getter<RazaRepository>,
  ) {
    super(TipoMascota, dataSource);
    this.razas = this.createHasManyRepositoryFactoryFor('razas', razaRepositoryGetter,);
    this.registerInclusionResolver('razas', this.razas.inclusionResolver);
  }
}
