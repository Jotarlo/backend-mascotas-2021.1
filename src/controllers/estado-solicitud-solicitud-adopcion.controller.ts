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
  EstadoSolicitud,
  SolicitudAdopcion,
} from '../models';
import {EstadoSolicitudRepository} from '../repositories';

export class EstadoSolicitudSolicitudAdopcionController {
  constructor(
    @repository(EstadoSolicitudRepository) protected estadoSolicitudRepository: EstadoSolicitudRepository,
  ) { }

  @get('/estado-solicituds/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Array of EstadoSolicitud has many SolicitudAdopcion',
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
    return this.estadoSolicitudRepository.solicitudesDeAdopcion(id).find(filter);
  }

  @post('/estado-solicituds/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'EstadoSolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudAdopcion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoSolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAdopcion, {
            title: 'NewSolicitudAdopcionInEstadoSolicitud',
            exclude: ['id'],
            optional: ['estadoSolicitudId']
          }),
        },
      },
    }) solicitudAdopcion: Omit<SolicitudAdopcion, 'id'>,
  ): Promise<SolicitudAdopcion> {
    return this.estadoSolicitudRepository.solicitudesDeAdopcion(id).create(solicitudAdopcion);
  }

  @patch('/estado-solicituds/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'EstadoSolicitud.SolicitudAdopcion PATCH success count',
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
    return this.estadoSolicitudRepository.solicitudesDeAdopcion(id).patch(solicitudAdopcion, where);
  }

  @del('/estado-solicituds/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'EstadoSolicitud.SolicitudAdopcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudAdopcion)) where?: Where<SolicitudAdopcion>,
  ): Promise<Count> {
    return this.estadoSolicitudRepository.solicitudesDeAdopcion(id).delete(where);
  }
}
