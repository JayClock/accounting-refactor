import { Injectable } from '@nestjs/common';

import {
  Customers as ICustomers,
  Customer,
  CustomerDescription,
} from '@accounting-nest/domain';
import { PrismaService } from './prisma.service';
import { CustomerAccountsFactory } from './customer-accounts.factory';

@Injectable()
export class Customers implements ICustomers {
  constructor(
    private prisma: PrismaService,
    private customerAccountsFactory: CustomerAccountsFactory
  ) {}

  async findById(id: number): Promise<Customer> {
    const data = await this.prisma.customer.findUniqueOrThrow({
      where: { id },
    });
    const accounts = await this.customerAccountsFactory.create(id);
    return new Customer(
      data.id,
      { email: data.email, name: data.name },
      accounts
    );
  }

  async create(description: CustomerDescription): Promise<Customer> {
    const data = await this.prisma.customer.create({ data: description });
    const accounts = await this.customerAccountsFactory.create(data.id);
    return new Customer(
      data.id,
      { email: data.email, name: data.name },
      accounts
    );
  }
}
