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
  Raza,
  Mascota,
} from '../models';
import {RazaRepository} from '../repositories';

export class RazaMascotaController {
  constructor(
    @repository(RazaRepository) protected razaRepository: RazaRepository,
  ) { }

  @get('/razas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Raza has many Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.razaRepository.mascotas(id).find(filter);
  }

  @post('/razas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Raza model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Raza.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInRaza',
            exclude: ['id'],
            optional: ['razaId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.razaRepository.mascotas(id).create(mascota);
  }

  @patch('/razas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Raza.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.razaRepository.mascotas(id).patch(mascota, where);
  }

  @del('/razas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Raza.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.razaRepository.mascotas(id).delete(where);
  }
}
