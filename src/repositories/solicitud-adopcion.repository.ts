import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudAdopcion, SolicitudAdopcionRelations, Mascota, Persona, EstadoSolicitud} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PersonaRepository} from './persona.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';

export class SolicitudAdopcionRepository extends DefaultCrudRepository<
  SolicitudAdopcion,
  typeof SolicitudAdopcion.prototype.id,
  SolicitudAdopcionRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof SolicitudAdopcion.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof SolicitudAdopcion.prototype.id>;

  public readonly estadoSolicitud: BelongsToAccessor<EstadoSolicitud, typeof SolicitudAdopcion.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>,
  ) {
    super(SolicitudAdopcion, dataSource);
    this.estadoSolicitud = this.createBelongsToAccessorFor('estadoSolicitud', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('estadoSolicitud', this.estadoSolicitud.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
