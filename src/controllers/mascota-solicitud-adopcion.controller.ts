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
  SolicitudAdopcion,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaSolicitudAdopcionController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Array of Mascota has many SolicitudAdopcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudAdopcion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudAdopcion>,
  ): Promise<SolicitudAdopcion[]> {
    return this.mascotaRepository.solicitudesDeAdopcion(id).find(filter);
  }

  @post('/mascotas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudAdopcion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAdopcion, {
            title: 'NewSolicitudAdopcionInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) solicitudAdopcion: Omit<SolicitudAdopcion, 'id'>,
  ): Promise<SolicitudAdopcion> {
    return this.mascotaRepository.solicitudesDeAdopcion(id).create(solicitudAdopcion);
  }

  @patch('/mascotas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Mascota.SolicitudAdopcion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAdopcion, {partial: true}),
        },
      },
    })
    solicitudAdopcion: Partial<SolicitudAdopcion>,
    @param.query.object('where', getWhereSchemaFor(SolicitudAdopcion)) where?: Where<SolicitudAdopcion>,
  ): Promise<Count> {
    return this.mascotaRepository.solicitudesDeAdopcion(id).patch(solicitudAdopcion, where);
  }

  @del('/mascotas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Mascota.SolicitudAdopcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudAdopcion)) where?: Where<SolicitudAdopcion>,
  ): Promise<Count> {
    return this.mascotaRepository.solicitudesDeAdopcion(id).delete(where);
  }
}
