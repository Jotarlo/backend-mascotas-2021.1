import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Departamento, Mascota} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {MascotaRepository} from './mascota.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudad.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Ciudad, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
