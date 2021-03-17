import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TipoMascota,
  Raza,
} from '../models';
import {TipoMascotaRepository} from '../repositories';

export class TipoMascotaRazaController {
  constructor(
    @repository(TipoMascotaRepository) protected tipoMascotaRepository: TipoMascotaRepository,
  ) { }

  @get('/tipo-mascotas/{id}/razas', {
    responses: {
      '200': {
        description: 'Array of TipoMascota has many Raza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Raza)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Raza>,
  ): Promise<Raza[]> {
    return this.tipoMascotaRepository.razas(id).find(filter);
  }

  @post('/tipo-mascotas/{id}/razas', {
    responses: {
      '200': {
        description: 'TipoMascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Raza)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoMascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {
            title: 'NewRazaInTipoMascota',
            exclude: ['id'],
            optional: ['tipoMascotaId']
          }),
        },
      },
    }) raza: Omit<Raza, 'id'>,
  ): Promise<Raza> {
    return this.tipoMascotaRepository.razas(id).create(raza);
  }

  @patch('/tipo-mascotas/{id}/razas', {
    responses: {
      '200': {
        description: 'TipoMascota.Raza PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {partial: true}),
        },
      },
    })
    raza: Partial<Raza>,
    @param.query.object('where', getWhereSchemaFor(Raza)) where?: Where<Raza>,
  ): Promise<Count> {
    return this.tipoMascotaRepository.razas(id).patch(raza, where);
  }

  @del('/tipo-mascotas/{id}/razas', {
    responses: {
      '200': {
        description: 'TipoMascota.Raza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Raza)) where?: Where<Raza>,
  ): Promise<Count> {
    return this.tipoMascotaRepository.razas(id).delete(where);
  }
}
