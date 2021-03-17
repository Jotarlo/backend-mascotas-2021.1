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
  Persona,
} from '../models';
import {SolicitudAdopcionRepository} from '../repositories';

export class SolicitudAdopcionPersonaController {
  constructor(
    @repository(SolicitudAdopcionRepository)
    public solicitudAdopcionRepository: SolicitudAdopcionRepository,
  ) { }

  @get('/solicitud-adopcions/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to SolicitudAdopcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.number('id') id: typeof SolicitudAdopcion.prototype.id,
  ): Promise<Persona> {
    return this.solicitudAdopcionRepository.persona(id);
  }
}
