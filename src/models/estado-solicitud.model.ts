import {Entity, model, property, hasMany} from '@loopback/repository';
import {SolicitudAdopcion} from './solicitud-adopcion.model';

@model()
export class EstadoSolicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => SolicitudAdopcion)
  solicitudesDeAdopcion: SolicitudAdopcion[];

  constructor(data?: Partial<EstadoSolicitud>) {
    super(data);
  }
}

export interface EstadoSolicitudRelations {
  // describe navigational properties here
}

export type EstadoSolicitudWithRelations = EstadoSolicitud & EstadoSolicitudRelations;
