import { Customer } from '@accounting-nest/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersCache {
  private customerMap = new Map<number, Customer>();

  async set(customer: Customer): Promise<void> {
    this.customerMap.set(customer.getIdentity(), customer);
  }

  async get(customerId: number): Promise<Customer | null> {
   return this.customerMap.get(customerId) ?? null;
  }
}
