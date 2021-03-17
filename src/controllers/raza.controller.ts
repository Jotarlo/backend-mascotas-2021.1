import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Raza} from '../models';
import {RazaRepository} from '../repositories';

export class RazaController {
  constructor(
    @repository(RazaRepository)
    public razaRepository : RazaRepository,
  ) {}

  @post('/razas')
  @response(200, {
    description: 'Raza model instance',
    content: {'application/json': {schema: getModelSchemaRef(Raza)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {
            title: 'NewRaza',
            exclude: ['id'],
          }),
        },
      },
    })
    raza: Omit<Raza, 'id'>,
  ): Promise<Raza> {
    return this.razaRepository.create(raza);
  }

  @get('/razas/count')
  @response(200, {
    description: 'Raza model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Raza) where?: Where<Raza>,
  ): Promise<Count> {
    return this.razaRepository.count(where);
  }

  @get('/razas')
  @response(200, {
    description: 'Array of Raza model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Raza, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Raza) filter?: Filter<Raza>,
  ): Promise<Raza[]> {
    return this.razaRepository.find(filter);
  }

  @patch('/razas')
  @response(200, {
    description: 'Raza PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {partial: true}),
        },
      },
    })
    raza: Raza,
    @param.where(Raza) where?: Where<Raza>,
  ): Promise<Count> {
    return this.razaRepository.updateAll(raza, where);
  }

  @get('/razas/{id}')
  @response(200, {
    description: 'Raza model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Raza, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Raza, {exclude: 'where'}) filter?: FilterExcludingWhere<Raza>
  ): Promise<Raza> {
    return this.razaRepository.findById(id, filter);
  }

  @patch('/razas/{id}')
  @response(204, {
    description: 'Raza PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Raza, {partial: true}),
        },
      },
    })
    raza: Raza,
  ): Promise<void> {
    await this.razaRepository.updateById(id, raza);
  }

  @put('/razas/{id}')
  @response(204, {
    description: 'Raza PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() raza: Raza,
  ): Promise<void> {
    await this.razaRepository.replaceById(id, raza);
  }

  @del('/razas/{id}')
  @response(204, {
    description: 'Raza DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.razaRepository.deleteById(id);
  }
}
