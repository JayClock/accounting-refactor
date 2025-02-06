import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  CustomerDescription,
  Customers,
  CUSTOMERS_TOKEN,
} from '@accounting-nest/domain';
import { CustomerModel } from '../representation/customer.model';
import { CustomersCache } from './customers.cache';

@Controller({ path: 'customers' })
export class CustomersController {
  constructor(
    @Inject(CUSTOMERS_TOKEN) private customers: Customers,
    private customersCache: CustomersCache
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<CustomerModel> {
    const customer =
      (await this.customersCache.get(+id)) ??
      (await this.customers.findById(+id));
    this.customersCache.set(customer);
    return new CustomerModel(customer);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() data: CustomerDescription): Promise<CustomerModel> {
    const customer = await this.customers.create(data);
    return new CustomerModel(customer);
  }
}
