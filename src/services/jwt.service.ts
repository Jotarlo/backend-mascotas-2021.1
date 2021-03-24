import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /**
   * Creación de un token JWT
   */
  CrearTokenJWT(usuario: Usuario) {
    let claveSecreta = llaves.jwtKey;
    let tk = jwt.sign({
      exp: llaves.expTimeJWT,
      data: {
        id: usuario.id,
        nom_usuario: usuario.nombre_usuario,
        role: usuario.rolId
      }
    }, claveSecreta);
    return tk;
  }
}
