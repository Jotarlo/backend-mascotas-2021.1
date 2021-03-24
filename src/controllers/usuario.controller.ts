import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {GeneralFnService, JwtService, NotificacionService} from '../services';


export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(GeneralFnService)
    public fnService: GeneralFnService,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService,
    @service(JwtService)
    public servicioJWT: JwtService
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id', 'clave'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let claveAleatoria = this.fnService.GenerarClaveAleatoria();
    console.log(claveAleatoria);
    let claveCifrada = this.fnService.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    usuario.clave = claveCifrada;
    let usuarioAgregado = await this.usuarioRepository.create(usuario);

    // notificar al usuario
    let contenido = `<strong>Hola, buen día</strong><br />su correo ha sido registrado en el sistema de mascotas. Sus datos de acceso son: <br /><br /><ul><li>Usuario: ${usuario.nombre_usuario}</li><li>Clave: ${claveAleatoria}</li></ul><br /> <br />Tu equipo de Mascotas te espera. Feliz día.`;
    this.servicioNotificacion.EnviarEmail(usuario.nombre_usuario, llaves.AsuntoRegistroUsuario, contenido);

    return usuarioAgregado;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }


  @post('/identificar', {
    responses: {
      '200': {
        description: 'Identificación de usuarios'
      }
    }
  })
  async identificar(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales),
        },
      },
    }) credenciales: Credenciales
  ): Promise<object> {
    let usuario = await this.usuarioRepository.findOne({where: {nombre_usuario: credenciales.nombre_usuario, clave: credenciales.clave}});
    if (usuario) {
      let tk = this.servicioJWT.CrearTokenJWT(usuario);
      usuario.clave = '';
      return {
        user: usuario,
        token: tk
      };
    } else {
      throw new HttpErrors[401]("Usuario o clave incorrecto.")
    }
  }


}
