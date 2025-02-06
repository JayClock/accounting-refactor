import { Entity } from '@accounting-nest/domain';
import { DatabaseEntities } from './database-entities';
import { MemoryEntities } from '../memory/memory-entities';

interface EntityDescription {
  value: string;
}

class MockEntity implements Entity<number, EntityDescription> {
  constructor(
    private identity: number,
    private description: EntityDescription
  ) {}

  getIdentity(): number {
    return this.identity;
  }

  getDescription(): EntityDescription {
    return this.description;
  }
}

class MockDataBaseEntities extends DatabaseEntities<number, MockEntity> {
  private entityList: MockEntity[] = [
    new MockEntity(1, { value: 'entity #1' }),
    new MockEntity(2, { value: 'entity #2' }),
    new MockEntity(3, { value: 'entity #3' }),
  ];

  override size(): Promise<number> {
    return Promise.resolve(this.entityList.length);
  }
  override findEntity(id: number): Promise<MockEntity | null> {
    return Promise.resolve(
      this.entityList.find((entity) => entity.getIdentity() === id) ?? null
    );
  }
  override findEntities(from: number, to: number): Promise<MockEntity[]> {
    return Promise.resolve(this.entityList.slice(from, to));
  }
}

describe('DatabaseEntities', () => {
  let entities: MockDataBaseEntities;

  beforeEach(() => {
    entities = new MockDataBaseEntities();
  });

  it('should find all entities', async () => {
    const result = await entities.findAll();
    expect(result).toBeInstanceOf(MockDataBaseEntities);
  });

  it('should find entity by identity', async () => {
    const entity = await entities.findByIdentity(1);
    expect(entity).toBeDefined();
    expect(entity?.getIdentity()).toBe(1);
  });

  it('should return null for non-existent entity', async () => {
    const entity = await entities.findByIdentity(99);
    expect(entity).toBeNull();
  });

  it('should return a sub-collection of entities', async () => {
    const subCollection = await entities.subCollection(1, 3);
    expect(subCollection).toBeInstanceOf(MemoryEntities);
  });

  it('should return the correct size', async () => {
    const size = await entities.size();
    expect(size).toBe(3);
  });

  it('should iterate over all entities', async () => {
    const entitList: MockEntity[] = [];
    for await (const entity of entities) {
      entitList.push(entity);
    }
    expect(entitList.length).toBe(3);
  });
});
