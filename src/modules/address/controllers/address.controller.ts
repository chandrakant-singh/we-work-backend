import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { Address } from '../schemas/address.schema';
import { AddressDto } from '../dto/address.dto';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Public()
  @Post()
  async createAddress(@Body() addressDto: AddressDto) {
    return this.addressService.create(addressDto);
  }

  @Public()
  @Patch(':id')
  async updateAddress(
    @Param('id') id: string,
    @Body() updateData: Partial<Address>,
  ) {
    return this.addressService.updateAddress(id, updateData);
  }

  @Public()
  @Get(':id')
  async getAddress(@Param('id') id: string) {
    return this.addressService.getAddress(id);
  }

  @Public()
  @Get('user-profile/:profileId')
  async getAddressByProfileId(@Param('profileId') profileId: string) {
    return this.addressService.getAddressByProfileId(profileId);
  }

  @Public()
  @Get()
  async findAll() {
    return this.addressService.findAll();
  }
}
