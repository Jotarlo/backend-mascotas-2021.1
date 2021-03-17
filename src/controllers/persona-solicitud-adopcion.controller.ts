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
  Persona,
  SolicitudAdopcion,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaSolicitudAdopcionController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Array of Persona has many SolicitudAdopcion',
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
    return this.personaRepository.solicitudesDeAdopcion(id).find(filter);
  }

  @post('/personas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudAdopcion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAdopcion, {
            title: 'NewSolicitudAdopcionInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) solicitudAdopcion: Omit<SolicitudAdopcion, 'id'>,
  ): Promise<SolicitudAdopcion> {
    return this.personaRepository.solicitudesDeAdopcion(id).create(solicitudAdopcion);
  }

  @patch('/personas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Persona.SolicitudAdopcion PATCH success count',
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
    return this.personaRepository.solicitudesDeAdopcion(id).patch(solicitudAdopcion, where);
  }

  @del('/personas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Persona.SolicitudAdopcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudAdopcion)) where?: Where<SolicitudAdopcion>,
  ): Promise<Count> {
    return this.personaRepository.solicitudesDeAdopcion(id).delete(where);
  }
}
