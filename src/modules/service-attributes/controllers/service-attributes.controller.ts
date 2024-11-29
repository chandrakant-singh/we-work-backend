import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceAttributesService } from '../services/service-attributes.service';
import { ServiceAttributeDto } from '../dto/service-attributes.dto';

@Controller('service-attributes')
export class ServiceAttributesController {
  constructor(
    private readonly serviceAttributesService: ServiceAttributesService,
  ) {}

  @Post()
  create(@Body() createDto: ServiceAttributeDto) {
    return this.serviceAttributesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.serviceAttributesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.serviceAttributesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: ServiceAttributeDto) {
    return this.serviceAttributesService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceAttributesService.delete(id);
  }
}
