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
  Raza,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaRazaController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/raza', {
    responses: {
      '200': {
        description: 'Raza belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Raza)},
          },
        },
      },
    },
  })
  async getRaza(
    @param.path.number('id') id: typeof Mascota.prototype.id,
  ): Promise<Raza> {
    return this.mascotaRepository.raza(id);
  }
}
