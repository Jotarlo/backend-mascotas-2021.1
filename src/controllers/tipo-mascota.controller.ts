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
import {TipoMascota} from '../models';
import {TipoMascotaRepository} from '../repositories';

export class TipoMascotaController {
  constructor(
    @repository(TipoMascotaRepository)
    public tipoMascotaRepository : TipoMascotaRepository,
  ) {}

  @post('/tipo-mascota')
  @response(200, {
    description: 'TipoMascota model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoMascota)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMascota, {
            title: 'NewTipoMascota',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoMascota: Omit<TipoMascota, 'id'>,
  ): Promise<TipoMascota> {
    return this.tipoMascotaRepository.create(tipoMascota);
  }

  @get('/tipo-mascota/count')
  @response(200, {
    description: 'TipoMascota model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoMascota) where?: Where<TipoMascota>,
  ): Promise<Count> {
    return this.tipoMascotaRepository.count(where);
  }

  @get('/tipo-mascota')
  @response(200, {
    description: 'Array of TipoMascota model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoMascota, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoMascota) filter?: Filter<TipoMascota>,
  ): Promise<TipoMascota[]> {
    return this.tipoMascotaRepository.find(filter);
  }

  @patch('/tipo-mascota')
  @response(200, {
    description: 'TipoMascota PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMascota, {partial: true}),
        },
      },
    })
    tipoMascota: TipoMascota,
    @param.where(TipoMascota) where?: Where<TipoMascota>,
  ): Promise<Count> {
    return this.tipoMascotaRepository.updateAll(tipoMascota, where);
  }

  @get('/tipo-mascota/{id}')
  @response(200, {
    description: 'TipoMascota model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoMascota, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoMascota, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoMascota>
  ): Promise<TipoMascota> {
    return this.tipoMascotaRepository.findById(id, filter);
  }

  @patch('/tipo-mascota/{id}')
  @response(204, {
    description: 'TipoMascota PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoMascota, {partial: true}),
        },
      },
    })
    tipoMascota: TipoMascota,
  ): Promise<void> {
    await this.tipoMascotaRepository.updateById(id, tipoMascota);
  }

  @put('/tipo-mascota/{id}')
  @response(204, {
    description: 'TipoMascota PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoMascota: TipoMascota,
  ): Promise<void> {
    await this.tipoMascotaRepository.replaceById(id, tipoMascota);
  }

  @del('/tipo-mascota/{id}')
  @response(204, {
    description: 'TipoMascota DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoMascotaRepository.deleteById(id);
  }
}
