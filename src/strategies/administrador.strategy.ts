import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services';
/**
 * Packages:
 * npm i @loopback/authentication
 * npm i @loopback/security
 * npm i parse-bearer-token
 */
export class AdministradorStrategy implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(JwtService)
    public servicioJWT: JwtService) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (!token) {
      throw new HttpErrors[401]("No existe un token en la solicitud.")
    }
    let info = this.servicioJWT.VerificarTokenJWT(token);
    if (info) {
      if (info.data.role == '60520fc7d02209ed6f96d689') {
        let perfil: UserProfile = Object.assign({
          id: info.data.id,
          nombre_usuario: info.data.nom_usuario,
          rol: info.data.role
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("El token es válido, pero no tiene los permisos suficientes para ejecutar esta acción.")
      }
    } else {
      throw new HttpErrors[401]("El token enviado no es válido.")
    }
  }
}
