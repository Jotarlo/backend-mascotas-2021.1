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
Mascota,
VacunaMascota,
Vacuna,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaVacunaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/vacunas', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Vacuna through VacunaMascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vacuna)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vacuna>,
  ): Promise<Vacuna[]> {
    return this.mascotaRepository.vacunas(id).find(filter);
  }

  @post('/mascotas/{id}/vacunas', {
    responses: {
      '200': {
        description: 'create a Vacuna model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vacuna)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacuna, {
            title: 'NewVacunaInMascota',
            exclude: ['id'],
          }),
        },
      },
    }) vacuna: Omit<Vacuna, 'id'>,
  ): Promise<Vacuna> {
    return this.mascotaRepository.vacunas(id).create(vacuna);
  }

  @patch('/mascotas/{id}/vacunas', {
    responses: {
      '200': {
        description: 'Mascota.Vacuna PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacuna, {partial: true}),
        },
      },
    })
    vacuna: Partial<Vacuna>,
    @param.query.object('where', getWhereSchemaFor(Vacuna)) where?: Where<Vacuna>,
  ): Promise<Count> {
    return this.mascotaRepository.vacunas(id).patch(vacuna, where);
  }

  @del('/mascotas/{id}/vacunas', {
    responses: {
      '200': {
        description: 'Mascota.Vacuna DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vacuna)) where?: Where<Vacuna>,
  ): Promise<Count> {
    return this.mascotaRepository.vacunas(id).delete(where);
  }
}
