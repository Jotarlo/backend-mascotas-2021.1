import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Raza,
  TipoMascota,
} from '../models';
import {RazaRepository} from '../repositories';

export class RazaTipoMascotaController {
  constructor(
    @repository(RazaRepository)
    public razaRepository: RazaRepository,
  ) { }

  @get('/razas/{id}/tipo-mascota', {
    responses: {
      '200': {
        description: 'TipoMascota belonging to Raza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoMascota)},
          },
        },
      },
    },
  })
  async getTipoMascota(
    @param.path.number('id') id: typeof Raza.prototype.id,
  ): Promise<TipoMascota> {
    return this.razaRepository.tipoMascota(id);
  }
}
