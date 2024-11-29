import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { Address } from '../schemas/address.schema';
import { AddressDto } from '../dto/address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() addressDto: AddressDto) {
    return this.addressService.create(addressDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<Address>,
  ) {
    return this.addressService.updateAddress(id, updateData);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.addressService.getAddress(id);
  }

  @Get()
  async findAll() {
    return this.addressService.findAll();
  }
}
