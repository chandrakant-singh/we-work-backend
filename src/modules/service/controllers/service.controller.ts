import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { ServiceDto } from '../dto/service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createDto: ServiceDto) {
    return this.serviceService.create(createDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: ServiceDto) {
    return this.serviceService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
