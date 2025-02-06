import { CUSTOMERS_TOKEN } from '@accounting-nest/domain';
import { Module } from '@nestjs/common';
import { Customers } from './associations/customers';
import { PrismaService } from './associations/prisma.service';
import { CustomerAccountsFactory } from './associations/customer-accounts.factory';

@Module({
  providers: [
    { provide: CUSTOMERS_TOKEN, useClass: Customers },
    PrismaService,
    CustomerAccountsFactory,
  ],
  exports: [CUSTOMERS_TOKEN],
})
export class PrismaPersistentModule {}
