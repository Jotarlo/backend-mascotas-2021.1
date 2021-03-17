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
import {Vacuna} from '../models';
import {VacunaRepository} from '../repositories';

export class VacunaController {
  constructor(
    @repository(VacunaRepository)
    public vacunaRepository : VacunaRepository,
  ) {}

  @post('/vacunas')
  @response(200, {
    description: 'Vacuna model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vacuna)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacuna, {
            title: 'NewVacuna',
            exclude: ['id'],
          }),
        },
      },
    })
    vacuna: Omit<Vacuna, 'id'>,
  ): Promise<Vacuna> {
    return this.vacunaRepository.create(vacuna);
  }

  @get('/vacunas/count')
  @response(200, {
    description: 'Vacuna model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vacuna) where?: Where<Vacuna>,
  ): Promise<Count> {
    return this.vacunaRepository.count(where);
  }

  @get('/vacunas')
  @response(200, {
    description: 'Array of Vacuna model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vacuna, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vacuna) filter?: Filter<Vacuna>,
  ): Promise<Vacuna[]> {
    return this.vacunaRepository.find(filter);
  }

  @patch('/vacunas')
  @response(200, {
    description: 'Vacuna PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacuna, {partial: true}),
        },
      },
    })
    vacuna: Vacuna,
    @param.where(Vacuna) where?: Where<Vacuna>,
  ): Promise<Count> {
    return this.vacunaRepository.updateAll(vacuna, where);
  }

  @get('/vacunas/{id}')
  @response(200, {
    description: 'Vacuna model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vacuna, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Vacuna, {exclude: 'where'}) filter?: FilterExcludingWhere<Vacuna>
  ): Promise<Vacuna> {
    return this.vacunaRepository.findById(id, filter);
  }

  @patch('/vacunas/{id}')
  @response(204, {
    description: 'Vacuna PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacuna, {partial: true}),
        },
      },
    })
    vacuna: Vacuna,
  ): Promise<void> {
    await this.vacunaRepository.updateById(id, vacuna);
  }

  @put('/vacunas/{id}')
  @response(204, {
    description: 'Vacuna PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() vacuna: Vacuna,
  ): Promise<void> {
    await this.vacunaRepository.replaceById(id, vacuna);
  }

  @del('/vacunas/{id}')
  @response(204, {
    description: 'Vacuna DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.vacunaRepository.deleteById(id);
  }
}
