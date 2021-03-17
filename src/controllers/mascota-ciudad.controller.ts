import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascota,
  Ciudad,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaCiudadController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Mascota.prototype.id,
  ): Promise<Ciudad> {
    return this.mascotaRepository.ciudad(id);
  }
}
