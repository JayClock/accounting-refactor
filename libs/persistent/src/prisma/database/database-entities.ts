import { Entity, HasMany, Many } from '@accounting-nest/domain';
import { MemoryEntities } from '../memory/memory-entities';

export abstract class DatabaseEntities<ID, E extends Entity<unknown, unknown>>
  implements Many<E>, HasMany<ID, E>
{
  async findAll(): Promise<Many<E>> {
    return this;
  }

  async findByIdentity(id: ID): Promise<E | null> {
    return this.findEntity(id);
  }

  async subCollection(from: number, to: number): Promise<Many<E>> {
    const entityList = await this.findEntities(from, to);
    return new MemoryEntities(entityList);
  }

  abstract size(): Promise<number>;

  abstract findEntity(id: ID): Promise<E | null>;

  abstract findEntities(from: number, to: number): Promise<E[]>;

  protected batchSize(): Promise<number> {
    return Promise.resolve(100);
  }

  [Symbol.asyncIterator](): AsyncIterator<E> {
    return this.batchIterator();
  }

  private async *batchIterator(): AsyncIterator<E> {
    const totalSize = await this.size();
    const batchSize = await this.batchSize();
    let current = 0;

    while (current < totalSize) {
      const entities = await this.subCollection(
        current,
        Math.min(current + batchSize, totalSize)
      );
      for await (const entity of entities) {
        yield entity;
        current++;
      }
    }
  }
}
