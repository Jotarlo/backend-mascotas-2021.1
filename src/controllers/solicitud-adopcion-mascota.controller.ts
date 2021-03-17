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
  Mascota,
} from '../models';
import {SolicitudAdopcionRepository} from '../repositories';

export class SolicitudAdopcionMascotaController {
  constructor(
    @repository(SolicitudAdopcionRepository)
    public solicitudAdopcionRepository: SolicitudAdopcionRepository,
  ) { }

  @get('/solicitud-adopcions/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to SolicitudAdopcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.number('id') id: typeof SolicitudAdopcion.prototype.id,
  ): Promise<Mascota> {
    return this.solicitudAdopcionRepository.mascota(id);
  }
}
