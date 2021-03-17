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
import {HistoriaMedica} from '../models';
import {HistoriaMedicaRepository} from '../repositories';

export class HistoriaMedicaController {
  constructor(
    @repository(HistoriaMedicaRepository)
    public historiaMedicaRepository : HistoriaMedicaRepository,
  ) {}

  @post('/historia-medica')
  @response(200, {
    description: 'HistoriaMedica model instance',
    content: {'application/json': {schema: getModelSchemaRef(HistoriaMedica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaMedica, {
            title: 'NewHistoriaMedica',
            exclude: ['id'],
          }),
        },
      },
    })
    historiaMedica: Omit<HistoriaMedica, 'id'>,
  ): Promise<HistoriaMedica> {
    return this.historiaMedicaRepository.create(historiaMedica);
  }

  @get('/historia-medica/count')
  @response(200, {
    description: 'HistoriaMedica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(HistoriaMedica) where?: Where<HistoriaMedica>,
  ): Promise<Count> {
    return this.historiaMedicaRepository.count(where);
  }

  @get('/historia-medica')
  @response(200, {
    description: 'Array of HistoriaMedica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(HistoriaMedica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(HistoriaMedica) filter?: Filter<HistoriaMedica>,
  ): Promise<HistoriaMedica[]> {
    return this.historiaMedicaRepository.find(filter);
  }

  @patch('/historia-medica')
  @response(200, {
    description: 'HistoriaMedica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaMedica, {partial: true}),
        },
      },
    })
    historiaMedica: HistoriaMedica,
    @param.where(HistoriaMedica) where?: Where<HistoriaMedica>,
  ): Promise<Count> {
    return this.historiaMedicaRepository.updateAll(historiaMedica, where);
  }

  @get('/historia-medica/{id}')
  @response(200, {
    description: 'HistoriaMedica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(HistoriaMedica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(HistoriaMedica, {exclude: 'where'}) filter?: FilterExcludingWhere<HistoriaMedica>
  ): Promise<HistoriaMedica> {
    return this.historiaMedicaRepository.findById(id, filter);
  }

  @patch('/historia-medica/{id}')
  @response(204, {
    description: 'HistoriaMedica PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaMedica, {partial: true}),
        },
      },
    })
    historiaMedica: HistoriaMedica,
  ): Promise<void> {
    await this.historiaMedicaRepository.updateById(id, historiaMedica);
  }

  @put('/historia-medica/{id}')
  @response(204, {
    description: 'HistoriaMedica PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() historiaMedica: HistoriaMedica,
  ): Promise<void> {
    await this.historiaMedicaRepository.replaceById(id, historiaMedica);
  }

  @del('/historia-medica/{id}')
  @response(204, {
    description: 'HistoriaMedica DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.historiaMedicaRepository.deleteById(id);
  }
}
