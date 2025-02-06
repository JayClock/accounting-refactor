import { Account } from '@accounting-nest/domain';
import { Expose } from 'class-transformer';

export class AccountModel {
  @Expose()
  id: number;

  constructor(accout: Account) {
    this.id = accout.getIdentity();
  }
}
