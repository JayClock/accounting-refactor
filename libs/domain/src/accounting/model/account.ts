import { Entity } from '../../archtype/entity';
import { AccountDescription } from '../description/account.description';

export class Account implements Entity<number, AccountDescription> {
  constructor(
    private identity: number,
    private description: AccountDescription
  ) {}

  getIdentity(): number {
    return this.identity;
  }
  getDescription(): AccountDescription {
    return this.description;
  }
}
