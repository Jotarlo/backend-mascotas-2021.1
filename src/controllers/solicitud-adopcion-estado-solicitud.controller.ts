import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudAdopcion,
  EstadoSolicitud,
} from '../models';
import {SolicitudAdopcionRepository} from '../repositories';

export class SolicitudAdopcionEstadoSolicitudController {
  constructor(
    @repository(SolicitudAdopcionRepository)
    public solicitudAdopcionRepository: SolicitudAdopcionRepository,
  ) { }

  @get('/solicitud-adopcions/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'EstadoSolicitud belonging to SolicitudAdopcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoSolicitud)},
          },
        },
      },
    },
  })
  async getEstadoSolicitud(
    @param.path.number('id') id: typeof SolicitudAdopcion.prototype.id,
  ): Promise<EstadoSolicitud> {
    return this.solicitudAdopcionRepository.estadoSolicitud(id);
  }
}
