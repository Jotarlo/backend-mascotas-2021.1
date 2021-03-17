import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {HistoriaMedica, HistoriaMedicaRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class HistoriaMedicaRepository extends DefaultCrudRepository<
  HistoriaMedica,
  typeof HistoriaMedica.prototype.id,
  HistoriaMedicaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof HistoriaMedica.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(HistoriaMedica, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
