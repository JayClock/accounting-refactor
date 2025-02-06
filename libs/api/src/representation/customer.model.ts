import { Customer } from '@accounting-nest/domain';
import { Expose } from 'class-transformer';

export class CustomerModel {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  constructor(customer: Customer) {
    const description = customer.getDescription();
    this.id = customer.getIdentity();
    this.name = description.name;
    this.email = description.email;
  }
}
