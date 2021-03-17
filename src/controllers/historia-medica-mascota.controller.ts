import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistoriaMedica,
  Mascota,
} from '../models';
import {HistoriaMedicaRepository} from '../repositories';

export class HistoriaMedicaMascotaController {
  constructor(
    @repository(HistoriaMedicaRepository)
    public historiaMedicaRepository: HistoriaMedicaRepository,
  ) { }

  @get('/historia-medicas/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to HistoriaMedica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.number('id') id: typeof HistoriaMedica.prototype.id,
  ): Promise<Mascota> {
    return this.historiaMedicaRepository.mascota(id);
  }
}
