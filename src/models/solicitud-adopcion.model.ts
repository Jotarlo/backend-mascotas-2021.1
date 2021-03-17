import {belongsTo, Entity, model, property} from '@loopback/repository';
import {EstadoSolicitud} from './estado-solicitud.model';
import {Mascota} from './mascota.model';
import {Persona} from './persona.model';

@model({
  settings: {
    foreignKeys: {
      fk_mascota_id_solicitud: {
        name: 'fk_mascota_id_solicitud',
        entity: 'Mascota',
        entityKey: 'id',
        foreignKey: 'mascotaId',
      },
      fk_persona_id_solicitud: {
        name: 'fk_persona_id_solicitud',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fk_estado_id_solicitud: {
        name: 'fk_estado_id_solicitud',
        entity: 'EstadoSolicitud',
        entityKey: 'id',
        foreignKey: 'estadoSolicitudId',
      },
    },
  },
})
export class SolicitudAdopcion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Mascota)
  mascotaId: number;

  @belongsTo(() => Persona)
  personaId: number;

  @belongsTo(() => EstadoSolicitud)
  estadoSolicitudId: number;

  constructor(data?: Partial<SolicitudAdopcion>) {
    super(data);
  }
}

export interface SolicitudAdopcionRelations {
  // describe navigational properties here
}

export type SolicitudAdopcionWithRelations = SolicitudAdopcion & SolicitudAdopcionRelations;
