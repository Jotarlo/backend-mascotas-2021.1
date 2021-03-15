import {Entity, model, property} from '@loopback/repository';

@model()
export class Raza extends Entity {
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


  constructor(data?: Partial<Raza>) {
    super(data);
  }
}

export interface RazaRelations {
  // describe navigational properties here
}

export type RazaWithRelations = Raza & RazaRelations;
