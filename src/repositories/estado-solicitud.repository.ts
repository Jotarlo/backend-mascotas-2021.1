import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {EstadoSolicitud, EstadoSolicitudRelations, SolicitudAdopcion} from '../models';
import {SolicitudAdopcionRepository} from './solicitud-adopcion.repository';

export class EstadoSolicitudRepository extends DefaultCrudRepository<
  EstadoSolicitud,
  typeof EstadoSolicitud.prototype.id,
  EstadoSolicitudRelations
> {

  public readonly solicitudesDeAdopcion: HasManyRepositoryFactory<SolicitudAdopcion, typeof EstadoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudAdopcionRepository') protected solicitudAdopcionRepositoryGetter: Getter<SolicitudAdopcionRepository>,
  ) {
    super(EstadoSolicitud, dataSource);
    this.solicitudesDeAdopcion = this.createHasManyRepositoryFactoryFor('solicitudesDeAdopcion', solicitudAdopcionRepositoryGetter,);
    this.registerInclusionResolver('solicitudesDeAdopcion', this.solicitudesDeAdopcion.inclusionResolver);
  }
}
