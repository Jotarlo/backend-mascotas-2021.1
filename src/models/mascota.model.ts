import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {HistoriaMedica} from './historia-medica.model';
import {Raza} from './raza.model';
import {SolicitudAdopcion} from './solicitud-adopcion.model';
import {VacunaMascota} from './vacuna-mascota.model';
import {Vacuna} from './vacuna.model';

@model({
  settings: {
    foreignKeys: {
      fk_raza_id_mascota: {
        name: 'fk_raza_id_mascota',
        entity: 'Raza',
        entityKey: 'id',
        foreignKey: 'razaId',
      },
      fk_ciudad_id_mascota: {
        name: 'fk_ciudad_id_mascota',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Mascota extends Entity {
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
  identificador: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'date',
    required: true
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: false,
  })
  imagen: string;

  @belongsTo(() => Raza)
  razaId: number;

  @hasMany(() => HistoriaMedica)
  historiasMedicas: HistoriaMedica[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => SolicitudAdopcion)
  solicitudesDeAdopcion: SolicitudAdopcion[];

  @hasMany(() => Vacuna, {through: {model: () => VacunaMascota}})
  vacunas: Vacuna[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
