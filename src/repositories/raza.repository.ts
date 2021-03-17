import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Raza, RazaRelations, TipoMascota, Mascota} from '../models';
import {TipoMascotaRepository} from './tipo-mascota.repository';
import {MascotaRepository} from './mascota.repository';

export class RazaRepository extends DefaultCrudRepository<
  Raza,
  typeof Raza.prototype.id,
  RazaRelations
> {

  public readonly tipoMascota: BelongsToAccessor<TipoMascota, typeof Raza.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Raza.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('TipoMascotaRepository') protected tipoMascotaRepositoryGetter: Getter<TipoMascotaRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Raza, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.tipoMascota = this.createBelongsToAccessorFor('tipoMascota', tipoMascotaRepositoryGetter,);
    this.registerInclusionResolver('tipoMascota', this.tipoMascota.inclusionResolver);
  }
}
