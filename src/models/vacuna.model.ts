import {Entity, model, property} from '@loopback/repository';

@model()
export class Vacuna extends Entity {
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


  constructor(data?: Partial<Vacuna>) {
    super(data);
  }
}

export interface VacunaRelations {
  // describe navigational properties here
}

export type VacunaWithRelations = Vacuna & VacunaRelations;
