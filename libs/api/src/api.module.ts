import { Module } from '@nestjs/common';
import { CustomersController } from './customers/customers.controller';
import { PrismaPersistentModule } from '@accounting-nest/persistent';
import { CustomerAccountsController } from './customer-accounts/customer-accounts.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { CustomersCache } from './customers/customers.cache';

@Module({
  imports: [PrismaPersistentModule, CacheModule.register()],
  controllers: [CustomersController, CustomerAccountsController],
  providers: [CustomersCache],
})
export class ApiModule {}
