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
  Ciudad,
  Mascota,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadMascotaController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Mascota',
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
    return this.ciudadRepository.mascotas(id).find(filter);
  }

  @post('/ciudads/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'id'>,
  ): Promise<Mascota> {
    return this.ciudadRepository.mascotas(id).create(mascota);
  }

  @patch('/ciudads/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Ciudad.Mascota PATCH success count',
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
    return this.ciudadRepository.mascotas(id).patch(mascota, where);
  }

  @del('/ciudads/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Ciudad.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.ciudadRepository.mascotas(id).delete(where);
  }
}
