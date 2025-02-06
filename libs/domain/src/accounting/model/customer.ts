import { Entity } from '../../archtype/entity';
import { HasMany } from '../../archtype/has-many';
import { AccountDescription } from '../description/account.description';
import { CustomerDescription } from '../description/customer.description';
import { Account } from './account';

export class Customer implements Entity<number, CustomerDescription> {
  constructor(
    private identity: number,
    private description: CustomerDescription,
    private accounts: CustomerAccounts
  ) {}

  getIdentity(): number {
    return this.identity;
  }

  getDescription(): CustomerDescription {
    return this.description;
  }

  getAccounts() {
    return this.accounts;
  }
}

export interface Customers {
  findById(id: number): Promise<Customer>;

  create(description: CustomerDescription): Promise<Customer>;
}

export const CUSTOMERS_TOKEN = 'CUSTOMERS_TOKEN';

export interface CustomerAccounts extends HasMany<number, Account> {
  create(description: AccountDescription): Promise<Account>;
  update(account: Account): Promise<void>;
}
