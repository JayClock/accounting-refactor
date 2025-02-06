/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity } from './entity';

export interface Many<E extends Entity<any, any>> extends AsyncIterable<E> {
  size(): Promise<number>;
  subCollection(from: number, to: number): Promise<Many<E>>;
}
